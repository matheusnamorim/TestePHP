import styled from "styled-components";
import { useEffect, useState } from "react";

export default function PhoneInput({value, index, func, desc}) {
  return (
    <Wrapper>
      <input type="text" name={`phone${value}`} value={value} onChange={(e) => func(e.target.value, index, 1)}/>
      <input type="text" name={`description${value}`} value={desc[index]} onChange={(e) => func(e.target.value, index, 2)}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  input{
    margin-top: 10px;
    height: 30px;
    border-radius: 4px;
    border: none;
    padding-left: 10px;
    background-color: #7b8f8a;
  }
`;
