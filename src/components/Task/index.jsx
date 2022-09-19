import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdDelete, MdEdit } from 'react-icons/md';

import { getClasses } from '../../utils';
import styles from './Task.module.scss';
import { deleteTodo, updateTodo } from '../../redux/slices/todoSlice';
import toast from 'react-hot-toast';
import TodoModal from '../TodoModal';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const Task = ({ id, title, status, date, todo }) => {
	const dispatch = useDispatch();
	const [checked, setChecked] = useState(false);
	const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

	const pathLength = useMotionValue(0);
	const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

	useEffect(() => {
		if (todo.status === 'complete') {
			setChecked(true);
		}
		if (todo.status !== 'complete') {
			setChecked(false);
		}
	}, [todo.status]);

	const handleDelete = () => {
		dispatch(deleteTodo(id));
		toast.success('Task deleted successfully');
	};
	const handleUpdate = () => {
		setUpdateModalIsOpen(true);
	};
	const handleChecked = () => {
		setChecked(!checked);
		dispatch(
			updateTodo({
				...todo,
				status: checked ? 'incomplete' : 'complete',
			})
		);
	};

	const checkVariants = {
		initial: {
			color: '#fff',
		},
		checked: {
			pathLength: 1,
		},
		unchecked: {
			pathLength: 0,
		},
	};

	const boxVariants = {
		checked: {
			background: 'var(--primaryPurple)',
			transition: {
				duration: 0.1,
			},
		},
		unchecked: {
			background: 'var(--gray-1)',
			transition: {
				duration: 0.1,
			},
		},
	};

	const child = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
		exit: {
			scale: 0.95,
			opacity: 0,
		}
	};

	return (
		<>
			<motion.div layout className={styles.item} variants={child} initial='hidden' animate='visible' exit='exit'>
				<div className={styles.todoDetails}>
					<motion.div
						className={styles.svgBox}
						variants={boxVariants}
						animate={checked ? 'checked' : 'unchecked'}
						onClick={() => {
							handleChecked();
						}}
					>
						<motion.svg
							className={styles.svg}
							viewBox='0 0 53 38'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<motion.path
								style={{ pathLength, opacity }}
								animate={checked ? 'checked' : 'unchecked'}
								variants={checkVariants}
								fill='none'
								strokeMiterlimit='10'
								strokeWidth='6'
								d='M1.5 22L16 36.5L51.5 1'
								strokeLinejoin='round'
								strokeLinecap='round'
							></motion.path>
						</motion.svg>
					</motion.div>
					<div className={styles.texts}>
						<p
							className={getClasses([
								styles.todoText,
								status === 'complete' && styles['todoText--completed'],
							])}
						>
							{title}
						</p>
						<p className={styles.time}>{date}</p>
					</div>
				</div>
				<div className={styles.todoActions}>
					<div
						className={styles.icon}
						onClick={() => handleUpdate()}
						onKeyDown={() => handleUpdate()}
						role='button'
						tabIndex={0}
					>
						<MdEdit />
					</div>
					<div
						className={styles.icon}
						onClick={() => handleDelete()}
						onKeyDown={() => handleDelete()}
						role='button'
						tabIndex={0}
					>
						<MdDelete />
					</div>
				</div>
			</motion.div>
			<TodoModal
				type='update'
				isModalOpen={updateModalIsOpen}
				setIsModalOpen={setUpdateModalIsOpen}
				todo={todo}
			/>
		</>
	);
};

export default Task;
