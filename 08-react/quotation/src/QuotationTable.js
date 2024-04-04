import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import style from "./mystyle.module.css";

function QuotationTable({ data, clearDataItems }) {
  const [dataRows, setDataRows] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    const z = data.map((v, i) => {
      let amount = v.qty * v.ppu;
      sum += amount;
      return (
        <tr key={i}>
          <td className={style.textCenter}>{v.qty}</td>
          <td>{v.item}</td>
          <td className={style.textCenter}>{v.ppu}</td>
          <td className={style.textRight}>{amount}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotal(sum);
  }, [data]);

  const clearTable = () => {
    clearDataItems();
    setDataRows([]);
  };

  return (
    <div>
      <h1>Quotation</h1>
      <Button onClick={clearTable} variant="outline-dark">
        Clear
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>{total}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default QuotationTable;
