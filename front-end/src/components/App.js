import GlobalStyles from "../styles/globalStyles";
import styled from "styled-components";
import Form from "../styles/Form";
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useState } from "react";
import PhoneInput from "./PhoneInput";
import { useEffect } from "react";
import { listPeople, listPhone, registerPeople } from '../service/API';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UFs = [
  'Select',  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

export default function App() {
  const [phoneArray, setPhoneArray] = useState(['', '', '', '', '']);
  const [descArray, setDescArray] = useState([...phoneArray]);
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [rg, setRg] = useState('')
  const [cep, setCep] = useState('')
  const [street, setStreet] = useState('')
  const [complement, setComplement] = useState('')
  const [sector, setSector] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('');
  const [listOfPeople, setListOfPeople] = useState([]);
  const [listOfPhones, setListOfPhones] = useState([]);

  function removePhones(){
    if(phoneArray.length > 5){
      const arr = [...phoneArray]; 
      arr.pop(); 
      setPhoneArray([...arr]);
      setDescArray([...arr]);
    }
  }

  function addPhones(){
    setPhoneArray([...phoneArray, phoneArray[phoneArray.length-1]]);
    setDescArray([...descArray, descArray[descArray.length-1]]);
  }

  function register(event){
    event.preventDefault();

    if(name === '' || cpf === '' || rg === '' || cep === '' || street === '' || complement === '' || sector === '' || city === '' || uf === 'Select' || uf === '')
      toast('Preencha os dados corretamente!');
    else{
      
      if(!(validateArrays(phoneArray, descArray))) toast('Insira os dados do telefone corretamente!');
      else {
        let obj = [];
        phoneArray.map((value, index) => {
          if(phoneArray[index] !== '' && descArray[index] !== '') obj.push({phone: phoneArray[index], description: descArray[index]})
        });

        registerPeople({
          name, 
          cpf, 
          rg, 
          cep, 
          street, 
          complement, 
          sector, 
          city, 
          uf, 
          phones: [...obj]
        })
        .then((data) => {
          console.log(data.data)
        }).catch((error) => {
          console.log(error);
        });

      }
    }
  }

  function handleChangePhone(e, index, model){
    if(model === 1){
      phoneArray[index] = e.target.value;
      setPhoneArray([...phoneArray]);
    }else{
      descArray[index] = e.target.value;
      setDescArray([...descArray]);
    }
  }

  function validateArrays(arrPhones, arrDesc){
    let contPhones = 0;
    let auxPhones = [];
    let auxDesc = [];
    arrPhones.map((value, index) => {
      if(arrPhones[index] !== '') {
        contPhones++;
        auxPhones.push(index);
      }
    });
    let contDesc = 0;
    arrDesc.map((value, index) => {
      if(arrDesc[index] !== '') {
        contDesc++;
        auxDesc.push(index);
      }
    });

    if(!(JSON.stringify(auxPhones) === JSON.stringify(auxDesc))) return 0;
    if(contPhones !== contDesc || (contPhones === 0 && contDesc === 0)) return 0; 
    else return 1;
  }

  useEffect(() => {
    listPeople().then((data) => {
      console.log(data.data);
      //setListOfPeople(data.data);
    }).catch((error) => {
      console.log(error);
    });
    listPhone().then((data) => {
      console.log(data.data);
      setListOfPhones(data.data);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <>
      <GlobalStyles />
      <ToastContainer />
      <Tilte>Cadastro de Pessoa</Tilte>
      <Container>
        <Form onSubmit={register} >
          <div> 
            <p>Nome:</p>
            <input type="text" name="name" required value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div> 
            <p>CPF:</p>
            <input type="text" name="cpf" required value={cpf} onChange={(e) => setCpf(e.target.value)}/>
          </div>
          <div> 
            <p>RG:</p>
            <input type="text" name="rg" required value={rg} onChange={(e) => setRg(e.target.value)}/>
          </div>
          <h2>Endereço</h2>
          <div> 
            <p>CEP:</p>
            <input type="text" name="cep" required value={cep} onChange={(e) => setCep(e.target.value)}/>
          </div>
          <div> 
            <p>Logradouro:</p>
            <input type="text" name="street" required value={street} onChange={(e) => setStreet(e.target.value)}/>
          </div>
          <div> 
            <p>Complemento:</p>
            <input type="text" name="complement" required value={complement} onChange={(e) => setComplement(e.target.value)}/>
          </div>
          <div> 
            <p>Setor:</p>
            <input type="text" name="sector" required value={sector} onChange={(e) => setSector(e.target.value)}/>
          </div>
          <div> 
            <p>Cidade:</p>
            <input type="text" name="city" required value={city} onChange={(e) => setCity(e.target.value)}/>
          </div>
          <div>  
            <p>UF:</p>
            <select value={uf} onChange={(e) => setUf(e.target.value)}>
              {UFs.map((value, index) => <option value={value} key={index} >{value}</option>)}
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
          {phoneArray.map((value, index) => <PhoneInput key={index} index={index} value={value} func={handleChangePhone}/>)}
          <Minus onClick={() => removePhones()}> 
            <AiFillMinusCircle color="#fff" size="25px"/>
          </Minus>
          <Plus onClick={() => addPhones()}> 
            <AiFillPlusCircle color="#fff" size="25px"/>
          </Plus>
        </Phones>
      </Container>
      <Tilte>Dados Gravados</Tilte>
      <ContainerData>
        <Data>
          <div>Nome</div>
          <div>CPF</div>
          <div>RG</div>
          <div>CEP</div>
          <div>Telefone - Descrição</div>
        </Data>
        {listOfPeople.length !== 0 ? 
          listOfPeople.map((value, index) => 
          <Data key={index}>
            <div><p>{value.name}</p></div>
            <div><p>{value.cpf}</p></div>
            <div><p>{value.rg}</p></div>
            <div><p>{value.cep}</p></div>
            <div><p>{value.cep}</p></div>
            <button>Editar</button>
          </Data>)
        : <></>}
      </ContainerData>
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
  margin-bottom: 50px;
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

const ContainerData = styled.div`
  background-color: #506266;
  border: 1px solid #FFF;
  border-radius: 10px;
  width: 1365px;
`;

const Data = styled.div`
  display: flex;
  align-items: center;

  div{
    border-right: 1px solid #FFF;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #FFF;
    min-width: 250px;
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p{
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    font-weight: 400;
  }

  button{
    border: none;
    border-radius: 5px;
    height: 40px;
    min-width: 100px;
    background-color: #d0d4d4;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    margin-left: 8px;
  }
`;