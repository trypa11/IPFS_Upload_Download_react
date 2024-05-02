import React from 'react';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const ipfsClient = create({ host: 'localhost', port: 5001, protocol: 'http' });


function App() {
  const handleUpload = async (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        const buffer = Buffer.from(reader.result);
        const result = await ipfsClient.add(buffer);
        console.log('IPFS result:', result);
  
        // Log the IPFS link
        const ipfsLink = `https://ipfs.io/ipfs/${result.path}`;
        console.log('IPFS link:', ipfsLink);
      };
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
        <input type="file" multiple onChange={handleUpload} />
        <button onClick={handleCommit}>Commit</button>
        <button onClick={handleClone}>Clone</button>
      </header>
    </div>
  );
}

export default App;

