import React from "react";
import ReactToPrint from "react-to-print";
import { useRef, forwardRef } from "react";
const PrintingPanel = React.forwardRef((props, ref) => {
  return (
    <div
      style={{ height: "20em", backgroundColor: "red", color: "white" }}
      ref={ref}
    >
      <h2>Hello from print</h2>
      <ul>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
      </ul>
    </div>
  );
});

export default PrintingPanel;
