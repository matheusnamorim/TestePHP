import styled from "styled-components";

export default function Form({children, ...otherprops}) {
  return <Wrapper {...otherprops}>{children}</Wrapper>
};

const Wrapper = styled.form`
  border-radius: 10px;
  max-height: 610px;
  font-family:'Roboto', sans-serif;
  padding: 20px;
  background-color: #506266;
  border: 1px solid #fff;

  div{
    display: flex;
    margin-bottom: 15px;
    height: 40px;
    align-items: center;
  }

  p{
    min-width: 150px;
    font-size: 20px;
    font-weight: 400;
    color: #FFF;
  }

  input{
    width: 500px;
    height: 30px;
    border-radius: 4px;
    border: none;
    padding-left: 10px;
    background-color: #7b8f8a;
  }

  h2{
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #FFF;
  }

  select{
    border-radius: 4px;
    width: 100px;
    padding: 10px;
    background-color: #d0d4d4;
    border: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    cursor: pointer;
  }

  option{
    font-family: 'Roboto', sans-serif;
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
    margin-left: 20px;
  }

  span{
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
`;