"use client"
// Sidebar.tsx
import React, { useEffect, useState } from 'react';
import styles from './sidebar.module.css';
import Image from 'next/image';
import { MdDashboard, MdAssignment, MdSupervisedUserCircle } from 'react-icons/md';
import { PiTrashSimpleFill } from 'react-icons/pi';
import MenuLink from './menuLink/menuLink';
import { MdLogout } from "react-icons/md";
import { useAuth } from '../../../context/authContext'

interface MenuItem {
    title: string;
    path: string;
    icon: React.ReactNode;
}

const menuItems: { title: string; list: MenuItem[] } = {
    title: "Pages",
    list: [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <MdDashboard />
        },
        {
            title: "Batches",
            path: "/dashboard/batches",
            icon: <PiTrashSimpleFill />
        },
        {
            title: "Accounts",
            path: "/dashboard/accounts",
            icon: <MdAssignment />
        },
        {
            title: "Users",
            path: "/dashboard/users",
            icon: <MdSupervisedUserCircle />
        },
        {
            title: "Manager Users",
            path: "/manageUser",
            icon: <MdSupervisedUserCircle />
        },
        {
            title: "Create Waste Unit",
            path: "/CreateWasteUnitPage",
            icon: <MdSupervisedUserCircle />
        },
        {
            title: "Suspended Batches",
            path: "/SuspendedBatches",
            icon: <MdSupervisedUserCircle />
        },
    ]
}


// Defined Sidebar as a functional component with React.FC
const Sidebar: React.FC = () => {
    const [name, setName] = useState<string | null>(null)
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        const getUser = localStorage.getItem('current_user');
        if (getUser) {
            setName(JSON.parse(getUser).auName)
            setRole(JSON.parse(getUser).roleName)
        }
    }, []);

    const { signOut }: any = useAuth()
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <div className={styles.userDetails}>
                    <span className={styles.username}>{ name }</span>
                    <span className={styles.userTitle}>{ role }</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.list.map((item) => (
                    <li key={item.title}>
                        <MenuLink item={item} />
                    </li>
                ))}
            </ul>
            <button className={styles.logout} onClick={async () => {await signOut();}}>
                <MdLogout/>    
                Logout
            </button>   
        </div>
    );
}

export default Sidebar;
