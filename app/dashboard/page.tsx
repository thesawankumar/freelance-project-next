'use client';
import React, { useState } from 'react';  // Import useState here
import Card from '../ui/dashboard/card/card';
import DbTable from '../ui/dashboard/dbtable/dbtable';
import styles from '../ui/dashboard/dashboard.module.css'
import PendingBatchesCard from '../ui/dashboard/pendingbatchescard/pendingbatchescard';
import { FilterCriteria } from '../types';

const Dashboard = () => {
  const [filterCriteria, setFilterCriteria] = useState({});

  return (
    <div className={styles.dashboard}>
      <PendingBatchesCard setFilterCriteria={setFilterCriteria} />
      <DbTable filterCriteria={filterCriteria} /> 
    </div>
  );
};

export default Dashboard;
