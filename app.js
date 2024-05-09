const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Configurar bodyParser para parsear el cuerpo de las solicitudes POST
app.use(bodyParser.json());
app.use(cors());
// Configurar un endpoint para recibir los datos del formulario
app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Configurar nodemailer para enviar el correo electrónico
  const transporter = nodemailer.createTransport({
    
    service: 'gmail',
    auth: {
      user: 'facufr12@gmail.com',
      pass: 'xirdbbschcmnfrum',
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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
