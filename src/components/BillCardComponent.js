import React, { useState } from "react";
import "../css/_billCardComponent.css";

const BillCardComponent = ({billItem,deleteBillItem,editBillItem}) => {
    const [isEditable, setIsEditable] = useState(false);
    const [editedDescription, setEditedDescription] = useState(billItem.description);
    const [editedCategory, setEditedCategory] = useState(billItem.category);
    const [editedamount, setEditedAmount] = useState(billItem.amount);
    const [editedDate, setEditedDate] = useState(billItem.date);

    const handleEditedBillData = (evt)=>{
        evt.preventDefault();
        let editedBillItem = {
            id : billItem.id,
            description : editedDescription,
            category : editedCategory.trim().toLowerCase(),
            amount : editedamount,
            date : editedDate
        };
        editBillItem(editedBillItem);
        setIsEditable(false);
    };

    return (
        <div>
        {
            isEditable 
            ? 
            <div className="bill-card">
                <form onSubmit={handleEditedBillData}>
                    <div className="input-container">
                        <label htmlFor="edited_description">description : </label>
                        <input id="edited_description" type="text" value={editedDescription} onChange={(evt)=>{setEditedDescription(evt.target.value)}}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="edited_category">category : </label>
                        <input id="edited_category" type="text" value={editedCategory} onChange={(evt)=>{setEditedCategory(evt.target.value)}} required/>
                    </div>
                    <div>
                        <label htmlFor="edited_amount">amount : </label>
                        <input id="edited_amount" type="number" value={editedamount} onChange={(evt)=>{setEditedAmount(evt.target.value)}} required min={"0"}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="edited_date">date : </label>
                        <input id="edited_date" type="date" value={editedDate} onChange={(evt)=>{setEditedDate(evt.target.value)}} required/>
                    </div>
                    <div>
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
            :
            <div className="bill-card">
                <div>
                    <p><span>description</span> : {billItem.description}</p>
                    <p><span>category</span> : {billItem.category}</p>
                    <p><span>amount</span> : {billItem.amount}</p>
                    <p><span>date</span> : {billItem.date}</p>
                </div>
                <div className="edit-delete-btn-container">
                    <div className="btn-container">
                        <button onClick={()=>{setIsEditable(true)}}>edit</button>
                    </div>
                    <div className="btn-container">
                        <button onClick={()=>{deleteBillItem(billItem.id)}}>delete</button>
                    </div>
                </div>
            </div>
        }
        </div>
    );
};

export default BillCardComponent;