module.exports = (word) => {
	const splitString = word.split('');

	const reverseArray = splitString.reverse();

	const reverseWord = reverseArray.join('');

	return word === reverseWord;
};
