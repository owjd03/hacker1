import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Metric = {
  co2Emissions?: number;
  energy?: number;
  waterEmissions?: number;
};

type ContractFormData = {
  name: string;
  email: string;
  date: string;
  metrics: Metric;
  contractItems: { [key: string]: number };
};

const ContractForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContractFormData>();
  const [contractItems, setContractItems] = useState<{ itemName: string; funds: number }[]>([]);
  const [metrics, setMetrics] = useState<Metric>({
    co2Emissions: undefined,
    energy: undefined,
    waterEmissions: undefined,
  });

  // Add a new contract item
  const addContractItem = () => {
    setContractItems([...contractItems, { itemName: "", funds: 0 }]);
  };

  // Remove a contract item
  const removeContractItem = (index: number) => {
    const updatedItems = contractItems.filter((_, idx) => idx !== index);
    setContractItems(updatedItems);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<ContractFormData> = async (data) => {
    // Convert contract items into the desired output format
    const contractItemsOutput: { [key: string]: number } = {};
    contractItems.forEach(item => {
      if (item.itemName && item.funds > 0) {
        contractItemsOutput[item.itemName] = item.funds;
      }
    });

    const finalData = {
      ...data,
      metrics: {
        co2Emissions: metrics.co2Emissions || undefined,
        energy: metrics.energy || undefined,
        waterEmissions: metrics.waterEmissions || undefined,
      },
      contractItems: contractItemsOutput,
    };

    console.log("Form Data Submitted:", JSON.stringify(finalData, null, 2));

    try {
      const response = await fetch('http://localhost:3000/api/submit-contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form.");
      }

      const result = await response.json();
      console.log("Form submission successful:", result);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial" }}>
      <h2>Data Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Name Field */}
        <div>
          <label htmlFor="name">Company Name:</label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        {/* Date Field */}
        <div>
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            {...register("date", { required: "Date is required" })}
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
          />
          {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
        </div>

        {/* Metrics */}
        <div>
          <h3>Metrics</h3>
          <label htmlFor="emissions">CO2 Emissions (Optional):</label>
          <input
            id="emissions"
            type="number"
            value={metrics.co2Emissions || ""}
            onChange={(e) => setMetrics({ ...metrics, co2Emissions: Number(e.target.value) || undefined })}
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
          />

          <label htmlFor="energy">Energy Efficiency(Optional):</label>
          <input
            id="energy"
            type="number"
            value={metrics.energy || ""}
            onChange={(e) => setMetrics({ ...metrics, energy: Number(e.target.value) || undefined })}
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
          />

          <label htmlFor="water">Water Usage (Optional):</label>
          <input
            id="water"
            type="number"
            value={metrics.waterEmissions || ""}
            onChange={(e) => setMetrics({ ...metrics, waterEmissions: Number(e.target.value) || undefined })}
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {/* Contract Items */}
        <div>
          <h3>Contract Items</h3>
          {contractItems.map((item, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Item Name"
                value={item.itemName}
                onChange={(e) => {
                  const updatedItems = [...contractItems];
                  updatedItems[index].itemName = e.target.value;
                  setContractItems(updatedItems);
                }}
                style={{ width: "100px", flex: "1", padding: "8px" }}
              />
              <input
                type="number"
                placeholder="Funds"
                value={item.funds}
                onChange={(e) => {
                  const updatedItems = [...contractItems];
                  updatedItems[index].funds = Number(e.target.value);
                  setContractItems(updatedItems);
                }}
                style={{ width: "100px", padding: "8px" }}
              />
              <button
                type="button"
                onClick={() => removeContractItem(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addContractItem}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
            }}
          >
            Add Item
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContractForm;