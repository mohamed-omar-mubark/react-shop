import { useEffect, useState } from "react";

const ChartJS = ({ customers = [] }) => {
  return (
    <div>
      <Chart type="bar" data={chartData} options={chartOptions} />
      {/* <div>
        <h2>Customer List</h2>
        <ul>
          {customers.map((customer, index) => (
            <li key={index}>{customer.name}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default ChartJS;
