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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContractFormData>();
  const [contractItems, setContractItems] = useState<
    { itemName: string; quantity: number }[]
  >([]);
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
    if (!metrics.co2Emissions || !metrics.energy) {
      alert("Please fill in all required metrics: CO2 Emissions and Energy.");
      return;
    }

    const contractItemsOutput: { [key: string]: number } = {};
    contractItems.forEach((item) => {
      if (item.itemName && item.quantity > 0) {
        contractItemsOutput[item.itemName] = item.quantity;
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
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Contract Form
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* Name Field */}
        <div>
          <label htmlFor="name">Company Name:</label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              fontSize: "16px",
            }}
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
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              fontSize: "16px",
            }}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* Birth Date Field */}
        <div>
          <label htmlFor="date">Birth Date:</label>
          <input
            id="date"
            type="date"
            {...register("date", { required: "Birth date is required" })}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              fontSize: "16px",
            }}
          />
          {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
        </div>

        {/* Metrics */}
        <div>
          <h3 style={{ textAlign: "center" }}>Metrics</h3>
          <label htmlFor="co2Efficiency">CO2 Efficiency:</label>
          <input
            id="co2Efficiency"
            type="number"
            value={metrics.co2Emissions}
            onChange={(e) =>
              setMetrics({ ...metrics, co2Emissions: Number(e.target.value) })
            }
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              fontSize: "16px",
            }}
          />
          {!metrics.co2Emissions && (
            <p style={{ color: "red" }}>CO2 Efficiency is required</p>
          )}

          <label htmlFor="energy">Energy Efficiency:</label>
          <input
            id="energy"
            type="number"
            value={metrics.energy}
            onChange={(e) =>
              setMetrics({ ...metrics, energy: Number(e.target.value) })
            }
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              fontSize: "16px",
            }}
          />
          {!metrics.energy && (
            <p style={{ color: "red" }}>Energy Efficiency is required</p>
          )}

          <label htmlFor="waterEfficiency">Water Efficiency (Optional):</label>
          <input
            id="waterEfficiency"
            type="number"
            value={metrics.waterEmissions || ""}
            onChange={(e) =>
              setMetrics({
                ...metrics,
                waterEmissions: Number(e.target.value) || undefined,
              })
            }
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Contract Items */}
        <div>
          <h3 style={{ textAlign: "center" }}>Contract Items</h3>
          {contractItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr auto",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="Item Name"
                value={item.itemName}
                onChange={(e) => {
                  const updatedItems = [...contractItems];
                  updatedItems[index].itemName = e.target.value;
                  setContractItems(updatedItems);
                }}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
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
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
              <button
                type="button"
                onClick={() => removeContractItem(index)}
                style={{
                  padding: "10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
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
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Add Item
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContractForm;
