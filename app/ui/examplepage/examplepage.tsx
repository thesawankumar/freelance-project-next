import React from 'react';
import styles from './examplepage.module.scss';

// Defined TEMPLATE as a functional component with React.FC
const ExamplePage: React.FC = () => {
    return (
        <div className={styles.container}>
            Content goes here
        </div>
    );
}

export default ExamplePage;
