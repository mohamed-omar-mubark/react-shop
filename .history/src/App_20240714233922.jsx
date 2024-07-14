import { useEffect, useState } from "react";

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("./customers.json");
        const data = await response.json();
        console.log(data);
        setCustomers(data.customers);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  return (
    <div>
      {customers.map((customer, index) => (
        <div key={index}>{customer}</div>
      ))}
    </div>
  );
}

export default App;
