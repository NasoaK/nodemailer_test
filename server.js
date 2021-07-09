const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 5000;

//Middleware

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/contactForm.html')
})

app.post('/',(req,res)=>{
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        service: 'GMAIL',
        auth:{
            user: 'mikael.kombia@gmail.com',
            pass: 'Motdepasse1'
        }
    });

    const mailOption = {
        from: req.body.email,
        to: 'mikael.kombia@gmail.com',
        subject: `Message from ${req.body.email} : ${req.body.subject}`,
        text: req.body.message,
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>  <img src="cid:mailtrap" alt="Photos from Max Ravier @pexels" style="width:100vw; height:100vh; object-fit:cover"/>',
        attachments: [
            {   filename: "mailtrap.png",
                path:"mail.jpg",
              cid: 'mailtrap'
            }
          ]
    }

    transporter.sendMail(mailOption, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console;log('Email success');
            res.send('success');
        }
    })
    
})
//Default Middleware


/* 
const www = process.env.WWW || './';

app.use(express.static(www));

console.log(`serving ${www}`);
app.get('*', (req, res) => {
    res.sendFile(`index.html`, { root: www });
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
 */

app.get('/',(req,res)=>{
    res.send('hello !')
})

app.listen(port,()=>{
    console.log(`Server running on PORT ${port}`)
})