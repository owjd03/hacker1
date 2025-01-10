import React, { useState } from "react";
import "./Dropoff.css";

const DropOff: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = Array.from(event.dataTransfer.files);
    console.log("Dropped files:", droppedFiles); // Debugging
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    console.log("Selected files:", selectedFiles); // Debugging
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="drop-off">
      <div
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleFileDrop}
      >
        <label>
          <p>Drag and drop your documents here, or click to select files.</p>
          <input
            type="file"
            multiple
            className="file-input"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="file-list">
        <h3>Uploaded Files:</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropOff;
