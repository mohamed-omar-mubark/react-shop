import { useEffect, useState, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";

const App = () => {
  const [apiData, setData] = useState({ transactions: [], customers: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const filterHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const getCustomerName = (customer_id) => {
    const customer = apiData.customers.find((c) => c.id === customer_id);
    return customer ? customer.name : "Unknown";
  };

  const filteredTransactions = useMemo(() => {
    return apiData.transactions.filter((transaction) => {
      const customerName = getCustomerName(transaction.customer_id);
      return (
        transaction.customer_id.toString().includes(searchTerm) ||
        customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm)
      );
    });
  }, [apiData.transactions, searchTerm]);

  const customerBodyTemplate = (rowData) => {
    return getCustomerName(rowData.customer_id);
  };

  const amountBodyTemplate = (rowData) => {
    return `${rowData.amount} $`;
  };

  // Actions Body Template
  const actionsBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          label="Select"
          size="small"
          onClick={() => {
            selectCustomer(rowData);
          }}
        />
      </div>
    );
  };

  const selectCustomer = (rowData) => {
    setSelectedCustomer(rowData.customer_id);

    const customerTransactions = apiData.transactions.filter(
      (transaction) => transaction.customer_id === rowData.customer_id
    );

    const transactionsPerDay = customerTransactions.reduce(
      (acc, transaction) => {
        const date = transaction.date;
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += transaction.amount;
        return acc;
      },
      {}
    );

    const labels = Object.keys(transactionsPerDay);
    const data = Object.values(transactionsPerDay);

    setChartData({
      labels,
      datasets: [
        {
          label: "Transactions amount",
          data,
          backgroundColor: labels.map((_, index) =>
            index % 2 === 0
              ? "rgba(255, 159, 64, 0.2)"
              : "rgba(75, 192, 192, 0.2)"
          ),
          borderColor: labels.map((_, index) =>
            index % 2 === 0 ? "rgb(255, 159, 64)" : "rgb(75, 192, 192)"
          ),
          borderWidth: 1,
        },
      ],
    });

    setChartOptions({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });
  };

  useEffect(() => {
    if (!selectedCustomer) {
      // const data = {
      //   labels: ["2022-01-01", "2022-01-02"],
      //   datasets: [
      //     {
      //       label: "Transactions amount",
      //       data: [250, 0],
      //       backgroundColor: [
      //         "rgba(255, 159, 64, 0.2)",
      //         "rgba(75, 192, 192, 0.2)",
      //       ],
      //       borderColor: ["rgb(255, 159, 64)", "rgb(75, 192, 192)"],
      //       borderWidth: 1,
      //     },
      //   ],
      // };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      setChartData(data);
      setChartOptions(options);
    }
  }, [selectedCustomer]);

  return (
    <div className="container pt-8">
      {error && <p className="error-message">{error}</p>}
      <InputText
        value={searchTerm}
        onChange={filterHandler}
        placeholder="Filter by Customer & Transaction Amount"
        className="mb-4 w-28rem"
      />

      <DataTable
        className="mb-6"
        showGridlines
        value={filteredTransactions}
        tableStyle={{ minWidth: "50rem" }}>
        <Column
          field="customer_id"
          header="Customer"
          body={customerBodyTemplate}
        />
        <Column field="date" header="Date" />
        <Column field="amount" header="Amount" body={amountBodyTemplate} />
        <Column field="actions" header="Actions" body={actionsBodyTemplate} />
      </DataTable>

      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
};

export default App;
