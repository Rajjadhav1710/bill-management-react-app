import React, { useState } from "react";

import BillAddFormComponents from "./components/BillAddFormComponents";
import BillCardComponent from "./components/BillCardComponent";

function App() {
  const [bills, setBills] = useState([]);//Array/list of bill
  const [categories, setCategories] = useState([]);//Array/list of category (unique)
  const [filter, setFilter] = useState("all");

  const getCategoryFrequency = (bills,category)=>{
    let count=0;
    for(let i=0;i<bills.length;i++){
        if(bills[i].category===category){
            count++;
        }
    }
    return count;
  }
  
  const deleteBillItem = (billId)=>{
    let updatedBillList = bills.filter((billItem)=>billItem.id!==billId);
    setBills(updatedBillList);
    console.log(bills);
  };

  const editBillItem = (editedBillItem)=>{
    if(getCategoryFrequency(bills,editedBillItem.category)===0){
      setCategories([...categories,editedBillItem.category]);
    }

    let editedBillList = bills.map((billItem)=>{
      if(billItem.id===editedBillItem.id){
        return {
          id : editedBillItem.id,
          description : editedBillItem.description,
          category : editedBillItem.category,
          amount : editedBillItem.amount,
          date : editedBillItem.date
        };
      }else{
        return billItem;
      }
    });
    setBills(editedBillList);
    console.log(bills);
  };
  
  return (
    <div>
      <div>
        <BillAddFormComponents setBills={setBills} bills={bills} categories={categories} setCategories={setCategories} getCategoryFrequency={getCategoryFrequency}/>
      </div>
      <div>
        <label htmlFor="filter-by-category">filter : </label>
        <select name="" id="filter-by-category" onChange={(evt)=>{setFilter(evt.target.value)}}>
          <option value="all">all</option>
          {
            categories.map((categoryItem,index)=><option key={index} value={categoryItem}>{categoryItem}</option>)
          }
        </select>
      </div>
      <div>
        {
          bills.map((billItem)=>{
            if(filter==="all" || billItem.category===filter){
              return(<BillCardComponent key={billItem.id} billItem={billItem} deleteBillItem={deleteBillItem} editBillItem={editBillItem}/>);
            }else{
              return null;
            }
          })
        }
      </div>
    </div>
  );
}

export default App;
