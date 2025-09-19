// src/components/DataManagement.js
import React, { useRef } from 'react';

const DataManagement = ({ onImport, onExport }) => {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImport(file);
    }
    // Reset the file input
    event.target.value = null;
  };

  return (
    <div className="card">
      <div className="card-header">Data Management</div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body text-center">
                <i className="fa-solid fa-download fa-3x mb-3 text-primary"></i>
                <h5 className="card-title">Export Data</h5>
                <p className="card-text">Download all your data as a JSON file for backup or transfer.</p>
                <button className="btn btn-primary" onClick={onExport}>
                  <i className="fa-solid fa-download me-2"></i> Export Data
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body text-center">
                <i className="fa-solid fa-upload fa-3x mb-3 text-success"></i>
                <h5 className="card-title">Import Data</h5>
                <p className="card-text">Restore your data from a previously exported JSON file.</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".json"
                  style={{ display: 'none' }}
                />
                <button className="btn btn-success" onClick={handleImportClick}>
                  <i className="fa-solid fa-upload me-2"></i> Import Data
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="alert alert-info">
          <h6><i className="fa-solid fa-info-circle me-2"></i> About Data Storage</h6>
          <p className="mb-0">
            Your data is stored in your browser's localStorage. This means it will persist between sessions
            but is specific to this browser and device. Use the export feature to create backups or transfer
            your data to another browser or device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;