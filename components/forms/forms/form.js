import { useEffect, useState, useContext, useRef } from 'react'
import styled from 'styled-components'
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import { sanityClient } from '../../../lib/sanity.server'

// import { store } from "../../../../store";
// import {Cloudinary} from "@cloudinary/url-gen";

import {Container, Input, TextArea, ButtonWrapper, MyTextInput, MyTextArea, MyCheckbox, MyRadio, MyUpload, Submit, Circle, StyledSelect, StyledErrorMessage, StyledLabel, MySelect, Title} from './form-components'

import UploadButtons from './upload-buttons'


const Loading = styled.img`
    width: 20px;
    margin: 40px 0 0 0;
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

const ShowIfSelectShowing = styled.div`
  margin-left: 50px;
`



function MyUploadCloudinary({ label, ...props }) {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
  
    // useEffect(() => {
    //   initButton = false
    // }, []);

    const formikProps = useFormikContext()

    // console.log(props, field, meta, formikProps)

    if(props.attachment?.filename !== undefined) {
        // formikProps.setFieldValue(`${props.name}`, props.attachment?.filename)
    }
    
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
    // return (
    //   <Input className='my-text-input'>
    //     <label htmlFor={props.id || props.name}>{label}</label>
    //     <input className={meta.touched && meta.error && ( meta.value || initButton ) ? "text-input error" : "text-input"} {...field} {...props} />
    //     {meta.touched && meta.error && ( meta.value || initButton ) ? (
    //       <div className="error-label">{meta.error}</div>
    //     ) : null}
    //   </Input>
    // );
  };

const MyUploadOld = ({ label, attachmentName, attachmentBlob, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta, helpers] = useField(props);
  
    const [attachmentNameInner, setAttachmentNameInner] = useState(null);
  
  
    return (
      <>
        {/* <label className="caption" htmlFor={props.id || props.name}>{label}{props.isRequired && "*"}</label> */}
        <UploadWrapper id="file-upload-wrapper">
        <label htmlFor={props.id || props.name}>{label}</label>
        <UploadButton>
          {/* <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0V40H40V0H0ZM29.9312 26.25C29.9624 27.4142 29.7601 28.5728 29.3361 29.6575C28.9121 30.7422 28.2751 31.731 27.4627 32.5654C26.6503 33.3999 25.6789 34.0631 24.606 34.516C23.533 34.9688 22.3802 35.2022 21.2156 35.2022C20.051 35.2022 18.8982 34.9688 17.8253 34.516C16.7523 34.0631 15.781 33.3999 14.9686 32.5654C14.1562 31.731 13.5192 30.7422 13.0952 29.6575C12.6712 28.5728 12.4688 27.4142 12.5 26.25V11.25C12.5 9.5924 13.1585 8.00268 14.3306 6.83058C15.5027 5.65848 17.0924 5 18.75 5C20.4076 5 21.9973 5.65848 23.1694 6.83058C24.3415 8.00268 25 9.5924 25 11.25V26.25C25 27.2446 24.6049 28.1984 23.9017 28.9016C23.1984 29.6049 22.2446 30 21.25 30C20.2554 30 19.3016 29.6049 18.5983 28.9016C17.8951 28.1984 17.5 27.2446 17.5 26.25V15H20V26.25C20 26.5815 20.1317 26.8995 20.3661 27.1339C20.6005 27.3683 20.9185 27.5 21.25 27.5C21.5815 27.5 21.8995 27.3683 22.1339 27.1339C22.3683 26.8995 22.5 26.5815 22.5 26.25V11.25C22.5 10.2554 22.1049 9.30161 21.4017 8.59835C20.6984 7.89509 19.7446 7.5 18.75 7.5C17.7554 7.5 16.8016 7.89509 16.0983 8.59835C15.3951 9.30161 15 10.2554 15 11.25V26.25C14.9736 27.0828 15.1148 27.9125 15.4153 28.6897C15.7158 29.4669 16.1694 30.1757 16.7492 30.7742C17.3289 31.3727 18.0231 31.8485 18.7904 32.1735C19.5576 32.4984 20.3824 32.6659 21.2156 32.6659C22.0489 32.6659 22.8736 32.4984 23.6409 32.1735C24.4082 31.8485 25.1023 31.3727 25.6821 30.7742C26.2619 30.1757 26.7155 29.4669 27.016 28.6897C27.3164 27.9125 27.4577 27.0828 27.4312 26.25V15H29.9312V26.25Z" fill="#6CE6BB"/>
          </svg>           */}
          <UploadButtonText className="button" colour={"#6CE6BB"}>Upload file</UploadButtonText>
          <input {...field} {...props} 
            onChange={uploadToServer} 
            id="file-upload" 
            accept="application/pdf"
            value={undefined}
            />
        </UploadButton>
        {meta.touched && meta.error ? (
          <div className="error caption">{meta.error}</div>
        ) : null}
        <FileName><h5>{attachmentNameInner}</h5></FileName>
        <h5>PDF only. Max size 8mb</h5>
        </UploadWrapper>
      </>
    );
  };


function Component({ data, hasSubmitted }) {
    let widgetOne = useRef();
    let widgetTwo = useRef();
    let widgetThree = useRef();
    let widgetFour = useRef();

    let [isSubmitting, setIsSubmitting] = useState(false)

    let [numberOfPerformersIsRequired, setNumberOfPerformersIsRequired] = useState(false)
    let [hasTouchedCheckbox, setHasTouchedCheckbox] = useState(false)

    let [isUploadingOne, setIsUploadingOne] = useState(false)
    let [isUploadingTwo, setIsUploadingTwo] = useState(false)
    let [isUploadingThree, setIsUploadingThree] = useState(false)
    let [isUploadingFour, setIsUploadingFour] = useState(false)

    let [attachmentOne, setAttachmentOne] = useState(null)
    let [attachmentTwo, setAttachmentTwo] = useState(null)
    let [attachmentThree, setAttachmentThree] = useState(null)
    let [attachmentFour, setAttachmentFour] = useState(null)

    const SUPPORTED_FORMATS = ['application/pdf'];
    const FILE_SIZE = 8 * 1024 * 1024;

    const numberOfPerformersIsRequiredFunc = (val) => {
      if(val === true) {
        setNumberOfPerformersIsRequired(true)
      } else {
        setNumberOfPerformersIsRequired(false)
      }
    }

    const hasTouchedCheckboxFunc = (val) => {
      if(val === true) {
        setHasTouchedCheckbox(true)
      } else {
        setHasTouchedCheckbox(false)
      }
    }

    function ShowingFields({fields, ...props}) {
      const [field, meta, helpers] = useField(props);
    
      return (
        <>
        <MyRadio
        label={`${fields[15]?.label}*:`}
        name="showing"
        type="radio"
        list={[fields[16]?.label, fields[17]?.label]}
        popUpLabel={`${fields[18]?.label}*:`}
        popUpName="numberOfPerformers"
        hasPopUp={true}
        numberOfPerformersIsRequired={(val) => numberOfPerformersIsRequiredFunc(val)}
        hasTouchedCheckbox={(val) => hasTouchedCheckboxFunc(val)}
        />
        {
          hasTouchedCheckbox &&
          <ShowIfSelectShowing>
          <MyTextInput
            label={`${fields[19]?.label}*:`}
            name="durationOfPerformance"
            type="text"
            placeholder={''}
          />  
          <MyCheckbox
            name="longtermPerformance"
          >
          {`${fields[20]?.label}:`}
          </MyCheckbox>  
        </ShowIfSelectShowing>   
        }
        </>
      )
    }

    useEffect(() => {

      // sendMail()

        widgetOne.current = cloudinary.createUploadWidget({
            cloudName: 'dngtyfmte', 
            uploadPreset: 'lgrodwaf',
            sources: ['local'],
            clientAllowedFormats: ['pdf'],
            maxFiles: 1,
            maxFileSize: 8000000,
        }, (error, result) => { 

              if(!error && result && result.event === "queues-start") {
                setIsUploadingOne(true)
              }

              if (!error && result && result.event === "success") { 
                setIsUploadingOne(false)

                setAttachmentOne({
                    filename: result.info.original_filename,
                    url: result.info.secure_url
                })

                // console.log('Done! Here is the image info: ', result.info);
                // console.log(result.info.original_filename, result.info.secure_url); 

              }

              if(!error && result.event === "abort") {
                setIsUploadingOne(false)
              }

              if(result.failed) {
                setIsUploadingOne(false)
              }
            }
        )

        widgetTwo.current = cloudinary.createUploadWidget({
            cloudName: 'dngtyfmte', 
            uploadPreset: 'lgrodwaf',
            sources: ['local'],
            clientAllowedFormats: ['pdf'],
            maxFiles: 1,
            maxFileSize: 8000000,
        }, (error, result) => { 
            // info: "shown" | "hidden" | "minimized" | "expanded"  
            if(!error && result && result.event === "queues-start") {
                setIsUploadingTwo(true)
              }

              if (!error && result && result.event === "success") { 
                setIsUploadingTwo(false)

                setAttachmentTwo({
                    filename: result.info.original_filename,
                    url: result.info.secure_url
                })

                // console.log('Done! Here is the image info: ', result.info);
                // console.log(result.info.original_filename, result.info.secure_url); 
              }

              if(!error && result.event === "abort") {
                setIsUploadingTwo(false)
              }

              if(result.failed) {
                setIsUploadingTwo(false)
              }
            }
        )

        widgetThree.current = cloudinary.createUploadWidget({
            cloudName: 'dngtyfmte', 
            uploadPreset: 'lgrodwaf',
            sources: ['local'],
            clientAllowedFormats: ['pdf'],
            maxFiles: 1,
            maxFileSize: 8000000,
        }, (error, result) => { 
            if(!error && result && result.event === "queues-start") {
                setIsUploadingThree(true)
              }

              if (!error && result && result.event === "success") { 
                setIsUploadingThree(false)

                setAttachmentThree({
                    filename: result.info.original_filename,
                    url: result.info.secure_url
                })

                // console.log('Done! Here is the image info: ', result.info);
                // console.log(result.info.original_filename, result.info.secure_url); 
              }

              if(!error && result.event === "abort") {
                setIsUploadingThree(false)
              }

              if(result.failed) {
                setIsUploadingThree(false)
              }
            }
        )

        widgetFour.current = cloudinary.createUploadWidget({
            cloudName: 'dngtyfmte', 
            uploadPreset: 'lgrodwaf',
            sources: ['local'],
            clientAllowedFormats: ['pdf'],
            maxFiles: 1,
            maxFileSize: 8000000,
        }, (error, result) => { 
            if(!error && result && result.event === "queues-start") {
                setIsUploadingFour(true)
              }

              if (!error && result && result.event === "success") { 
                setIsUploadingFour(false)

                setAttachmentFour({
                    filename: result.info.original_filename,
                    url: result.info.secure_url
                })

                // console.log('Done! Here is the image info: ', result.info);
                // console.log(result.info.original_filename, result.info.secure_url); 
              }

              if(!error && result.event === "abort") {
                setIsUploadingFour(false)
              }

              if(result.failed) {
                setIsUploadingFour(false)
              }
            }
        )        
        
    }, [])


    const sendMail = async (data) => {

        let html = `
        <p>
            Name: ${data.name} <br/>
            First name: ${data.firstName} <br/>
            Pronouns: ${data.pronouns} <br/>
            Date of birth: ${data.dob} <br/>
            Nationality: ${data.nationality} <br/>
            Resident of Switzerland since: ${data.residentOfSwitzerlandSince} <br/>
            Street / Number: ${data.streetNumber} <br/>
            Postal code / Town: ${data.postalCodeTown} <br/>
            Phone number: ${data.phoneNumber} <br/>
            Email: ${data.email} <br/>
            I will be showing a: ${data.showing} <br/>
            Number of Performers: ${data.numberOfPerformers} <br/>
            Duration of the Performance: ${data.durationOfPerformance} <br/>
            Long-term performance: ${data.longtermPerformance} <br/>
            The authorship of this performance lies with: ${data.authorship} <br/>
            Other participants (names, roles): ${data.otherParticipants} <br/>
            Websites / Videolinks: ${data.websitesAndLinks} <br/>
            I confirm that I am not enrolled in a BA curriculum at an art school or art academy in the current year: ${data.confirmation} <br/>
            I confirm that I have been living and officially registered in Switzerland since at least 1 January 2023: ${data.confirmationTwo} <br/><br/>
            Files:<br/>
            ${attachmentOne !== null ? `<a href="${attachmentOne?.url}">${attachmentOne?.filename}</a><br/>` : ``}
            ${attachmentTwo !== null ? `<a href="${attachmentTwo?.url}">${attachmentTwo?.filename}</a><br/>` : ``}
            ${attachmentThree !== null ? `<a href="${attachmentThree?.url}">${attachmentThree?.filename}</a><br/>` : ``}
            ${attachmentFour !== null ? `<a href="${attachmentFour?.url}">${attachmentFour?.filename}</a>` : ``}
        </p>
        `

        // let html = '<p></p>'

        let dataObj = {
        email: data.email,
        subject: `New Submission: ${data.firstName} ${data.name} - ${data.email}`,
        html: html,
        name: `${data.firstName} ${data.name}`,
        // attachmentNameOne: attachmentNameOne ? attachmentNameOne.name : null,
        // attachmentBlobOne: attachmentBlobOne,
        // attachmentNameTwo: attachmentNameTwo ? attachmentNameTwo.name : null,
        // attachmentBlobTwo: attachmentBlobTwo,
        // attachmentNameThree: attachmentNameThree ? attachmentNameThree.name : null,
        // attachmentBlobThree: attachmentBlobThree
        }

        // let dataObj = {
        //   email: 'samabassett@gmail.com',
        //   subject: `New Submission:`,
        //   html: html,
        //   name: `sam`,
        //   // attachmentNameOne: attachmentNameOne ? attachmentNameOne.name : null,
        //   // attachmentBlobOne: attachmentBlobOne,
        //   // attachmentNameTwo: attachmentNameTwo ? attachmentNameTwo.name : null,
        //   // attachmentBlobTwo: attachmentBlobTwo,
        //   // attachmentNameThree: attachmentNameThree ? attachmentNameThree.name : null,
        //   // attachmentBlobThree: attachmentBlobThree
        //   }

        try {
        let res = await fetch("/api/email", {
            "method": "POST",
            "headers": { "content-type": "application/json" },
            "body": JSON.stringify(dataObj)
        })
    


        // console.log(res)

        if(res.status !== 200) return console.log('error')

        // setFormHasValidated(true);
        hasSubmitted()

        window.scrollTo(0,0);


        } catch (error) {
            console.log(error)
        }

    }    

    let fields = data.fields;

    if(fields === null) return null;


    return (
        <Container>
            <Formik
            initialValues={{
            name: "",
            firstName: "",
            pronouns: "",
            dob: "",
            nationality: "",
            residentOfSwitzerlandSince: "",
            streetNumber: "",
            postalCodeTown: "",
            phoneNumber: "",
            email: "",
            correspondanceLanguage: "",
            showing: "",
            numberOfPerformers: "",
            durationOfPerformance: "",
            longtermPerformance: false,
            authorship: "",
            otherParticipants: "",
            websitesAndLinks: "",
            confirmation: false,
            confirmationTwo: false,
            uploadOne: "",
            uploadTwo: "",
            uploadThree: "",
            uploadFour: "",
            // checkboxOne: true,
            // checkboxTwo: false
            }}
            validationSchema={Yup.object({
            name: Yup.string()
            .required("Required"),
            firstName: Yup.string()
            .required("Required"),
            pronouns:  Yup.string(),
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
            correspondanceLanguage: Yup.string()
            .required("Required"),
            showing: Yup.string()
            .required("Required"),
            numberOfPerformers: numberOfPerformersIsRequired ? Yup.string()
            .required("Required") : Yup.string(),
            durationOfPerformance: Yup.string()
            .required("Required"),
            longtermPerformance: Yup.boolean(),
            authorship: Yup.string(),
            // .required("Required"),
            otherParticipants: Yup.string(),
            // .required("Required"),
            websitesAndLinks: Yup.string(),
            // .required("Required"),
            confirmation: Yup.boolean()
            .required("Required")
            .oneOf([true], "Must fill in."),
            confirmationTwo: Yup.boolean()
            .required("Required")
            .oneOf([true], "Must fill in."),
            uploadOne: Yup.mixed(),
            uploadTwo: Yup.mixed(),
            // .required("Required"),
            uploadThree: Yup.mixed(),
            uploadFour: Yup.mixed()
            })}
            onSubmit={async (values, { setSubmitting }) => {
            // console.log(values)
            sendMail(values)
            setIsSubmitting(true)
            // await new Promise(r => setTimeout(r, 500));
            // setSubmitting(false);
            // addtextToList(values);
            // dispatch({type: "update notification message", value: fields.signUpConfirmationText})
            }}
            >
            <Form>  
                <MyTextInput
                label={`${fields[0]?.label}*:`}
                name="name"
                type="text"
                placeholder={''}
                />              
                <MyTextInput
                label={`${fields[1]?.label}*:`}
                name="firstName"
                type="text"
                placeholder={''}
                />   
                <MyTextInput
                label={`${fields[2]?.label}:`}
                name="pronouns"
                type="text"
                placeholder={''}
                />                                                   
                <MyTextInput
                label={`${fields[3]?.label}*:`}
                name="dob"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[4]?.label}*:`}
                name="nationality"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[5]?.label}*:`}
                name="residentOfSwitzerlandSince"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[6]?.label}*:`}
                name="streetNumber"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[7]?.label}*:`}
                name="postalCodeTown"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[8]?.label}*:`}
                name="phoneNumber"
                type="text"
                placeholder={''}
                /> 
                <MyTextInput
                label={`${fields[9]?.label}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyRadio
                label={`${fields[10]?.label}*:`}
                name="correspondanceLanguage"
                type="radio"
                list={[fields[11]?.label, fields[12]?.label, fields[13]?.label, fields[14]?.label]}
                />  
                <ShowingFields name="showing" fields={fields}/>               
                <MyTextInput
                label={`${fields[21]?.label}:`}
                name="authorship"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[22]?.label}:`}
                name="otherParticipants"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[23]?.label}:`}
                name="websitesAndLinks"
                type="text"
                placeholder={''}
                />
                {/* <MyTextInput
                label={`${fields[16]?.label}*:`}
                name="confirmation"
                type="text"
                placeholder={''}
                /> */}
                <MyCheckbox
                name="confirmation"
                >
                {`${fields[24]?.label}*:`}
                </MyCheckbox>   
                <MyCheckbox
                name="confirmationTwo"
                >
                {`${fields[25]?.label}*:`}
                </MyCheckbox>               
                <Title>{data.subtitleTwo}</Title>
                {/* <MyTextInput
                label={`${fields[18]?.label}:`}
                name="uploadOne"
                type="text"
                placeholder={''}
                /> 
                <MyTextInput
                label={`${fields[19]?.label}:`}
                name="uploadTwo"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[20]?.label}:`}
                name="uploadThree"
                type="text"
                placeholder={''}
                /> */}
                <UploadButtons 
                    fields={fields}
                    attachmentOne={attachmentOne}
                    attachmentTwo={attachmentTwo}
                    attachmentThree={attachmentThree}
                    attachmentFour={attachmentFour}
                    widgetOneOpen={() => widgetOne.current.open()}
                    widgetTwoOpen={() => widgetTwo.current.open()}
                    widgetThreeOpen={() => widgetThree.current.open()}
                    widgetFourOpen={() => widgetFour.current.open()}
                />
                {/* <div onClick={() => widgetOne.current.open()}>
                    <MyUploadCloudinary 
                        label={fields[18]?.label}
                        type="text"
                        name="uploadOne"
                        widget={widgetOne.current}
                        attachment={attachmentOne}
                    />
                </div>
                <div onClick={() => widgetTwo.current.open()}>
                    <MyUploadCloudinary 
                        label={fields[19]?.label}
                        type="text"
                        name="uploadTwo"
                        widget={widgetTwo.current}
                        attachment={attachmentTwo}
                    />
                </div>
                <div onClick={() => widgetThree.current.open()}>
                    <MyUploadCloudinary 
                        label={fields[20]?.label}
                        type="text"
                        name="uploadThree"
                        widget={widgetThree.current}
                        attachment={attachmentThree}
                    />   
                </div>                              */}
                {/* <MyUpload
                    label={fields[18]?.label}
                    type="file"
                    name="uploadOne"
                    attachmentName={(attachmentName) => setAttachmentNameOne(attachmentName)}
                    attachmentBlob={(attachmentBlob) => setAttachmentBlobOne(attachmentBlob)}
                />
                <MyUpload
                    label={fields[19]?.label}
                    type="file"
                    name="uploadTwo"
                    attachmentName={(attachmentName) => setAttachmentNameTwo(attachmentName)}
                    attachmentBlob={(attachmentBlob) => setAttachmentBlobTwo(attachmentBlob)}
                />  
                <MyUpload
                    label={fields[20]?.label}
                    type="file"
                    name="uploadThree"
                    attachmentName={(attachmentName) => setAttachmentNameThree(attachmentName)}
                    attachmentBlob={(attachmentBlob) => setAttachmentBlobThree(attachmentBlob)}
                />                                                                                                                                                                                                                                                                                                                                     */}
                {/* <MyTextArea
                label={''}
                name="information"
                placeholder={'Why are you declaring? In a sentence or two, tell us why you’re joining Design Declares'}
                /> */}
                {/* <MyCheckbox
                name="checkboxOne"
                >
                I consent for my fields to be used for the purpose of the Declaration
                </MyCheckbox>  */}
                {/* <MyCheckbox
                name="checkboxTwo"
                >
                I consent for my name and reason for joining to be used in the promotion of the Declaration on this site, and across our social channels
                </MyCheckbox>                               */}
                {
                !isSubmitting ?
                <Submit 
                isUploadingOne={isUploadingOne}
                isUploadingTwo={isUploadingTwo}
                isUploadingThree={isUploadingThree}
                isUploadingFour={isUploadingFour}
                >{data.submitButton}<Circle id="circle" /></Submit>
                :
                <Loading src="/images/loading.gif" />
                }
            </Form>
            </Formik>
        </Container>
    )
}

export default Component