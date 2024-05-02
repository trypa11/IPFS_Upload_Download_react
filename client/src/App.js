import React, { useState } from 'react';
import { create } from 'kubo-rpc-client';
import { Buffer } from 'buffer';
import JSZip from 'jszip';

const ipfsClient = create({ host: 'localhost', port: 5001, protocol: 'http' });

function App() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.webkitdirectory = true;
    fileInput.directory = '';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', async (event) => {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await uploadFile(file);
      }
    });

    fileInput.click();
  };

  const uploadFile = async (file) => {
    //const parentDir = prompt('Enter the name of the parent directory');
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const buffer = Buffer.from(reader.result);
      const fileDetails = {
        path: `/${file.name}`, // Include parent directory in the file path
        content: buffer,
      };
      await ipfsClient.files.write(fileDetails.path, fileDetails.content, {
        create: true,
        parents: true,
      });
      console.log('Uploaded file:', fileDetails.path);
    };
  };

  const handleDownload = async () => {
    //download all files and zip them up
    const files = await ipfsClient.files.ls('/');
    const zip = new JSZip();
    for (const file of files) {
      const content = await ipfsClient.files.read(file.path);
      zip.file(file.path, content);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'files.zip';
    link.click();
    
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Click the button to upload files</p>
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <button onClick={handleDownload}>Download</button>
      </header>
    </div>
  );
}

export default App;
