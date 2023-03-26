import styled from "styled-components";
import { useEffect, useState } from "react";

export default function PhoneInput({value, index, func}) {
  const [aux, setAux] = useState('');
  const [aux2, setAux2] = useState('');

  function changeValue1(e, index){
    setAux(e.target.value);
    func(e, index, 1);
  }

  function changeValue2(e, index){
    setAux2(e.target.value);
    func(e, index, 2);
  }

  return (
    <Wrapper>
      <input type="text" name={`phone${value}`} value={aux} onChange={(e) => changeValue1(e, index)}/>
      <input type="text" name={`description${value}`} value={aux2} onChange={(e) => changeValue2(e, index)}/>
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
