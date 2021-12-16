module.exports = function (to, subject, text) {
	const nodemailer = require('nodemailer');

	const {
		SMTP_SERVER: host,
		SMTP_PORT: port,
		SMTP_USERNAME: user,
		SMTP_PASSWORD: pass,
	} = process.env;

	const smtpTransport = nodemailer.createTransport({
		host: host,
		port: parseInt(port),
		secure: false,
		auth: { user, pass },
	});

	const message = { from: user, to, subject, text };

	smtpTransport.sendMail(message, (err, res) => {
		if (err) console.error(`Erro ao enviar email: ${err}`);
		else console.log('Email enviado com sucesso!');

		smtpTransport.close();
	});
};
