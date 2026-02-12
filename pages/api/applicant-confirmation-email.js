import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const fs = require("fs");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb'
    }
  }
}


export default async (req, res) => {

 
  const { email, subject, html, name, 
    // attachmentNameOne, attachmentBlobOne,
    // attachmentNameTwo, attachmentBlobTwo,
    // attachmentNameThree, attachmentBlobThree
    } = req.body


  // let msg = {
  //   to: [{email: email, name: name}],
  //   from: {email: 'incansuk@gmail.com', name:'Incans UK'},
  //   // cc: [{email: 'incansuk@gmail.com', name: 'Incans UK'}],
  //   content: [{type:'text/plain', value: message}],
  //   subject: subject,
  // };

    // contact@performanceartaward.ch
    // let toEmail = 'contact@performanceartaward.ch'
    // let toEmail = 'info@evaknuesel.ch'
    // let toEmail = 'samabassett@gmail.com'
    // let toEmail = 'hello@samuelbassett.xyz'
    // let toEmail = 'b+spaa@sunarjo.com'
    let toEmail = email

    // let fromEmail = 'swisspaa@gmail.com'
    let fromEmail = 'application@performanceartaward.ch'


  // let attachment = {
  //   content: '',
  //   filename: '',
  //   disposition: "attachment"
  // }

  // let attachments = []

  // let addAttachment = (blob, name) => {

  //   let attachment = {
  //     content: blob,
  //     filename: name,
  //     disposition: "attachment"
  //   }

  //   attachments.push(attachment)
  // }

  // if(attachmentBlobOne !== null && attachmentNameOne !== null) {
  //   addAttachment(attachmentBlobOne, attachmentNameOne)
  // }

  // if(attachmentBlobTwo !== null && attachmentNameTwo !== null) {
  //   addAttachment(attachmentBlobTwo, attachmentNameTwo)
  // }

  // if(attachmentBlobThree !== null && attachmentNameThree !== null) {
  //   addAttachment(attachmentBlobThree, attachmentNameThree)
  // }


  let msg = {
    // to: [{email: toEmail, name: 'Swiss Perfomance Art Award'}],
    personalizations: [
      {
        to: [
          {
            email: toEmail,
            name: 'Swiss Perfomance Art Award'
          },
        ],
        bcc: [
          {
            email: 'swisspaa@gmail.com',
            name: 'Swiss Performance Art Award'
          }      
        ],
      }
    ],
    from: {email: fromEmail, name:'Swiss Perfomance Art Award'},
    // content: [{type:'text/plain', value: message !== undefined ? message : " "}],
    html: html,
    subject: subject,
    // attachments: attachments   
  }; 

  // console.log(html, subject)

  try {
    let response = await sgMail.send(msg);
    // console.log("success", response)
    res.json({ message: `Email has been sent` })
  } catch (error) {
    // console.log("error", error)
    res.status(500).json({ error: 'Error sending email' })
  }
}