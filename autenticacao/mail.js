module.exports = function (to, subject, text) {
  const nodemailer = require('nodemailer');

  const {
    env: {
      SMTP_SERVER: host,
      SMTP_PORT: port,
      SMTP_USERNAME: user,
      SMTP_PASSWORD: pass,
    },
  } = process;

  const smtpTransport = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: false,
    auth: { user, pass },
  });

  const message = { from: user, to, subject, text };

  smtpTransport.sendMail(message, (error, response) => {
    if (error) return console.error(`Erro ao enviar email: ${error}`);

    console.log('Email enviado com sucesso');

    smtpTransport.close();
  });
};
