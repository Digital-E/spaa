import { useEffect, useState } from 'react'
import { useField, useFormikContext } from "formik";

import styled from "styled-components";



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
    }

    .checkbox > input {
        height: 15px;
        width: 15px;
        min-height: 15px;
        min-width: 15px;
        border-radius: 999px;
        -webkit-appearance: none;
        border: 1px solid black !important;
        margin-left: 10px;
        flex-grow: initial;
        cursor: pointer;
    }

    .checkbox > input:checked {
        background: #b0b0b0;
    }

    .checkbox-error > label {
      color: red;
    }

    button {
        display: flex;
        align-items center;
        -webkit-appearance: none;
        border: none;
        background: none;
        width: fit-content;
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

const Radio = styled.div`
    display: flex;

    &&.error > label {
      color: red;
    }

    fieldset > div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    fieldset input {
      -webkit-appearance: none;
      width: 15px;
      height: 15px;
      min-width: 15px;
      min-height: 15px;
      border-radius: 999px;
      border: 1px solid black !important;
      flex-grow: initial;
      cursor: pointer;
      margin-left: 10px;
    }

    fieldset input.is-selected {
      background: gray;
    }
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
        <label className="small-text" htmlFor={props.id || props.name}>{children}</label>
        <input {...field} {...props} type="checkbox" />
      </div>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

const MyRadio = ({ label, list, ...props }) => {
  const [field, meta] = useField({ ...props, type: "radio" });

  
  return (
    <>
      <Radio className={meta.touched && meta.error ? "error" : ""}>
        <label className="small-text" htmlFor={props.id || props.name}>{label}</label>
        <fieldset>
          {
            list.map((item) => 
              <div>
                <input  {...field} {...props} value={item} className={meta.value === item ? "is-selected radio" : "radio"} />
                <label className="small-text" htmlFor={item}>{item}</label>
              </div>              
              )
          }
        </fieldset>
      </Radio>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

{/* <fieldset>
    <legend>Select a maintenance drone:</legend>

    <div>
      <input type="radio" id="huey" name="drone" value="huey"
             checked>
      <label for="huey">Huey</label>
    </div>

    <div>
      <input type="radio" id="dewey" name="drone" value="dewey">
      <label for="dewey">Dewey</label>
    </div>

    <div>
      <input type="radio" id="louie" name="drone" value="louie">
      <label for="louie">Louie</label>
    </div>
</fieldset> */}

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


export {Container, Input, TextArea, ButtonWrapper, MyTextInput, MyTextArea, MyCheckbox, MyRadio, Submit, Circle, StyledSelect, StyledErrorMessage, StyledLabel, MySelect, Title}