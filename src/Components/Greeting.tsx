function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning!";
  if (hour < 18) return "Good Afternoon!";
  return "Good Evening!";
}

function Greeting() {
  return (
    <h2 style={{ marginTop: "50px", marginBottom: "20px", fontSize: "40px", fontWeight: "bold" }}>
      {getGreeting()}
    </h2>
  );
}

export default Greeting;
