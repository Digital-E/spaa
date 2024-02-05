import { useEffect, useState, useContext, useRef } from 'react'
import styled from 'styled-components'
import { useField } from "formik";

const Container = styled.div`
    width: fit-content;
`


const UploadWrapper = styled.div`
    position: relative;
    margin-bottom: 25px;

    label {
      margin-bottom: 15px;
      display: block;
    }

    h5 {
      color: gray;
    }
`


const UploadButton = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: fit-content;
    margin-bottom: 10px;
    cursor: pointer;

    :hover span {
      color: gray;
    }

    #file-upload {
      position: absolute;
      height: 100%;
      width: 100%;
      cursor: pointer;
      opacity: 0;
      font-size: 0;
    }

    input {
        opacity: 0;
    }
`

const UploadButtonText = styled.span`
    position: relative;
`

const FileName = styled.div`
  margin-bottom: 10px;
  * {
    margin: 0;
  }
`

function MyUploadCloudinary({ label, ...props }) {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
  
    // useEffect(() => {
    //   initButton = false
    // }, []);
    
    return (
        <>
          {/* <label className="caption" htmlFor={props.id || props.name}>{label}{props.isRequired && "*"}</label> */}
          <UploadWrapper id="file-upload-wrapper">
          <label htmlFor={props.id || props.name}>{label}</label>
          <UploadButton>
            <UploadButtonText className="button" colour={"#6CE6BB"}>Upload file</UploadButtonText>
            <input {...field} {...props} />
          </UploadButton>
          {meta.touched && meta.error ? (
            <div className="error caption">{meta.error}</div>
          ) : null}
          {/* <FileName><h5>{attachmentNameInner}</h5></FileName> */}
          <FileName><h5>{props.attachment?.filename}</h5></FileName>
          <h5>PDF only. Max size 8mb</h5>
          </UploadWrapper>
        </>
      );
  };



function Component({ fields, attachmentOne, attachmentTwo, attachmentThree, attachmentFour, widgetOneOpen, widgetTwoOpen, widgetThreeOpen, widgetFourOpen }) {



    return (
        <Container>
                <div onClick={() => widgetOneOpen()}>
                    <MyUploadCloudinary 
                        label={fields[26]?.label}
                        type="text"
                        name="uploadOne"
                        attachment={attachmentOne}
                    />
                </div>
                <div onClick={() => widgetTwoOpen()}>
                    <MyUploadCloudinary 
                        label={fields[27]?.label}
                        type="text"
                        name="uploadTwo"
                        attachment={attachmentTwo}
                    />
                </div>
                <div onClick={() => widgetThreeOpen()}>
                    <MyUploadCloudinary 
                        label={fields[28]?.label}
                        type="text"
                        name="uploadThree"
                        attachment={attachmentThree}
                    />   
                </div>
                <div onClick={() => widgetFourOpen()}>
                    <MyUploadCloudinary 
                        label={fields[29]?.label}
                        type="text"
                        name="uploadThree"
                        attachment={attachmentFour}
                    />   
                </div>                                               
        </Container>
    )
}

export default Component