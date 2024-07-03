'use client'

import React from 'react';
import styles from './batches.module.css'
import ApprovalQueueTable from '@/app/ui/dashboard/approvalqueuetable/approvalqueuetable';
import dynamic from 'next/dynamic'
 
const DynamicApprovalQueueTable = dynamic(() => import('@/app/ui/dashboard/approvalqueuetable/approvalqueuetable'), {
  ssr: false,
})

// def as functional component with react.fc
const Batches: React.FC = () => {
    return (
        // <div className={styles.wrapper}>
        //     <div className={styles.main}>
        //         <div className={styles.cards}>
        //             {/* {cards.map((item) => (
        //                 <Card item={item} key={item.id} />
        //             ))} */}
        //         </div>
                <div>
                    <h1 className={styles.header}>Approval Queue</h1>
                    {/* <ApprovalQueueTable/> */}
                    <DynamicApprovalQueueTable/>
                </div>
        //     </div>
        // </div>
    );
}

export default Batches;