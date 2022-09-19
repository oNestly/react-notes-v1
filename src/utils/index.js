const buttonClasses = {
	primary: 'primary',
	secondary: 'secondary',
}

const getClasses = (classes) => {
	return classes
		.filter((item) => item !== '')
		.join(' ')
		.trim();
};

export { getClasses, buttonClasses }