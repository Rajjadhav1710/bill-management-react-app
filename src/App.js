import React, { useState } from "react";
import "./App.css"

import BillAddFormComponents from "./components/BillAddFormComponents";
import BillCardComponent from "./components/BillCardComponent";

import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler 
} from "chart.js";
import BillCardForModalComponent from "./components/BillCardForModalComponent";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

function App() {
  const [bills, setBills] = useState([]);//Array/list of bill
  const [categories, setCategories] = useState([]);//Array/list of category (unique)
  const [filter, setFilter] = useState("all");
  const [budget, setBudget] = useState(0);
  const [isBillInBudgetModalVisible, setIsBillInBudgetModalVisible] = useState(false);
  const [billsInBudget, setBillsInBudget] = useState([]);//Array/list of bill in budget

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
    editedBillList.sort(function(a,b){
      return b.date - a.date;
    });
    setBills(editedBillList);
    console.log(bills);
  };

  useEffect(()=>{
    if(budget!==0){
      setIsBillInBudgetModalVisible(true);
    }
  },[billsInBudget,budget]);

  const handleBudget = (evt)=>{
    evt.preventDefault();
    let myBudget = budget;
    let billsInBudgetList = bills.map((billItem)=>{
      if(billItem.amount<=myBudget){
        myBudget = myBudget-billItem.amount;
        return(billItem);
      }else{
        return null;
      }
    });
    setBillsInBudget(billsInBudgetList);
  };
  
  return (
    <div>
      <div style={{textAlign:"center",color:"#17c95f"}}>
        <h1>Bill Management</h1>
      </div>
      <div>
        <BillAddFormComponents setBills={setBills} bills={bills} categories={categories} setCategories={setCategories} getCategoryFrequency={getCategoryFrequency}/>
      </div>
      <div className="filter-container">
        <label htmlFor="filter-by-category">filter : </label>
        <select name="" id="filter-by-category" onChange={(evt)=>{setFilter(evt.target.value)}}>
          <option value="all">all</option>
          {
            categories.map((categoryItem,index)=><option key={index} value={categoryItem}>{categoryItem}</option>)
          }
        </select>
      </div>
      <div className="budget-container">
        <form onSubmit={handleBudget}>
          <div>
            <label htmlFor="budget">budget : </label>
            <input type="number" id="budget" value={budget} onChange={(evt)=>setBudget(evt.target.value)} min={"0"} required/>
            <button type="submit">submit</button>
          </div>
        </form>
        {
          isBillInBudgetModalVisible 
          ? 
          <div className="bill-in-budget-modal" style={{backgroundColor:"#ffffff",  boxShadow: "0 8px 32px 0 #b7f1cd"}}>
            <div>
              <p style={{marginLeft:"10px",textAlign:"center",color:"#17c95f"}}>Bills that should be paid</p>
            </div>
            <div>
              {
                billsInBudget.map((billItem)=>{
                  if(billItem){
                    return(<BillCardForModalComponent key={billItem.id} billItem={billItem}/>);
                  }else{
                    return null;
                  }
                })
              }
            </div>
            <div style={{margin:"10px 10px 5px 10px",textAlign:"center"}}>
              <button onClick={()=>{setIsBillInBudgetModalVisible(false)}}>close</button>
            </div>
          </div>
          :
          null
        }
      </div>
      <div>
        <h3 style={{color:"rgb(23, 201, 95)",marginLeft:"10px"}}>Bill Items</h3>
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
      <div className="chart-container">
        <Line options={{
          responsive : true,
          plugins : {
            legend : {
              position : "top"
            },
            title : {
              display : true,
              text : "Time-series chart of the monthly billing cycle"
            }
          },
          scales : {
            x : {
              display : true,
              title : {
                display : true,
                text : "Date"
              }
            },
            y : {
              display : true,
              title : {
                display : true,
                text : "Amount"
              }
            }
          }
        }} data={{
          labels : bills.map((billItem)=>billItem.date),
          datasets : [
            {
              label : "Bill",
              data : bills.map((billItem)=>billItem.amount),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ]
        }}/>
      </div>
      <div className="footer" style={{textAlign:"center"}}> 
        <p>made with ❤️ in india for brightmoney</p>
      </div>
    </div>
  );
}

export default App;
