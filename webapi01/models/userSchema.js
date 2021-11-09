const Joi = require('joi');

module.exports = Joi.object({
	name: Joi.string().min(5).max(150).required(),

	age: Joi.number().integer().min(18).required(),

	uf: Joi.string().length(2),

	password: Joi.string()
		.min(6)
		.pattern(/^(?=.*[0-9]+.*)\w+$/i),

	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net', 'br', 'pt'] },
	}),
});
