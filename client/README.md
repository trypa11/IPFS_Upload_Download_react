When you download first time your file :
cd client 
npm install 

Ipfs set up :

ipfs init 
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT","POST","GET"]'
ipfs daemon 

Run:
npm run start