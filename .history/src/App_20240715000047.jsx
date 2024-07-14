import { useEffect, useState } from "react";

// components
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const App = () => {
  const [apiData, setData] = useState({ transactions: [], customers: [] });

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

  // Function to get customer name by ID
  const getCustomerName = (customer_id) => {
    const customer = apiData.customers.find((c) => c.id === customer_id);
    return customer ? customer.name : "Unknown";
  };

  // Customer body template to display customer name
  const customerBodyTemplate = (rowData) => {
    return getCustomerName(rowData.customer_id);
  };

  // Amount body template
  const amountBodyTemplate = (rowData) => {
    return rowData.amount + " $";
  };

  return (
    <div className="container pt-8">
      <DataTable
        showGridlines
        value={apiData.transactions}
        tableStyle={{ minWidth: "50rem" }}>
        <Column
          field="customer_id"
          header="Customer"
          body={customerBodyTemplate}></Column>
        <Column field="date" header="Date"></Column>
        <Column
          field="amount"
          header="Amount"
          body={amountBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default App;
