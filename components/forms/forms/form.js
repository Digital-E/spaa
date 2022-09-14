import { useEffect, useContext } from 'react'
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";

// import { store } from "../../../../store";

import {Container, Input, TextArea, ButtonWrapper, MyTextInput, MyTextArea, MyCheckbox, Submit, Circle, StyledSelect, StyledErrorMessage, StyledLabel, MySelect} from './form-components'


function Component({ data }) {
    // //Context
    // const context = useContext(store);
    // const { state, dispatch } = context;

    // const addEmailToList = async (values) => {
    //     let dataObj = {
    //       email: values.email,
    //     }
    
    //   try {
    //       const res = await fetch("/api/subscribe", {
    //         "method": "POST",
    //         "headers": { "Content-Type": "application/json" },
    //         "body": JSON.stringify(dataObj)
    //       })
    //       .then((response) => response.json())
    //       .then(data => {
    //         if(data.result !== "error") {
    //           document.querySelectorAll(".text-input").forEach(item => {
    //             item.value="";
    //             document.querySelector("#submit-button").innerText = "✓"
    //             // item.placeholder="Thanks for subscribing!";
    //           })
    //         } else {
    //           document.querySelectorAll(".text-input").forEach(item => {
    //             item.value="";
    //             document.querySelector("#submit-button").innerText = data.error
    //             // item.placeholder = data.message;
    //           })
    //         }
    //       })
    //     } catch (error) {
    //           alert(error);
    //     }
    //   }

    return (
        <Container>
            <Formik
            initialValues={{
            name: "",
            website: "",
            email: "",
            information: "",
            checkboxOne: true,
            checkboxTwo: false
            }}
            validationSchema={Yup.object({
            name: Yup.string()
            .required("Required"),
            website: Yup.string()
            .required("Required"),
            email: Yup.string()
            .email("Invalid")
            .required("Required"),
            information: Yup.string(),
            checkboxOne: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
            checkboxTwo: Yup.boolean()
            })}
            onSubmit={async (values, { setSubmitting }) => {
            // await new Promise(r => setTimeout(r, 500));
            // setSubmitting(false);
            // addEmailToList(values);
            dispatch({type: "update notification message", value: data.signUpConfirmationText})
            }}
            >
            <Form>   
                <MyTextInput
                label={`${data[0].value}*:`}
                name="name"
                type="text"
                placeholder={''}
                />              
                <MyTextInput
                label={`${data[1].value}*:`}
                name="website"
                type="text"
                placeholder={''}
                />                                    
                <MyTextInput
                label={`${data[2].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[3].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[4].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[5].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[6].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[7].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                /> 
                <MyTextInput
                label={`${data[8].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[9].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                /> 
                <MyTextInput
                label={`${data[10].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[13].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[14].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[15].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[16].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[18].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                /> 
                <MyTextInput
                label={`${data[19].value}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${data[20].value}*:`}
                name="email"
                type="email"
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
                I consent for my data to be used for the purpose of the Declaration
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