const makePerson = (name, age) => {
	return { name, age };
};

persons = [];

for (let index = 0; index < 10; index++) {
	persons.push(makePerson(`person${index + 1}`, 20 + index));
}

/* persons.forEach((person) => {
	console.log(person.name);
}); */

persons.map((person) => {
	console.log(person.name);
});
