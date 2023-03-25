import GlobalStyles from "../styles/globalStyles";
import styled from "styled-components";
import Form from "../styles/Form";
import Input from "./Input";

const names = [
  {type: 'Nome:', name: 'name'},
  {type: 'CPF:', name: 'cpf'},
  {type: 'RG:', name: 'rg'},
  {type: 'CEP:', name: 'cep'},
  {type: 'Logradouro:', name: 'street'},
  {type: 'Complemento:', name: 'complement'},
  {type: 'Setor:', name: 'sector'},
  {type: 'Cidade:', name: 'city'},
]

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Tilte>Cadastro de Pessoa</Tilte>
      <Container>
        <Form>
          {names.map((value, index) => <Input key={index} type={value.type} name={value.name}/>)}
        </Form>
      </Container>
    </>
  )
}

const Tilte = styled.h1`
  font-family: 'Lexend Deca', sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: #506266;
  margin-bottom: 40px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;