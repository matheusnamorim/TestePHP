import styled from "styled-components";

export default function PhoneInput({num}) {
  return (
    <Wrapper>
      <input type="text" name={`phone${num}`}/>
      <input type="text" name={`description${num}`}/>
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
