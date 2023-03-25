import GlobalStyles from "../styles/globalStyles";
import styled from "styled-components";
import Form from "../styles/Form";
import Input from "./Input";
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useState } from "react";
import PhoneInput from "./PhoneInput";

const names = [
  {type: 'Nome:', name: 'name'},
  {type: 'CPF:', name: 'cpf'},
  {type: 'RG:', name: 'rg'},
  {type: 'CEP:', name: 'cep'},
  {type: 'Logradouro:', name: 'street'},
  {type: 'Complemento:', name: 'complement'},
  {type: 'Setor:', name: 'sector'},
  {type: 'Cidade:', name: 'city'},
];

const UFs = [
  'Select',  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

export default function App() {
  const [phoneArray, setPhoneArray] = useState([1, 2, 3, 4, 5]);

  function removePhones(){
    if(phoneArray.length >= 5){
      const arr = [...phoneArray]; 
      arr.pop(); 
      setPhoneArray([...arr]);
    }
  }

  function register(event){
    event.preventDefault();

  }

  return (
    <>
      <GlobalStyles />
      <Tilte>Cadastro de Pessoa</Tilte>
      <Container>
        <Form onSubmit={register}>
          {names.map((value, index) => <Input key={index} type={value.type} name={value.name}/>)}
          <div>  
            <p>UF:</p>
            <select>
              {UFs.map((value, index) => <option value={value} key={index}>{value}</option>)}
            </select>
          </div>
          <span>
            <Delete>Excluir</Delete>
            <button>Gravar</button>
          </span>
        </Form>
        <Phones>
          <div>
            <h1>Telefone</h1>
            <h1>Descrição Telefone</h1>
          </div>
          {phoneArray.map((value, index) => <PhoneInput key={index} num={value}/>)}
          <Minus onClick={() => removePhones()}> 
            <AiFillMinusCircle color="#fff" size="25px"/>
          </Minus>
          <Plus onClick={() => setPhoneArray([...phoneArray, phoneArray[phoneArray.length-1]+1])}> 
            <AiFillPlusCircle color="#fff" size="25px"/>
          </Plus>
        </Phones>
      </Container>
    </>
  )
}

const Delete = styled.button`
  display: none;
`;

const Tilte = styled.h1`
  font-family: 'Lexend Deca', sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: #506266;
  margin-bottom: 40px;
`;

const Container = styled.div`
  display: flex;
`;

const Phones = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 10px;
  padding: 20px 20px 40px 20px;
  margin-left: 20px;
  background-color: #506266;
  border: 1px solid #fff;

  & h1:nth-child(1){
    border-right: 1px solid #fff;
  }

  div{
    min-width: 250px;
    padding: 10px;
    display: flex;
    align-items: center;
  }

  h1{
    font-family: 'Roboto', sans-serif;
    min-width: 250px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: #FFF;
  }

`;

const Plus = styled.span`
  position: absolute;
  bottom: 10px;
  right: 55px;
  cursor: pointer;
`;

const Minus = styled.span`
  position: absolute;
  bottom: 10px;
  right: 85px;
  cursor: pointer;
`;