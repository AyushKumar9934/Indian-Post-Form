import React, { useEffect, useState } from "react";
import GiveCard from "./GiveCard";

const FirstPage = () => {
  const [pincode, setPincode] = useState(null);
  const [numPincode, setNumPincode] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    async function fetchData() {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await res.json();
      setNumPincode(data);
      console.log(data);
      setLoading(false);
    }
    fetchData();
  }
  useEffect(() => {
    if (numPincode[0]?.Status !== "Success") {
      const timer = setTimeout(() => {
        setLoading(true);
      }, 1500);
      return () => clearTimeout(timer); // this will clear the timeout if the component is unmounted before the timeout fires
    }
  }, [numPincode]);
  return loading == true ? (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div style={{ margin: "10px", padding: "10px" }}>
        <h1>Enter Pincode</h1>
        <input
          className="pincode-input"
          type="text"
          style={{
            padding: "10px",
            margin: "0px 0px",
            width: "50%",
            borderBlockColor: "black",
            borderWidth: "2px",
            borderRadius: "2px",
            fontSize: "24px",
            fontFamily: "Roboto Mono",
          }}
          placeholder="Enter Valid Pincode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value);
          }}
        />
        <br></br>
        <button
          type="submit"
          style={{
            margin: "5px 0px",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px",
            fontFamily: "sans-serif",
          }}
        >
          Look Up
        </button>
        <style>
          {` 
                    ::placeholder { 
                        color: black; 
                        fontSize:32px;
                    }`}
        </style>
      </div>
    </form>
  ) : numPincode[0].Status == "Success" ? (
    <GiveCard numPincode={numPincode[0]} />
  ) : (
    <div>
      <p style={{ color: "red", fontSize: "32px" }}>Please Enter a valid Pincode again.</p>
    
    </div>
    
  );
};

export default FirstPage;
