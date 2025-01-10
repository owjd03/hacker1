function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning Ali268!";
  if (hour < 18) return "Good Afternoon Ali268!";
  return "Good Evening Ali268!";
}

function Greeting() {
  return (
    <h2
      style={{
        marginTop: "100px",
        marginBottom: "0px",
        fontSize: "40px",
        fontWeight: "bold",
      }}
    >
      {getGreeting()}
    </h2>
  );
}

export default Greeting;
