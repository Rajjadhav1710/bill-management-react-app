import React from "react";
import "../css/_billCardForModalComponent.css";

const BillCardForModalComponent = ({billItem}) => {
  return (
    <div className="bill-card">
        <p><span>description</span> : {billItem.description}</p>
        <p><span>category</span> : {billItem.category}</p>
        <p><span>amount</span> : {billItem.amount}</p>
        <p><span>date</span> : {billItem.date}</p>
    </div>
  );
}

export default BillCardForModalComponent;