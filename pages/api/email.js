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

 
  const { email, subject, message, name, attachmentName, attachmentBlob } = req.body


  // let msg = {
  //   to: [{email: email, name: name}],
  //   from: {email: 'incansuk@gmail.com', name:'Incans UK'},
  //   // cc: [{email: 'incansuk@gmail.com', name: 'Incans UK'}],
  //   content: [{type:'text/plain', value: message}],
  //   subject: subject,
  // };


  let msg = {
    // to: [{email: 'incansuk@gmail.com', name: 'Incans UK'}],
    to: [{email: 'info@incans.com', name: 'Incans UK'}],
    from: {email: 'incansuk@gmail.com', name:'Incans UK'},
    // cc: [{email: 'incansuk@gmail.com', name: 'Incans UK'}],
    content: [{type:'text/plain', value: message.length > 0 ? message : " "}],
    subject: subject,
    // text: message,  
  };


  if(attachmentName !== null && attachmentBlob !== null) {

    msg = {
      // to: [{email: 'incansuk@gmail.com', name: 'Incans UK'}],
      to: [{email: 'info@incans.com', name: 'Incans UK'}],
      from: {email: 'incansuk@gmail.com', name:'Incans UK'},
      // cc: [{email: 'incansuk@gmail.com', name: 'Incans UK'}],
      content: [{type:'text/plain', value: message}],
      subject: subject,
      // text: message,
        attachments: [
          {
            // content: attachment,
            content: attachmentBlob,
            filename: attachmentName,
            // type: "application/pdf",
            disposition: "attachment"
          }
        ]    
    };
  }

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` })
  } catch (error) {
    // console.log(error.response.body.errors)
    res.status(500).json({ error: 'Error sending email' })
  }
}