import React, { ChangeEvent, useState } from 'react';
import Axios from 'axios';



const NewAttachment = ({ batchId } : { batchId: string }) => {
  const [visible, setVisible] = useState(false);
  const [files, setFiles] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileAdd = ({event} : {event: ChangeEvent<HTMLInputElement>}) => {
    const target = event.target as HTMLInputElement;
    const file = target.files != null ? target.files[0] : null;

    if(file != null){
      setFiles(file);
    }
  };

  const handleClose = () => {
    setFiles(null);
    setVisible(false);
  };

  const onSubmit = async () => {
    setSubmitting(true);
    const formData = new FormData();
    if(files != null){
      formData.append('f', files);
    }
    formData.append('batchId', batchId);
    // Retrieve the current_user object from localStorage
    const currentUserJson = localStorage.getItem("current_user");

// Parse the JSON string to an object, or initialize as an empty object if null or undefined
    const currentUser = currentUserJson ? JSON.parse(currentUserJson) : {};

// Access the aurId property from currentUser, defaulting to an empty string if undefined
    const aurId = currentUser.aurId ?? '';

// Now you can append userId to formData
    formData.append('userId', aurId);
 //   formData.append('userId', JSON.parse(localStorage.getItem("current_user") ?? "").aurId);
    const backendURL = `http://localhost:8080/batches/accounthistory/addFileData`;

    try {
      const response = await Axios.post(backendURL, formData, {
        headers: {
          "Authorization": localStorage.getItem("header_token"),
          "Content-Type": "multipart/form-data"
        },
      });
      const data = response.data;
      console.log(`Data: ${data}`)
      if (response.status === 200) {
        alert('File Uploaded Successfully.');
      } else {
        alert(`There is some error, file not uploaded.... ${data.error}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('There was an error uploading the file.');
    } finally {
      setSubmitting(false);
      handleClose();
    }
  };

  return (
    <div>
      <button className="btn btn-danger mt-4 ml-4" onClick={() => setVisible(true)}>
        Upload New Attachments
         {/* <i className='fa fa-upload' /> */}
      </button>

      {visible && (
        <div className="modal show d-block" tabIndex={1}>
          <div className="modal-dialog modal-half-width">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload New Attachments</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id='form'>
                  <div className='row justify-content-start m-1'>
                    <div className='form-group'>
                      <label htmlFor='attachments'>Attachments&nbsp;&nbsp;</label>
                      <input type='file' name='attachments' onChange={handleFileAdd} />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-info" form='form' disabled={!files} onClick={onSubmit}>
                  {submitting && <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>}
                  Upload
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewAttachment;
