import { useEffect, useState } from "react";
import styled from "styled-components";

import Form from './forms/form'


const Container = styled.div`
    width: 70%;
    margin: 0 auto 100px auto;
    background: white;
    border: 1px solid black;
    box-shadow: 10px 10px 10px rgb(0 0 0 / 70%);
    padding: 40px;
`

const Title = styled.p`
    margin: 30px auto;
    width: fit-content;
`


const Component = ({ data }) => {

    let formFields = [
        {
            value: 'Name'
        },
        {
            value: 'First Name'
        },
        {
            value: 'Date of birth'
        },
        {
            value: 'Nationality'
        },
        {
            value: 'Resident of Switzerland since'
        },
        {
            value: 'Street / Number'
        },
        {
            value: 'Postal code / Town'
        },
        {
            value: 'Phone number'
        },
        {
            value: 'Email'
        },
        {
            value: 'Bank account (IBAN number)'
        },
        {
            value: 'I will be showing a'
        },
        {
            value: 'Solo performance'
        },
        {
            value: 'Group project'
        },
        {
            value: 'The authorship of this performance lies with:'
        },
        {
            value: 'Other participants (names, roles):'
        },
        {
            value: 'Websites / Videolinks:'
        },
        {
            value: 'I confirm that I am not enrolled in a BA curriculum at an art school or art academy in the current year.'
        },
        {
            value: 'Yes'
        },
        {
            value: 'PDF artist documentation (Filename: Familyname_Firstname_DOKU.pdf)'
        },
        {
            value: 'PDF short biography (Filename: Familyname_Firstname_CV.pdf)'
        },
        {
            value: 'PDF project outline  (Dateiname: Familyname_Firstname_PROJECT.pdf)'
        }
    ]

  return (
    <Container>
      <Title>APPLICATION (Registration Form) *required info</Title>
      <Form data={formFields} />
    </Container>
  );
};

export default Component
