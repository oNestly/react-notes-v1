import React from 'react';
import Header from './components/Header';
import Tools from './components/Tools';
import Content from './components/Content';
import styles from './App.module.scss';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<>
			<div className='container'>
				<Header />
				<div className={styles.app__wrapper}>
					<Tools />
					<Content />
				</div>
			</div>
      <Toaster position='bottom-right' toastOptions={{
        style: {
          fontSize: '1.4rem'
        }
      }} />
		</>
	);
}

export default App;
