const express = require('express');
const app = express();
const port = 3000;
const nodemailer = require("nodemailer");

const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    // requireTLS: true,
    // service: "gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    // secure: false,
    // port: 25,
    // tls: {
    //     rejectUnauthorized: false
    // },
    auth: {
        user: "free.it.free1@gmail.com", // generated ethereal user
        pass: "92free.it.free1234567", // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async function (req, res) {

    let {name, email, message} = req.body
//     // let {values} = req.body
//
    let info = await transporter.sendMail({
        from: "HR writes", // sender address
        to: "free.it.free1@gmail.com", // list of receivers
        subject: "HR writes", // Subject line
        html: `<b>Сообщение с вашего Portfolio</b>
        <div>name: ${name}</div>
        <div>email: ${email}</div>
        <div>message: ${message}</div>`,
    });
        res.send("ok")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})