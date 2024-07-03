"use client";
import React, { useEffect, useState } from "react";
import styles from "./approvalqueuetable.module.css";
import getAxiosInstance from "@/app/axiosInstance";

export type BatchesPendingData = {
  wbhSeqNo: number;
  batchId: number;
  statusDt: string; // date made
  //status: string; it's all submitted so it's redundant
  userId: string;
  wbhComments: string;
};

const axiosInstance = getAxiosInstance();

const ApprovalQueueTable = () => {
  const [pendings, setPendings] = useState<BatchesPendingData[] | null>();

  useEffect(() => {
    async function viewQueue() {
      try {
        // TODO: Backend changes so this does return all history for a given batch ID?
        // In other words, this is a history of every batch that *has* ever been submitted.
        const response = await axiosInstance.get("/batches/view/pending");
        console.log(response.data);
        setPendings(response.data);
      } catch {}
    }
    viewQueue();
  }, []);
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Create Date</th>
            <th>Created By</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {pendings
            ? pendings.map((pending, key) => {
                return (
                  <tr key={key}>
                    <td>
                      {pending.batchId}
                      {/*
                            <Link
                                style={{ textDecoration: 'underline' }}
                                to={routes.batchApproval({ seqNo: pending.wbhSeqNo })}
                            >
                                {pending.batchId}
                            </Link>
                            */}
                    </td>
                    <td>{new Date(pending.statusDt).toLocaleString()}</td>
                    <td>{pending.userId}</td>
                    <td>{pending.wbhComments}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalQueueTable;
