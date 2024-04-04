import { useState, useRef, useEffect } from "react";

function QuotationTable({ data, setDataItems }) {
  const [dataRows, setDataRows] = useState();

  useEffect(() => {
    const z = data.map((v, i) => {
      let amount = v.qty * v.ppu;
      return (
        <tr key={i}>
          <td>{v.qty}</td>
          <td>{v.item}</td>
          <td>{v.ppu}</td>
          <td>{amount}</td>
        </tr>
      );
    });

    setDataRows(z);
  }, [data]);

  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  };

  return (
    <div>
      <h1>Quotation</h1>
      <button onClick={clearTable}>Clear</button>
      <table style={{ width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "green", color: "white" }}>
            <th>Qty</th>
            <th>Item</th>
            <th>Price/Unit</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
      </table>
    </div>
  );
}

export default QuotationTable;
