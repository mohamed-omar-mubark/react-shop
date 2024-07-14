import { useEffect, useState } from "react";

// components
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const App = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("/customers.json"); // Corrected path
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
      <DataTable value={customers} tableStyle={{ minWidth: "50rem" }}>
        <Column field="name" header="Customer Name"></Column>
      </DataTable>
    </div>
  );
};

export default App;
