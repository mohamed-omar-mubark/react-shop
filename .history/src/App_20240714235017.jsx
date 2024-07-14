import { useEffect, useState } from "react";

// components
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const App = () => {
  const [apiData, setData] = useState([]);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json"); // Corrected path
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  return (
    <div className="container pt-8">
      <DataTable
        showGridlines
        value={apiData.transactions}
        tableStyle={{ minWidth: "50rem" }}>
        <Column field="date" header="Date"></Column>
      </DataTable>
    </div>
  );
};

export default App;
