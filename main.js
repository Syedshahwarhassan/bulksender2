const express=require('express')
const nodemailer=require('nodemailer')
const app=express();
require("dotenv").config();

app.listen(4600,()=>console.log('Server is running on port 4600'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); 
app.use(express.json());
app.use(express.static(__dirname + '/public'));

let emaillist=[
  "contact@digitalsohail.com",
  "info@aamax.co",
  "info@avanzasolutions.com",
  "info@itgenesis.net",
  "contact@arbisoft.com",
   "hi@techabout.com",
  "info@northbaysolutions.com",
  "sales@ranatechnologies.com",
"  info@pixelpk.com",
  "contact@bittechnologies.com",
]
  app.get('/',(req,res)=>{
    res.render('index')
  })
  app.post('/send', async (req, res) => {
    const { subject,content } = req.body; 
    if(!subject||!content){
      return res.status(400).send('Please provide subject and content.');
    }
    const transport=nodemailer.createTransport({
      service: 'gmail',
      port:487,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
      }
    })
  
   emaillist.forEach((c,i)=>{
    const mailOptions={
      from: process.env.EMAIL_ADDRESS,
      to: c,
      subject: subject,
      html: content
    }
    transport.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.log('Error occurred:', error);
        res.status(500).send('Email sending failed.');
      } else {
        console.log('Email sent successfully:', info.response);
        res.status(200).send('Email sent successfully.');
      }
    });
   })
 
});








