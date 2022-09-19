import { useState } from 'react';
import TodoModal from '../TodoModal';

import Button from './Button';
import Sort from './Sort';

import styles from './Tools.module.scss';

const Tools = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className={styles.wrapper}>
			<Button text='Add Task' variant='primary' onClick={() => setIsModalOpen(true)}/>
			<Sort />
			<TodoModal type='add' isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</div>
	);
};

export default Tools;
