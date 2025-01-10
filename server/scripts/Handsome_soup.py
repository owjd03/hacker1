import requests
from bs4 import BeautifulSoup
import re
import json

# Define websites for Green Energy
websites = {
    "green_energy": [
        "https://en.wikipedia.org/wiki/Renewable_energy_in_the_United_States",
        "https://en.wikipedia.org/wiki/Tesla_Energy"
    ]
}

# Function to validate and filter realistic project costs
def is_realistic_cost(cost, unit):
    """
    Validate if the extracted cost is realistic based on known project ranges.
    """
    try:
        cost = float(cost.replace(",", ""))  # Remove commas and convert to float
        if unit.lower() == "billion" and cost >= 0.1:  # Billion-dollar projects
            return True
        if unit.lower() == "million" and cost >= 10:  # Million-dollar projects
            return True
        if not unit and cost >= 100000:  # Assume raw values should be high
            return True
    except ValueError:
        pass
    return False

# Function to convert cost into numeric form
def convert_to_number(cost, unit):
    """
    Convert a cost string with a unit (e.g., '2.6 billion') into a numeric value.
    """
    try:
        cost = float(cost.replace(",", ""))  # Remove commas and convert to float
        if unit.lower() == "billion":
            return int(cost * 1e9)
        elif unit.lower() == "million":
            return int(cost * 1e6)
        elif unit.lower() == "thousand":
            return int(cost * 1e3)
        else:
            return int(cost)
    except ValueError:
        return None

# Function to extract data for Green Energy
def extract_green_energy(page_text):
    data = []
    # Regex to capture energy type and costs with context
    matches = re.findall(
        r"(solar|wind|hydropower|geothermal|biomass).*?\$([\d,\.]+)\s*(million|billion|thousand|trillion)?",
        page_text,
        flags=re.IGNORECASE
    )
    for match in matches:
        try:
            energy_type = match[0].capitalize()
            cost = match[1]
            unit = match[2] if match[2] else ""  # Handle cases where "million" or "billion" might not exist

            # Validate and filter realistic costs
            if is_realistic_cost(cost, unit):
                numeric_cost = convert_to_number(cost, unit)  # Convert to numeric
                data.append({energy_type: numeric_cost})
        except IndexError:
            continue
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
        
        # Extract data for Green Energy
        if category == "green_energy":
            data = extract_green_energy(page_text)
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
        "green_energy": []
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
