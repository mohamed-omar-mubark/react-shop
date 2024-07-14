import { useEffect, useState } from "react";

function App() {
  const [costumers, setCustomers] = useState([]);

  setCustomers(costumers.map((item) => item));

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("./customers.json");
        const data = await response.json();
        setCustomers(data.customers);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);
  return <>{costumers}</>;
}

export default App;
