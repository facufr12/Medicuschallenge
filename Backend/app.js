const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;


// Llamamos a las .env
require('dotenv').config();

// Parseamos los datos a JSON
app.use(bodyParser.json());
app.use(cors());
// Este sera el endpoint al que le pegaremos para consumir los datos
app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Para el envio de mails utilzamos la libreria Nodemailer de NPM.
  const transporter = nodemailer.createTransport({
    
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    }
  });

  const mailOptions = {
    from: 'facufr12@gmail.com',
    to: 'admin@grupocober.online',
    subject: 'Nuevo Suscriptor',
    text: `Nuevo suscriptor con email: ${formData.email}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Email enviado: ' + info.response);
      res.status(200).send('Datos del formulario recibidos correctamente');
    }
  });
});

// Escuchamos al server
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
