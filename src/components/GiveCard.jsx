import { Card, Input } from "antd";
import { SearchOutlined, FileSearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";

const GiveCard = ({numPincode} ) => {
    const [value,setValue]=useState(null);
    const inputRef = useRef(null);
    const focusInput=()=>{
      if(inputRef.current){
        inputRef.current.focus();
      }

    }
    useEffect(()=>{
      focusInput();
    },[value]);
  return (
    <div>
      <h1 style={{marginLeft:"10px"}}>Pincode: {numPincode.PostOffice[0].Pincode}</h1>
      <h2 style={{marginLeft:"10px"}}>Message: {numPincode.Message}</h2>
      <Input
      placeholder="Search by Name"
        ref={inputRef}
        type="text"
        style={{
          padding: "10px",
          margin: "20px 10px",
          marginTop: "0px",
          width: "50%",
          borderBlockColor: "black",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "black",
          borderWidth: "2px",
          borderRadius: "8px",
          fontSize: "24px",
          fontFamily: "sans-serif",
        }}
        prefix={value ? null : <SearchOutlined />}
          value={value}
          onChange={e => {setValue(e.target.value)
            
          }}
      />
      <br></br>
   {value?(<div style={{display:"flex",flexWrap:"wrap",gap:"16px"}}>
    { 
        numPincode.PostOffice.map((item)=>{
        return  String(item.Name).toLowerCase().includes(value)?(<Card
        style={{
          width: 300,
          margin: "10px",
        }}
      >
       { <div>
        <p>Name: {item.Name}</p>
        <p>Branch Type: {item.BranchType} </p>
        <p>Delivery Status: {item.DeliveryStatus}</p>
        <p>District: {item.District}</p>
        <p>Division: {item.Division}</p></div>}
      </Card>
):"";
        })
    }
    </div>):(<div style={{display:"flex",flexWrap:"wrap",gap:"16px"}}>
    { 
        numPincode.PostOffice.map((item)=>{
        return    <Card
        style={{
          width: 300,
          margin: "10px",
        }}
      >
       { <div>
        <p>Name: {item.Name}</p>
        <p>Branch Type: {item.BranchType} </p>
        <p>Delivery Status: {item.DeliveryStatus}</p>
        <p>District: {item.District}</p>
        <p>Division: {item.Division}</p></div>}
      </Card>

        })
    }
    </div>)}
    
    </div>
  );
};

export default GiveCard;
