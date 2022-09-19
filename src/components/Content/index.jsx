import React from 'react';
import { useSelector } from 'react-redux';
import Task from '../Task';

import styles from './Content.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { orderBy } from 'lodash';

const container = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};
const child = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

const Content = () => {
	const todoList = useSelector((state) => state.todo.todoList);
	const initialFilterStatus = useSelector((state) => state.todo.filterStatus);

	const sortedTodoList = orderBy([...todoList], ['status', 'date'], ['desc', 'desc'])

	const filteredTodoList = sortedTodoList.filter((item) => {
		if (initialFilterStatus === 'all') {
			return true;
		}
		return item.status === initialFilterStatus;
	});
	const allTodoItems = filteredTodoList.map((todo) => (
			<Task key={todo.id} todo={todo} {...todo} />
	));

	return (
		<motion.div className={styles.content__wrapper} variants={container} initial='hidden' animate='visible'>
			<AnimatePresence>
				{filteredTodoList && filteredTodoList.length > 0 ? (
					allTodoItems
				) : (
					<motion.p className={styles.emptyText} variants={child}>
						No Todo Found
					</motion.p>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default Content;
