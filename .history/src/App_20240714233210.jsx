import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/customers");
        const data = await response.json();
        setCustomers(data.customers);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);
  return <></>;
}

export default App;
