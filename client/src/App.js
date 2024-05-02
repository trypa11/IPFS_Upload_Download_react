import React, { useState } from 'react';
import { create } from 'kubo-rpc-client';
import { Buffer } from 'buffer';
import JSZip from 'jszip';
import Web3 from 'web3';

const ipfsClient = create({ host: 'localhost', port: 5001, protocol: 'http' });



function App() {
  const [uploading, setUploading] = useState(false);

  const [parentDir, setParentDir] = useState('');

  const handleInit = async () => {
    //create a new directory on IPFS with MFS 
    //set name with prompt 
    const dirName = prompt('Enter the name of the parent directory');
    await ipfsClient.files.mkdir(`/${dirName}`);
    console.log('Created directory:', dirName);
    setParentDir(dirName);
  };

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
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const buffer = Buffer.from(reader.result);
      const fileDetails = {
        path: `/${parentDir}/${file.name}`, // Include parent directory in the file path
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
    
  };
  
  
  

  return (
    <div className="App">
      <header className="App-header">
        <p>Click the button to upload files</p>
        <button onClick={handleInit}>Init your project</button>
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <button onClick={handleDownload}>Download</button>
      </header>
    </div>
  );
}

export default App;
