import requests
from bs4 import BeautifulSoup
import re
import json

# Define websites for each category
websites = {
    "green_energy": [
        "https://en.wikipedia.org/wiki/Renewable_energy_in_the_United_States"#,
        #"https://en.wikipedia.org/wiki/Tesla_Energy"
    ],
    "natural_disasters": [
        "https://en.wikipedia.org/wiki/Natural_disasters_in_Japan"#,
        #"https://en.wikipedia.org/wiki/Natural_disasters_in_China"
    ],
    "political_unrest": [
        "https://en.wikipedia.org/wiki/List_of_incidents_of_civil_unrest_in_the_United_States"#,
        #"https://en.wikipedia.org/wiki/List_of_conflicts_in_Mexico"
    ]
}

# Function to extract data for Green Energy
def extract_green_energy(page_text):
    data = []
    # Updated regex to include flexibility in matching the energy type and cost
    matches = re.findall(r"(solar|wind|hydropower|geothermal|biomass).*?\$([\d,\.]+)\s*(million|billion|thousand|trillion)?", page_text, flags=re.IGNORECASE)
    for match in matches:
        try:
            energy_type = match[0].capitalize()
            cost = match[1]
            unit = match[2] if match[2] else ""  # Handle cases where "million" or "billion" might not exist
            full_cost = f"${cost} {unit}".strip()  # Combine cost and unit, removing extra spaces
            data.append({energy_type: full_cost})
        except IndexError:
            # Skip the entry if the tuple doesn't have the expected structure
            continue
    return data

# Function to extract data for Natural Disasters
def extract_natural_disasters(page_text):
    data = []
    matches = re.findall(r"([A-Z][a-z]+(?:, [A-Z][a-z]+)?)\s*(earthquake|flood|hurricane|cyclone).*?\b(\d{4})\b", page_text, flags=re.IGNORECASE)
    for match in matches:
        location, disaster_type, year = match
        data.append({location: f"{disaster_type.capitalize()} {year}"})
    return data

# Function to extract data for Political Unrest
def extract_political_unrest(page_text):
    data = []
    matches = re.findall(r"([A-Z][a-z]+(?:, [A-Z][a-z]+)?)\s*(protests|riots|civil unrest|incidents).*?\b(\d{4})\b", page_text, flags=re.IGNORECASE)
    for match in matches:
        location, unrest_type, year = match
        data.append({location: f"{unrest_type.capitalize()} {year}"})
    return data

# Function to scrape a single website based on the category
def scrape_website(url, category):
    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Extract author/organization
        author = None
        meta_author = soup.find("meta", attrs={"name": "author"})
        if meta_author and meta_author.get("content"):
            author = meta_author.get("content")
        else:
            title = soup.title.string if soup.title else "Unknown"
            author = title.split(" - ")[-1].strip() if "-" in title else title.strip()
        
        # Extract all text content
        page_text = soup.get_text(separator=" ", strip=True)
        
        # Extract data based on category
        if category == "green_energy":
            data = extract_green_energy(page_text)
        elif category == "natural_disasters":
            data = extract_natural_disasters(page_text)
        elif category == "political_unrest":
            data = extract_political_unrest(page_text)
        else:
            data = []

        return {
            "url": url,
            "author": author,
            "data": data
        }
    except Exception as e:
        return {
            "url": url,
            "author": None,
            "data": [],
            "error": str(e)
        }

# Function to scrape all websites for all categories
def scrape_all(websites):
    results = {
        "green_energy": [],
        "natural_disasters": [],
        "political_unrest": []
    }
    for category, urls in websites.items():
        for url in urls:
            print(f"Scraping {category}: {url}")
            result = scrape_website(url, category)
            results[category].append(result)
    return results

# Main function to save data to JSON and link to backend
def main():
    # Scrape data
    scraped_data = scrape_all(websites)

    # Save results to JSON file
    json_file = "scraped_data.json"
    with open(json_file, "w") as file:
        json.dump(scraped_data, file, indent=4)
    print(f"Scraping completed. Data saved to {json_file}.")
    
    # Display data in terminal
    print("\n=== Scraped Data ===")
    print(json.dumps(scraped_data, indent=4))

    # Send data to Node.js backend
    send_to_backend(scraped_data)

# Function to send JSON data to Node.js backend
def send_to_backend(json_data):
    backend_url = "http://localhost:3000/process-data"  # Backend API endpoint
    try:
        response = requests.post(backend_url, json=json_data)
        if response.status_code == 200:
            print("\nData successfully sent to backend!")
        else:
            print(f"\nFailed to send data. Status code: {response.status_code}")
    except Exception as e:
        print(f"\nError sending data to backend: {e}")

# Run the scraper
if __name__ == "__main__":
    main()