import { useEffect, useContext } from 'react'
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";

// import { store } from "../../../../store";

import {Container, Input, TextArea, ButtonWrapper, MyTextInput, MyTextArea, MyCheckbox, Submit, Circle, StyledSelect, StyledErrorMessage, StyledLabel, MySelect, Title} from './form-components'


function Component({ data }) {
    // //Context
    // const context = useContext(store);
    // const { state, dispatch } = context;

    // const addtextToList = async (values) => {
    //     let fieldsObj = {
    //       text: values.text,
    //     }
    
    //   try {
    //       const res = await fetch("/api/subscribe", {
    //         "method": "POST",
    //         "headers": { "Content-Type": "application/json" },
    //         "body": JSON.stringify(fieldsObj)
    //       })
    //       .then((response) => response.json())
    //       .then(fields => {
    //         if(fields.result !== "error") {
    //           document.querySelectorAll(".text-input").forEach(item => {
    //             item="";
    //             document.querySelector("#submit-button").innerText = "✓"
    //             // item.placeholder="Thanks for subscribing!";
    //           })
    //         } else {
    //           document.querySelectorAll(".text-input").forEach(item => {
    //             item="";
    //             document.querySelector("#submit-button").innerText = fields.error
    //             // item.placeholder = fields.message;
    //           })
    //         }
    //       })
    //     } catch (error) {
    //           alert(error);
    //     }
    //   }

    let fields = data.fields;

    return (
        <Container>
            <Formik
            initialValues={{
            name: "",
            firstName: "",
            dob: "",
            nationality: "",
            residentOfSwitzerlandSince: "",
            streetNumber: "",
            postalCodeTown: "",
            phoneNumber: "",
            email: "",
            bankAccount: "",
            showing: "",
            authorship: "",
            otherParticipants: "",
            websitesAndLinks: "",
            confirmation: "",
            uploadOne: "",
            uploadTwo: "",
            uploadThree: "",
            // checkboxOne: true,
            // checkboxTwo: false
            }}
            validationSchema={Yup.object({
            name: Yup.string()
            .required("Required"),
            firstName:  Yup.string()
            .required("Required"),
            dob:  Yup.string()
            .required("Required"),
            nationality: Yup.string()
            .required("Required"),
            residentOfSwitzerlandSince: Yup.string()
            .required("Required"),
            streetNumber: Yup.string()
            .required("Required"),
            postalCodeTown: Yup.string()
            .required("Required"),
            phoneNumber: Yup.string()
            .required("Required"),
            email: Yup.string()
            .required("Required")
            .email("Invalid"),
            bankAccount: Yup.string()
            .required("Required"),
            showing: Yup.string()
            .required("Required"),
            authorship: Yup.string()
            .required("Required"),
            otherParticipants: Yup.string()
            .required("Required"),
            websitesAndLinks: Yup.string()
            .required("Required"),
            confirmation: Yup.string()
            .required("Required"),
            uploadOne: "",
            uploadTwo: "",
            uploadThree: "",
            // checkboxOne: Yup.boolean()
            // .required("Required")
            // .oneOf([true], "You must accept the terms and conditions."),
            // checkboxTwo: Yup.boolean()
            })}
            onSubmit={async (values, { setSubmitting }) => {
            // await new Promise(r => setTimeout(r, 500));
            // setSubmitting(false);
            // addtextToList(values);
            // dispatch({type: "update notification message", value: fields.signUpConfirmationText})
            }}
            >
            <Form>  
                <MyTextInput
                label={`${fields[0].label}*:`}
                name="name"
                type="text"
                placeholder={''}
                />              
                <MyTextInput
                label={`${fields[1].label}*:`}
                name="firstName"
                type="text"
                placeholder={''}
                />                                    
                <MyTextInput
                label={`${fields[2].label}*:`}
                name="dob"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[3].label}*:`}
                name="nationality"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[4].label}*:`}
                name="residentOfSwitzerlandSince"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[5].label}*:`}
                name="streetNumber"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[6].label}*:`}
                name="postalCodeTown"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[7].label}*:`}
                name="phoneNumber"
                type="text"
                placeholder={''}
                /> 
                <MyTextInput
                label={`${fields[8].label}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[9].label}*:`}
                name="bankAccount"
                type="text"
                placeholder={''}
                /> 
                <MyTextInput
                label={`${fields[10].label}*:`}
                name="showing"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[13].label}*:`}
                name="authorship"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[14].label}*:`}
                name="otherParticipants"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[15].label}*:`}
                name="websitesAndLinks"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[16].label}*:`}
                name="confirmation"
                type="text"
                placeholder={''}
                />
                <Title>{data.subtitleTwo}</Title>
                <MyTextInput
                label={`${fields[18].label}*:`}
                name="uploadOne"
                type="text"
                placeholder={''}
                /> 
                <MyTextInput
                label={`${fields[19].label}*:`}
                name="uploadTwo"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[20].label}*:`}
                name="uploadThree"
                type="text"
                placeholder={''}
                />                                                                                                                                                                                                                                                                                   
                {/* <MyTextArea
                label={''}
                name="information"
                placeholder={'Why are you declaring? In a sentence or two, tell us why you’re joining Design Declares'}
                />
                <MyCheckbox
                name="checkboxOne"
                >
                I consent for my fields to be used for the purpose of the Declaration
                </MyCheckbox> 
                <MyCheckbox
                name="checkboxTwo"
                >
                I consent for my name and reason for joining to be used in the promotion of the Declaration on this site, and across our social channels
                </MyCheckbox>                               */}
                <Submit>Submit<Circle id="circle" /></Submit>
            </Form>
            </Formik>
        </Container>
    )
}

export default Component