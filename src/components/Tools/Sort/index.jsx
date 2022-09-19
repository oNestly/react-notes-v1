import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilterStatus } from '../../../redux/slices/todoSlice';

import { getClasses } from '../../../utils';

import styles from '../Tools.module.scss';

const Sort = () => {
	const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
	const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
	const dispatch = useDispatch();

	const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

	return (
		<select
			className={getClasses([styles.button, styles.select])}
			value={filterStatus}
			onChange={(e) => updateFilter(e)}
		>
			<option value='all'>All</option>
			<option value='incomplete'>Incomplete</option>
			<option value='complete'>Complete</option>
		</select>
	);
};

export default Sort;
