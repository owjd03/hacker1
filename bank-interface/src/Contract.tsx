import React, { useState } from "react";
import { fakeCompanies } from "./FakeContract";
import "./Contract.css";

function Contract() {
  const [companyName, setCompanyName] = useState("");
  const [isCompanyValid, setIsCompanyValid] = useState(false);
  const [error, setError] = useState("");
  const [contractItems, setContractItems] = useState([
    { item: "", amount: "", funds: "", milestones: [{ amount: "", funds: "" }] },
  ]);

  const handleCompanySearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (fakeCompanies.includes(companyName)) {
      setIsCompanyValid(true);
      setError(""); // Clear any previous errors
    } else {
      setError("Invalid company name. Please retype the company name.");
      setIsCompanyValid(false);
    }

    /*const requestData = { firmName: companyName };
    console.log("Sending JSON to backend:", JSON.stringify(requestData, null, 2)); // Print JSON in console

    try {
      const response = await fetch("http://localhost:5000/checkCompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), // Sending firmName as JSON
      });

      const result = await response.json();

      if (response.ok && result.isValid) {
        setIsCompanyValid(true);
        setError(""); // Clear any previous errors
      } else {
        setIsCompanyValid(false);
        setError("Invalid company name. Please retype the company name.");
      }
    } catch (error) {
      console.error("Error validating company name:", error);
      setError("An error occurred while validating the company name.");
    }*/
  
  };

  const handleAddRow = () => {
    setContractItems([
      ...contractItems,
      { item: "", amount: "", funds: "", milestones: [{ amount: "", funds: "" }] },
    ]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedItems = [...contractItems];
    updatedItems.splice(index, 1);
    setContractItems(updatedItems);
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...contractItems];
    updatedItems[index][field as keyof typeof contractItems[0]] = value;
    setContractItems(updatedItems);
  };

  const handleAddMilestone = (itemIndex: number) => {
    const updatedItems = [...contractItems];
    updatedItems[itemIndex].milestones.push({ amount: "", funds: "" });
    setContractItems(updatedItems);
  };

  const handleDeleteMilestone = (itemIndex: number, milestoneIndex: number) => {
    const updatedItems = [...contractItems];
    updatedItems[itemIndex].milestones.splice(milestoneIndex, 1);
    setContractItems(updatedItems);
  };

  const handleMilestoneChange = (
    itemIndex: number,
    milestoneIndex: number,
    field: string,
    value: string
  ) => {
    const updatedItems = [...contractItems];
    updatedItems[itemIndex].milestones[milestoneIndex][
      field as keyof typeof contractItems[0]["milestones"][0]
    ] = value;
    setContractItems(updatedItems);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!contractItems.every((item) => item.item && item.amount && item.funds)) {
      setError("All contract item fields must be filled out.");
      return;
    }

    const data = {
      firm_name: companyName,
      items: contractItems.map((item) => ({
        item: item.item,
        amount: item.amount,
        funds: item.funds,
        milestones: item.milestones.map((milestone) => ({
          amount: milestone.amount,
          funds: milestone.funds,
        })),
      })),
    };

    console.log("Submitting JSON data:", JSON.stringify(data, null, 2));

    try {
      const response = await fetch("http://localhost:5000/submitContract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Contract submitted successfully!");
        console.log("Response from backend:", await response.json());
      } else {
        alert("Failed to submit contract.");
      }
    } catch (error) {
      console.error("Error submitting contract:", error);
      alert("An error occurred during submission. Please try again.");
    }
  };

  return (
    <div className="contract-page">
      <h1>Contract Form</h1>
      <form onSubmit={handleCompanySearch} className="form-container">
        <label>Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter the company name..."
          className="search-bar"
          required
        />
        <button type="submit" className="search-button">Search</button>
        {error && <p className="error-message">{error}</p>}
      </form>

      {isCompanyValid && (
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Contract Items</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
                <th>Funds(ETH)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contractItems.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <input
                        type="text"
                        value={item.item}
                        onChange={(e) =>
                          handleItemChange(index, "item", e.target.value)
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                          handleItemChange(index, "amount", e.target.value)
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.funds}
                        onChange={(e) =>
                          handleItemChange(index, "funds", e.target.value)
                        }
                        required
                      />
                    </td>
                    <td>
                      {contractItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(index)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <h3>Milestones</h3>
                      <table className="milestone-table">
                        <thead>
                          <tr>
                            <th>Amount</th>
                            <th>Funds(ETH)</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.milestones.map((milestone, milestoneIndex) => (
                            <tr key={milestoneIndex}>
                              <td>
                                <input
                                  type="number"
                                  value={milestone.amount}
                                  onChange={(e) =>
                                    handleMilestoneChange(
                                      index,
                                      milestoneIndex,
                                      "amount",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  value={milestone.funds}
                                  onChange={(e) =>
                                    handleMilestoneChange(
                                      index,
                                      milestoneIndex,
                                      "funds",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td>
                                {item.milestones.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteMilestone(index, milestoneIndex)
                                    }
                                  >
                                    Delete
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button
                        type="button"
                        onClick={() => handleAddMilestone(index)}
                      >
                        Add Milestone
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={handleAddRow}>Add Contract
          </button>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Contract;
