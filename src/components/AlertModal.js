import React from 'react';
import './AlertModal.css'; // Import custom styles for the modal

const AlertModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null; // If the modal is not open, return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title || 'Alert'}</h2>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
