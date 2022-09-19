import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { addTodo, updateTodo } from '../../redux/slices/todoSlice';
import Button from '../Tools/Button';

import styles from './TodoModal.module.scss';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

const TodoModal = ({ type, isModalOpen, setIsModalOpen, todo }) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [status, setStatus] = useState('incomplete');

	useEffect(() => {
		if (type === 'update' && todo) {
			setTitle(todo.title);
			setStatus(todo.status);
		}
		if (type !== 'update' && !todo) {
			setTitle('');
			setStatus('incomplete');
		}
	}, [type, todo, isModalOpen]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title) {
			toast.error('Please enter a title');
			return;
		}
		if (title && status) {
			if (type === 'add') {
				dispatch(
					addTodo({
						id: uuid(),
						title,
						status,
						date: new Date().toLocaleString(),
					})
				);
				toast.success('Task successfully added');
				setIsModalOpen(false);
			}
			if (type === 'update') {
				if (todo.title !== title || todo.status !== status) {
					dispatch(
						updateTodo({
							...todo,
							title,
							status,
						})
					);
					toast.success('Task successfully updated');
					setIsModalOpen(false);
					return;
				}
				if (todo.title === title || todo.status === status) {
					toast.error('No changes made');
					return;
				}
			}
		}
	};

	return (
		<AnimatePresence>
			{isModalOpen && (
				<motion.div className={styles.wrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					<motion.div className={styles.container} variants={dropIn} initial='hidden' animate='visible' exit='exit'>
						<motion.div
							className={styles.closeButton}
							onClick={() => setIsModalOpen(false)}
							onKeyDown={() => setIsModalOpen(false)}
							tabIndex={0}
							role='button'
							initial={{ top: 40, opacity: 0 }}
							animate={{ top: -10, opacity: 1 }}
							exit={{ top: 40, opacity: 0 }}
						>
							<MdOutlineClose />
						</motion.div>
						<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
							<h2 className={styles.formTitle}>{type === 'update' ? 'Update' : 'Add'} Task</h2>
							<label htmlFor='title'>
								Title
								<input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
							</label>
							<label htmlFor='status'>
								Status
								<select name='status' id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
									<option value='incomplete'>Incomplete</option>
									<option value='complete'>Complete</option>
								</select>
							</label>
							<div className={styles.buttonContainer}>
								<Button
									text={[type === 'update' ? 'Update' : 'Add', ' Task']}
									type='submit'
									variant='primary'
								/>
								<Button text='Cancel' variant='secondary' onClick={() => setIsModalOpen(false)} />
							</div>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default TodoModal;
