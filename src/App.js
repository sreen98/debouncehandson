import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh !important;
`;

const StyledInput = styled.input`
  width: 20rem;
`;

export default function App() {
  const [pinCode, setPinCode] = useState("");
  const [postOffices, setPostOffices] = useState([]);

  useEffect(() => {
    const getData = setTimeout(() => {
      axios
        .get(`https://api.postalpincode.in/pincode/${pinCode}`)
        .then((response) => {
          setPostOffices(response.data[0]?.PostOffice);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => clearTimeout(getData);
  }, [pinCode]);

  return (
    <AppWrapper>
      <StyledInput
        placeholder="Search Input.."
        onChange={(event) => setPinCode(event.target.value)}
      />
      <div>
        {postOffices?.map((po) => {
          return (
            <div key={po.Name}>
              <h3> {po.Name}</h3>
            </div>
          );
        })}
      </div>
    </AppWrapper>
  );
}
