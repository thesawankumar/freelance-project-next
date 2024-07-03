'use client'
import React from 'react';
import Link from 'next/link';
import styles from './menuLink.module.css';
import { usePathname } from 'next/navigation'

interface MenuLinkProps {
    item: {
        title: string;
        path: string;
        icon: React.ReactNode;
    };
}

// proptypes needed
const MenuLink: React.FC<MenuLinkProps> = ({ item }) => {
    const pathname = usePathname();
    return (
        <Link href={item.path} className={`${styles.container} ${usePathname() === item.path ? styles.active : ''}`}>
            {item.icon}
            {item.title}
        </Link>
    );
}

export default MenuLink;
