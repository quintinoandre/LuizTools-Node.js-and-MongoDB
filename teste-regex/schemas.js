const Joi = require('joi');

const result = /abc/.exec('teste'); //retorna um array de possibilidades que deu match. Este array pode ser vazio se não deu nenhum match.

const isValid = /abc/.test('nome'); //retorna true ou false.

const schema = Joi.object({
	username: Joi.string().pattern(/luiz./i).require(),
});

module.exports = schema;
