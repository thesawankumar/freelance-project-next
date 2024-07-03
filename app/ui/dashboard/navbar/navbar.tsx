'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';

// Defined Navbar as a functional component with React.FC
const Navbar: React.FC = () => {

    let pathname = usePathname();
    let headerPathname = pathname ? pathname.split('/').pop() : '';
       
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>{headerPathname}</h1>

            </div>
            <div className={styles.menu}>
                <div className={styles.search}>
                    {/* <input type='text' placeholder='Search...' className={styles.input}></input> */}
                </div>
                <div className={styles.icons}>
                    {/* Work in progress */}         
                </div>
            </div>
        </div>
    );
}

export default Navbar;
