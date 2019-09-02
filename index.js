const bodyParser = require('body-parser')
const express = require('express')
const nodemailer = require('nodemailer')

require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))

const contactAddress = 'contact@specweb.com.au'

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
})

app.post("/contact", function(req, res) {
  console.log(req.body)
  mailer.sendMail(
    {
      from: [contactAddress],
      to: [contactAddress],
      subject: `Message from ${req.body.name}`,
      html: `
        <p>Email Address: ${req.body.email} </p>
        <p>Message: ${req.body.message}</p>
      `
    },
    function(err, info) {
      if (err) return res.status(500).send(err)
      res.json({ success: true })
    }
  )
})

app.listen(3000)