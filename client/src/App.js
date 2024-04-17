import React from 'react';
import { create } from 'ipfs-http-client';

const ipfsClient = create({ host: 'localhost', port: 5001, protocol: 'http' });

const uploadToIPFS = async (file) => {
    try {
        const response = await ipfsClient.add(file);
        console.log('IPFS response:', response);
        return response;
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        return null;
    }
}



function App() {
  const handleUpload = async (event) => {
    try {
      const file = event.target.files[0]; // Get the selected file
      if (!file) {
        console.error('No file selected');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = async () => {
        const fileContent = new Blob([reader.result]);
        const ipfsResponse = await uploadToIPFS(fileContent);
        if (ipfsResponse) {
          console.log('File uploaded successfully. IPFS hash:', ipfsResponse.cid.toString());
          // Handle the response, such as storing the IPFS hash in your smart contract or using it as needed.
        } else {
          console.error('Failed to upload file to IPFS');
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error handling file upload:', error);
    }
  };

  const handleCommit = () => {
    // Implement commit functionality here
  };

  const handleClone = () => {
    // Implement clone functionality here
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={handleUpload} />
        <button onClick={handleCommit}>Commit</button>
        <button onClick={handleClone}>Clone</button>
      </header>
    </div>
  );
}

export default App;

