import { useEffect, useState } from 'react'
import { useField, useFormikContext } from "formik";

import styled from "styled-components";

import Button from "../../button";


const ContainerOld = styled.div`
    padding: 0;

    label {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 20px;
        color: var(--ternary-color);
        pointer-events: none;
    }

    @media(max-width: 989px) {
      label {
        left: 10px;
      }
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    form input {
        background-color: transparent;
        padding: 5px 20px;
        border: 1px solid var(--ternary-color);
        width: 100%;
        height: 60px;
        color: var(--secondary-color);
        border-radius: 0;
    }

    @media(max-width: 989px) {
      form input {
        padding: 10px;
      }
    }

    form textarea {
        background-color: transparent;
        padding: 20px;
        border: 1px solid var(--ternary-color);
        width: 100%;
        height: 160px;
        color: var(--secondary-color);
        resize: vertical;
    }

    @media(max-width: 989px) {
      form textarea {
        padding: 15px 10px;
      }
    }

    form input::placeholder,
    form textarea::placeholder
        {
        color: var(--ternary-color);
    }

    form input:focus,
    form textarea:focus
        {
        outline: none;
        border: 1px solid var(--secondary-color);
    }

    input.text-input {
      height: 60px;
      box-sizing: border-box;
    }

    .text-input.error {
        border: 1px solid red;
    }

    .error-label {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: gray;
    }


    .checkbox {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }

    .checkbox > input {
        position: relative;
        height: 15px;
        width: 15px;
        min-height: 15px;
        min-width: 15px;
        -webkit-appearance: none;
        border: 1px solid var(--ternary-color);
        margin-right: 10px;
        padding: 0;
        cursor: pointer;
    }

    .checkbox > input:checked::after {
        content: '';
        width: 15px;
        height: 15px;
        background: url('icons/tick.svg') no-repeat center;
        position: absolute;
        left: -1px;
        top: -1px;
    }

    .checkbox label {
        position: relative;
        left: 0;
        transform: none;
        margin-top: 3px;
    }

    .checkbox-error input {
        border: 1px solid red;
    }

    .checkbox-error label {
        color: red;
    }

    button {
        margin-top: 30px;
    }

    .disabled {
        // pointer-events: none;
        // opacity: 0.3;
    }
`;

const Container = styled.div`
    padding: 0;

    form {
        display: flex;
        flex-direction: column;
    }

    @media(max-width: 989px) {
      form {
        flex-direction: column;
      }
    }

    form input {
        background-color: transparent;
        padding: 0;
        border-bottom: 2.5px dotted black;
        height: 25px;
        flex-grow: 1;
        padding: 0;
        margin: 0 5px -2px 5px;
    }

    form input::placeholder {
        color: black;
    }

    form input:focus {
        outline: none;
        border-bottom: 2.5px dotted #70706f;
    }

    .text-input.error {
      border-bottom: 2.5px dotted red;
    }

    .error-label {
      position: absolute;
      right: 10px;
      color: #70706f;
      pointer-events: none;
    }


    .checkbox {
        display: flex;
        margin-bottom: 15px;
        cursor: pointer;
    }

    .checkbox > input {
        height: 15px;
        width: 15px;
        min-height: 15px;
        min-width: 15px;
        border-radius: 999px;
        -webkit-appearance: none;
        border: 1px solid #AC9E95;
        margin-right: 25px;
    }

    .checkbox > input:checked {
        background: #b0b0b0;
    }

    button {
        display: flex;
        align-items center;
        -webkit-appearance: none;
        border: none;
        background: none;
        width: fit-content;
        margin: 0 0 0 20px;
    }

    @media(max-width: 989px) {
      button {
        margin: 20px 0 0 0;
      }
    }

    button:hover #circle {
      background-color: #70706f;
    }
`;

const Input = styled.div`
    position: relative;
    display: flex;
    flex-grow: 1;
    align-items: center;
    margin: 0 0 10px 0; 

    @media(max-width: 989px) {

    }
`

const Circle = styled.div`
    display: inline-block;
    height: 15px;
    width: 15px;
    min-height: 15px;
    min-width: 15px;
    border: 1px solid black;
    border-radius: 999px;
    margin: 2px 0 0 5px;
`

const TextArea = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    margin-bottom: 10px;
`

const SubmitMessageDesktop = styled.div`
    @media(max-width: 989px) {
      display: none;
    }
`

const SubmitMessageMobile = styled.div`
    @media(min-width: 990px) {
      display: none;
    }
`


const ButtonWrapper = styled.button``

const Title = styled.p`
    margin: 30px auto;
    width: fit-content;
`

let initButton = false;

let removeError = false;


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);

  useEffect(() => {
    initButton = false
  }, []);
  

  return (
    <Input height={props.height} className='my-text-input'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className={meta.touched && meta.error && ( meta.value || initButton ) ? "text-input error" : "text-input"} {...field} {...props} />
      {meta.touched && meta.error && ( meta.value || initButton ) ? (
        <div className="error-label">{meta.error}</div>
      ) : null}
    </Input>
  );
};

const MyTextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <TextArea>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className={meta.touched && meta.error ? "text-input error" : "text-input"} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error-label">{meta.error}</div>
      ) : null}
    </TextArea>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  
  return (
    <>
      <div className={meta.touched && meta.error ? "checkbox checkbox-error" : "checkbox"}>
        <input {...field} {...props} type="checkbox" />
        <label className="small-text" htmlFor={props.id || props.name}>{children}</label>
      </div>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

// const Submit = ({ children, ...props}) => {
//     const {isValid, touched } = useFormikContext();
//     let isActive = false
//     let [refresh, setRefresh] = useState(false)

//     let checkIfDisabled = (e) => {
//       initButton = true
//       removeError = true
//     }

//     return (
//       <ButtonWrapper type="submit" id="submit-button" 
//       // className={isActive ? null : "disabled"}
//       onClick={(e) => checkIfDisabled(e)}
//       >
//         <Button>
//             <SubmitMessageDesktop>{children}</SubmitMessageDesktop>
//         </Button>
//       </ButtonWrapper>
//     )
// }

const Submit = ({ children, ...props}) => {
  const {isValid, touched } = useFormikContext();
  let isActive = false

  if(isValid === true && Object.entries(touched).length !== 0) {
      isActive = true
  } else {
      isActive = false
  }


  return (
      <button type="submit" id="submit-button" onClick={() => initButton = true}>
          {children}
      </button>
  )
}

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};


export {Container, Input, TextArea, ButtonWrapper, MyTextInput, MyTextArea, MyCheckbox, Submit, Circle, StyledSelect, StyledErrorMessage, StyledLabel, MySelect, Title}