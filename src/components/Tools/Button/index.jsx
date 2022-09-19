import React from 'react';

import { getClasses, buttonClasses } from '../../../utils';

import styles from '../Tools.module.scss';

const Button = ({ text, variant, type, ...props}) => {
	return (
		<button
			className={getClasses([styles.button, styles[`${buttonClasses[variant]}`]])}
			type={type === 'submit' ? 'submit' : 'button'}
			{...props}
		>
			{text}
		</button>
	);
};

export default Button;
