// import React, { useState } from 'react';
// import axiosInstance from '../axiosInstance'; // Adjust the path as necessary
// import styles from './AddBatchAndAccount.module.css'; // Your CSS file for styling

// const AddBatchAndAccountPage = () => {
//   const [formData, setFormData] = useState({
//     batchType: '',
//     userId: '',  // wip: need to fetch somewhere
//     accountNo: '',
//     wasteUnit: '',
//     effectiveDate: '',
//     serviceArea: '',
//     comments: '',
//     documentNotes: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Create batch
//       const batchResponse = await axiosInstance.post('/batches/create', {
//         batchType: formData.batchType,
//         userId: formData.userId
//       });
//       const { batchId } = batchResponse.data;

//       // Create account history with the new batch ID
//       await axiosInstance.post('/account-history/create', {
//         batchId,
//         accountNo: formData.accountNo,
//         wasteUnit: formData.wasteUnit,
//         effectiveDate: formData.effectiveDate,
//         userId: formData.userId,
//         comments: formData.comments,
//         documentNotes: formData.documentNotes,
//         serviceArea: formData.serviceArea
//       });

//       alert('Batch and Account History created successfully!');
//     } catch (error) {
//       console.error('Failed to create batch and account history:', error);
//       alert('Error creating batch and account history');
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Add New Batch and Account History</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         {/* Batch Inputs */}
//         <input type="text" name="batchType" placeholder="Batch Type" onChange={handleChange} required />
//         {/* Account History Inputs */}
//         <input type="text" name="accountNo" placeholder="Account Number" onChange={handleChange} required />
//         <input type="number" name="wasteUnit" placeholder="Waste Unit" onChange={handleChange} required />
//         <input type="date" name="effectiveDate" placeholder="Effective Date" onChange={handleChange} required />
//         <textarea name="comments" placeholder="Comments" onChange={handleChange}></textarea>
//         <textarea name="documentNotes" placeholder="Document Notes" onChange={handleChange}></textarea>
//         <input type="text" name="serviceArea" placeholder="Service Area" onChange={handleChange} required />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddBatchAndAccountPage;
