import styled from "styled-components";

import Form from './forms/form'


const Container = styled.div`
    width: 70%;
    margin: 0 auto 100px auto;
    background: white;
    border: 1px solid black;
    box-shadow: 10px 10px 10px rgb(0 0 0 / 70%);
    padding: 40px;

    button {
        margin: 40px 0 0 0;
    }
`

const Title = styled.p`
    margin: 30px auto;
    width: fit-content;
`


const Component = ({ data }) => {

  return (
    <Container>
      <Title>{data.subtitleOne}</Title>
      <Form data={data}/>
    </Container>
  );
};

export default Component
