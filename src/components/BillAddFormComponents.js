import React, { useState } from "react";

const BillAddFormComponents = ({setBills,bills,setCategories,categories,getCategoryFrequency}) => {

    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");

    const handleBillData = (evt)=>{
        evt.preventDefault();

        let newBillItem = {
            id : `${Date.now()}-${Math.round(Math.random() * 1E9)}`,
            description : description,
            category : category.trim().toLowerCase(),
            amount : amount,
            date : date
        };

        // console.log(newBillItem);
        if(getCategoryFrequency(bills,newBillItem.category)===0){
            setCategories([...categories,newBillItem.category]);
        }

        let newBillList = [...bills,newBillItem];
        newBillList.sort(function(a,b){
            return b.date - a.date;
        });
        setBills(newBillList);
        setDescription("");
        setCategory("");
        setAmount(0);
        setDate("");
        console.log(bills);
    };

    return (
        <div>
            <form onSubmit={handleBillData}>
                <div>
                    <label htmlFor="description">description:</label>
                    <input id="description" type="text" value={description} onChange={(evt)=>{setDescription(evt.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="category">category:</label>
                    <input id="category" type="text" value={category} onChange={(evt)=>{setCategory(evt.target.value)}} required/>
                </div>
                <div>
                    <label htmlFor="amount">amount:</label>
                    <input id="amount" type="number" value={amount} onChange={(evt)=>{setAmount(evt.target.value)}} required min={"0"}/>
                </div>
                <div>
                    <label htmlFor="date">date:</label>
                    <input id="date" type="date" value={date} onChange={(evt)=>{setDate(evt.target.value)}} required/>
                </div>
                <div>
                    <button type="submit">submit</button>
                </div>
            </form>
        </div>
    );
};

export default BillAddFormComponents;