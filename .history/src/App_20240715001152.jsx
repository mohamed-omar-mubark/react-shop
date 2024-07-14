import { useEffect, useState } from "react";

// components
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

const App = () => {
  const [apiData, setData] = useState({ transactions: [], customers: [] });
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

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

  // filter handler
  const filterHandler = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // Function to get customer name by ID
  const getCustomerName = (customer_id) => {
    const customer = apiData.customers.find((c) => c.id === customer_id);
    return customer ? customer.name : "Unknown";
  };

  // Filter transactions based on search term
  const filteredTransactions = apiData.transactions.filter((transaction) => {
    const customerName = getCustomerName(transaction.customer_id);
    const amount = transaction.amount;

    return (
      transaction.customer_id.toString().includes(searchTerm) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.includes(searchTerm)
    );
  });

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
      <InputText
        value={searchTerm} // Bind input to search term state
        onChange={filterHandler}
        placeholder="Filter by Customer"
        className="mb-4"
      />

      <DataTable
        showGridlines
        value={filteredTransactions} // Use filtered transactions
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
