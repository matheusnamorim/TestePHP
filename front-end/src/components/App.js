import GlobalStyles from "../styles/globalStyles";
import styled from "styled-components";
import Form from "../styles/Form";
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useState } from "react";
import PhoneInput from "./PhoneInput";
import { useEffect } from "react";
import { listPeople, listPhone, registerPeople, listUserById, deleteById, updateById, listPhoneById, updatePhoneById, addPhone } from '../service/API';
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
  const [listOfPhonesIds, setListOfPhonesIds] = useState([]);
  const [reload, setReload] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [idUser, setIdUser] = useState('');

  useEffect(() => {
    listPeople().then((data) => {
      setListOfPeople(data.data);
    }).catch((error) => {
      console.log(error);
    });
    listPhone().then((data) => {
      setListOfPhones(data.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [reload]);

  function removePhones(){
    if(phoneArray.length > 5){
      const arr = [...phoneArray]; 
      arr.pop(); 
      setPhoneArray([...arr]);
      setDescArray([...arr]);
    }
  }

  function addPhones(){
    setPhoneArray([...phoneArray, '']);
    setDescArray([...descArray, '']);
  }

  function validateInput(){
    if(name === '' || cpf === '' || rg === '' || cep === '' || street === '' || complement === '' || sector === '' || city === '' || uf === 'Select' || uf === '') return 1;
    else return 0;
  }

  function createPhonesAndDescription(){
    let obj = [];
    phoneArray.map((value, index) => {
      if(phoneArray[index] !== '' && descArray[index] !== '') obj.push({phone: phoneArray[index], description: descArray[index]})
    });
    return obj;
  }

  function register(event){
    event.preventDefault();

    if(validateInput())
      toast('Preencha os dados corretamente!');
    else{
      
      if(!(validateArrays(phoneArray, descArray))) toast('Insira os dados do telefone corretamente!');
      else {
        
        let obj = createPhonesAndDescription();

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
          toast(data.data);
          setReload(!reload);
          setDisabled(false);
          clearInput();
        }).catch((error) => {
          console.log(error);
        });

      }
    }
  }


  function updatePeople(id){
    if(validateInput())
      toast('Preencha os dados corretamente!');
    else{
      if(!(validateArrays(phoneArray, descArray))) toast('Insira os dados do telefone corretamente!');
      else {
        let obj = createPhonesAndDescription();

        obj.map((value, index) => {
          if(index >= listOfPhonesIds.length){
            addPhone({
              phone: value.phone,
              description: value.description
            }, idUser).then((data) => {
              console.log(data.data);
            }).catch((err) => {
              console.log(err);
            });
          }else{
            if(value.phone !== listOfPhonesIds[index].phone || value.description !== listOfPhonesIds[index].description){
              if(value.phone === '' && value.description === ''){
                console.log('tata');
              }else{
                updatePhoneById({
                  phone: value.phone,
                  description: value.description
                }, listOfPhonesIds[index].id).then((data) => {
                  toast(data.data);
                  setReload(!reload);
                }).catch((err) => {
                  console.log(err);
                });
              }
            }
          }
        });

        updateById({
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
          }, id).then((data) => {
            toast(data.data);
            setReload(!reload);
            clearInput();
          }).catch((err) => {
            console.log(err);
          });
      }
    }
  }

  function handleChangePhone(e, index, model){
    if(model === 1){
      phoneArray[index] = e;
      setPhoneArray([...phoneArray]);
    }else{
      descArray[index] = e;
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

  function edit(id){
    phoneArray.map((value, index) => {
      phoneArray[index] = '';
      descArray[index] = '';
    });

    listPhoneById(id).then((data) => {   
      setListOfPhonesIds(data.data);
    }).catch((err) => {
      console.log(err);
    })

    listUserById(id).then((data) => {
      const people = data.data[0];
      setName(people.name);
      setCpf(people.cpf);
      setRg(people.rg);
      setCep(people.cep);
      setStreet(people.street);
      setComplement(people.complement);
      setSector(people.sector);
      setCity(people.city);
      setDisabled(true);
      setUf(people.uf);
      setIdUser(people.id);
    }).catch((err) => {
      console.log(err);
    });

    let auxPhones = [];
    let auxDesc = [];
    listOfPhones.filter((value) => {
      if(id === value.userid) {
        auxPhones.push(value.phone);
        auxDesc.push(value.description);
      }
    });

    if(auxPhones.length < 5){
      for(let i=auxPhones.length; i<5; i++) {
        auxPhones.push('');
        auxDesc.push('');
      }
    }
  
    setPhoneArray([...auxPhones]);
    setDescArray([...auxDesc]);
  }

  function deletePeople(id){
    if(window.confirm("Deseja realmente excluir esse registro?")){
      deleteById(id).then((data) => {
        toast(data.data);
        setReload(!reload);
        setDisabled(false);
        clearInput();
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  function clearInput(){
      setName("");
      setCpf("");
      setRg("");
      setCep("");
      setStreet("");
      setComplement("");
      setSector("");
      setCity("");
      setDisabled("");
      setUf("Select");

      setPhoneArray(['', '', '', '', '']);
      setDescArray(['', '', '', '', '']);
  }

  return (
    <>
      <GlobalStyles />
      <ToastContainer />
      <Wrapper>
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
              <Button disabled={disabled} onClick={() => deletePeople(idUser)}>Excluir</Button>
              {disabled ? <Button disabled={disabled} onClick={() => updatePeople(idUser)}>Atualizar</Button> :<button>Gravar</button>}
            </span>
          </Form>
          <Phones>
            <div>
              <h1>Telefone</h1>
              <h1>Descrição Telefone</h1>
            </div>
            {phoneArray.map((value, index) => <PhoneInput key={index} index={index} value={value} desc={descArray} func={handleChangePhone}/>)}
            <Minus onClick={() => removePhones()}> 
              <AiFillMinusCircle color="#fff" size="25px"/>
            </Minus>
            <Plus onClick={() => addPhones()}> 
              <AiFillPlusCircle color="#fff" size="25px"/>
            </Plus>
          </Phones>
        </Container>
        <Tilte>Dados Gravados</Tilte>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>RG</th>
              <th>CEP</th>
              <th>Telefone - Descrição</th>
            </tr>
          </thead>
          <tbody>
          {listOfPeople.length !== 0 ? 
            listOfPeople.map((value, index) => 
            <tr key={index}>
              <td><p>{value.name}</p></td>
              <td><p>{value.cpf}</p></td>
              <td><p>{value.rg}</p></td>
              <td><p>{value.cep}</p></td>
              <td>{listOfPhones.map((val, index) => {
                if(value.id === val.userid) return <p key={index}>{val.phone} - {val.description}</p>;
              })}</td>
              <td><button onClick={() => edit(value.id)}>Editar</button></td>
            </tr>)
          : <></>}
          </tbody>
        </table>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  table{
    border: 1px solid #fFF;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    background-color: #506266;

    thead, tbody, tr, td, th{
      padding: 20px;
      border: 1px solid #fFF;
      height: 40px;
    }
    thead{
      font-size: 15px;
      font-weight: 700;
      color: #fFF
    }
    tr, td{
      font-size: 15px;
      font-weight: 400;
      color: #fFF;
      width: 20%;
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
  }
  }
`;

const Button = styled.div`
  border: none;
  border-radius: 5px;
  height: 40px;
  min-width: 100px;
  background-color: #d0d4d4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 700;
  margin-left: 20px;
  color: #000;
  opacity: ${props => props.disabled ? 1: 0};
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
  justify-content: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
  gap: 50px;

`;

const Phones = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 10px;
  padding: 20px 20px 40px 20px;
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
