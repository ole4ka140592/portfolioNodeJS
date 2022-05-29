const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let portfolio_login = process.env.PORTFOLIO_LOGIN || "---";
let portfolio_password = process.env.PORTFOLIO_PASSWORD || "---";
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: portfolio_login,
        pass: portfolio_password,
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async function (req, res) {
    let {name, email, message} = req.body

    let info = await transporter.sendMail({
        from: "HR writes",
        to: "free.it.free1@gmail.com",
        subject: "HR writes",
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