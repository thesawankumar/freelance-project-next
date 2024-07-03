import React, { useEffect, useState } from 'react';
import styles from './PendingBatchesCard.module.css';
import getAxiosInstance from '../../../axiosInstance';
import { IoIosArrowForward } from 'react-icons/io';
import { FilterCriteria, PendingBatchesCardProps } from '../../../types';

// Component with props type applied
const PendingBatchesCard: React.FC<PendingBatchesCardProps> = ({ setFilterCriteria }) => {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPendingBatchesCount = async () => {
      try {
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.get('/view/pendingcount');
        setPendingCount(response.data.count);
      } catch (error) {
        console.error('Error fetching pending batches count:', error);
      }
    };

    fetchPendingBatchesCount();
  }, []);

  const handleCardClick = () => {
    setFilterCriteria({
      status: 'SU',
      onlyLastStatus: true
    });
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.content}>
        <h3>Pending Batches</h3>
        <p>{pendingCount}</p>
      </div>
      <IoIosArrowForward size={24} className={styles.icon} />
    </div>
  );
};

export default PendingBatchesCard;
