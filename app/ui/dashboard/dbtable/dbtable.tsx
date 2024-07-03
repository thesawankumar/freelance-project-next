'use client';
import React, { useEffect, useState } from 'react';
import styles from './dbtable.module.css';
import getAxiosInstance from '../../../axiosInstance';
import DbFilter, { FilterData } from './dbfilter/dbfilter';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Collapse from 'react-bootstrap/Collapse';
import { FilterCriteria } from '../../../types';

export const BASE_ENTRIES_PER_PAGE = 25;

export type BatchData = {
  seqNoPair?: string;
  ahSeqNo?: number;
  wbhSeqNo?: number;
  accountNo?: string;
  batchId?: number;
  wasteUnit?: number;
  userId?: string;
  serviceArea?: string;
  batchType?: string;
  status?: string;
  effectiveDate?: string;
  statusDt?: string;
  ahComments?: string;
  documentNotes?: string;
  wbhComments?: string;
};

interface DbTableProps {
  filterCriteria: FilterCriteria;
}

const DbTable: React.FC<DbTableProps> = ({ filterCriteria }) => {
  const [open, setOpen] = useState(true);
  const [searchResults, setSearchResults] = useState<BatchData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(BASE_ENTRIES_PER_PAGE);
  const [filterVisible, setFilterVisible] = useState(true);

  const fetchServiceAreas = async () => {
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.get('/serviceareas');
      setServiceAreas(response.data);
    } catch (error) {
      console.error('Error fetching service areas:', error);
    }
  };

  const handleFilterSubmit = async () => {
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.post('/view/search', filterCriteria); // Adjust the endpoint if necessary
      const processedResults = response.data;
      setSearchResults(processedResults);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    fetchServiceAreas();
    handleFilterSubmit(); // initial fetch with default or empty criteria
  }, []);

  useEffect(() => {
    handleFilterSubmit(); // fetch whenever filter criteria change
  }, [filterCriteria]);

  const toggleFilterVisibility = () => {
    setOpen(!open);
  };

  const totalEntries = searchResults.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const dataSlice = searchResults.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <div className={styles.container}>
      <button className={styles.toggleButton} onClick={toggleFilterVisibility} aria-controls={filterVisible ? '' : styles.hidden} aria-expanded={open}>
        {open ?  <IoIosArrowDown className={styles.icon}/> : <IoIosArrowUp className={styles.icon}/>}
        {open ? ' Hide Filter' : ' Show Filter'}
      </button>
      <Collapse in={open}>
        <div className={filterVisible ? '' : styles.hidden}>
          <DbFilter onSubmit={handleFilterSubmit} serviceAreas={serviceAreas} />
        </div>
      </Collapse>
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>First</button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>Last</button>
      </div>
      {/* Table data and header setup */}
    </div>
  );
};

export default DbTable;
