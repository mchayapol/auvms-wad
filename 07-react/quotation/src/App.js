import { useState, useRef, useEffect } from "react";

import QuotationTable from "./QuotationTable";

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();

  const [dataItems, setDataItems] = useState([]);

  const addItem = () => {
    if (itemRef.current.value == "") {
      alert("Item name is empty");
      return;
    }
    var itemObj = {
      item: itemRef.current.value,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems]);
    console.log("after", dataItems);
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <div
        id="inputPanel"
        style={{ backgroundColor: "#e5e5e5", float: "left" }}
      >
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="item">Item</label>
              </td>
              <td>
                <input id="item" type="text" ref={itemRef} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="ppu">Price Per Unit</label>
              </td>
              <td>
                <input id="ppu" type="number" ref={ppuRef} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="qty">Quantity</label>
              </td>
              <td>
                <input id="qty" type="number" ref={qtyRef} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button onClick={addItem}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* {JSON.stringify(dataItems)} */}
      </div>
      <div id="outputPanel" style={{ float: "right", width: "50%" }}>
        <QuotationTable data={dataItems} setDataItems={setDataItems} />
      </div>
    </div>
  );
}

export default App;
