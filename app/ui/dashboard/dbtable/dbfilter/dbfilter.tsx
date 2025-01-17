import React, { useState, useEffect } from 'react';
import {BASE_ENTRIES_PER_PAGE} from '../dbtable';
import styles from './dbfilter.module.css';
import axiosInstance from '../../../../axiosInstance';

export function convertToSqlTimestamp(dateTimeLocalString: string): string {
  const date = new Date(dateTimeLocalString)
  const utcString = date.toISOString()
  const [datePart, timePart] = utcString.split('T')
  const sqlTimestamp = `${datePart} ${timePart.slice(0, 8)}.000`
  return sqlTimestamp
}

export type FilterData = {
  accountNo?: string;
  batchId?: number;
  wasteUnit?: number;
  userId?: string;
  serviceArea?: string;
  status?: string;
  fromStatusDate?: string;
  toStatusDate?: string;
  fromEffectiveDate?: string;
  toEffectiveDate?: string;
  hideOldBatchHistory?: boolean;
  entriesPerPage?: number;
};


interface DbFilterProps {
  onSubmit: (data: FilterData) => void;
  serviceAreas: any[];
}

const knownStatuses = ['CR', 'SU', 'CO', 'RE', 'RR', 'RS'];

const DbFilter: React.FC<DbFilterProps> = ({ onSubmit, serviceAreas }) => {
  const [filterData, setFilterData] = useState<FilterData>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFilterData({
        ...filterData,
        [name]: target.checked,
      });
    } else {
      const newValue = (name.includes('Date') && value)
        ? convertToSqlTimestamp(value)
        : value;
      setFilterData({
        ...filterData,
        [name]: newValue,
      });
    }
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      ...filterData,
      fromEffectiveDate: filterData.fromEffectiveDate ? convertToSqlTimestamp(filterData.fromEffectiveDate) : undefined,
      toEffectiveDate: filterData.toEffectiveDate ? convertToSqlTimestamp(filterData.toEffectiveDate) : undefined,
      fromStatusDate: filterData.fromStatusDate ? convertToSqlTimestamp(filterData.fromStatusDate) : undefined,
      toStatusDate: filterData.toStatusDate ? convertToSqlTimestamp(filterData.toStatusDate) : undefined,
    };
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="batchId">Batch ID:</label>
          <input type="text" id="batchId" name="batchId" onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="accountNo">Account #:</label>
          <input type="text" id="accountNo" name="accountNo" onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="userId">User ID:</label>
          <input type="text" id="userId" name="userId" onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="wasteUnit">Waste Unit (WIP):</label>
          <input type="number" id="wasteUnit" name="wasteUnit" onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="serviceArea">Service Area (WIP):</label>
          <select id="serviceArea" name="serviceArea" onChange={handleChange}>
            <option value="">Select...</option>
            {serviceAreas.map(area => (
              <option key={area.seqNo} value={area.seqNo}>{area.serviceArea}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" onChange={handleChange}>
            <option value="">Select...</option>
            {knownStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="fromStatusDate">Status From:</label>
          <input type="datetime-local" id="fromStatusDate" name="fromStatusDate" onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="toStatusDate">To:</label>
          <input type="datetime-local" id="toStatusDate" name="toStatusDate" onChange={handleChange} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="hideOldBatchHistory">Hide Old Batch History:</label>
          <input type="checkbox" id="hideOldBatchHistory" name="hideOldBatchHistory" onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="fromEffectiveDate">Effective From (WIP):</label>
          <input type="datetime-local" id="fromEffectiveDate" name="fromEffectiveDate" onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="toEffectiveDate">To (WIP):</label>
          <input type="datetime-local" id="toEffectiveDate" name="toEffectiveDate" onChange={handleChange} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="seqNoPair">Seq No Pair:</label>
          <input type="text" id="seqNoPair" name="seqNoPair" onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="ahSeqNo">AH Seq No:</label>
          <input type="number" id="ahSeqNo" name="ahSeqNo" onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="wbhSeqNo">WBH Seq No:</label>
          <input type="number" id="wbhSeqNo" name="wbhSeqNo" onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="batchType">Batch Type:</label>
          <input type="text" id="batchType" name="batchType" onChange={handleChange} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="entryCount">Entries/Page:</label>
          <input
            type="number"
            id="entryCount"
            name="entryCount"
            defaultValue={BASE_ENTRIES_PER_PAGE}
            min="1"
            onChange={(e) => setFilterData({ ...filterData, entriesPerPage: Number(e.target.value) })}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </div>
    </form>
  );
};

export default DbFilter;
