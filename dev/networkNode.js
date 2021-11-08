const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid').v1;
const port = process.argv[2]; // access port variable inside of our network node, 2 represents the argument position 0 indexed, so position 3
const rp = require('request-promise');

const nodeAddress = uuid().split('-').join(''); // making node address

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain', (req, res) => {
	res.send(bitcoin);
});

app.post('/transaction', (req, res) => {
	const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
	res.json({note: `Transaction will be added in block ${blockIndex}.`});
});

app.get('/mine', (req, res) => {
	const lastBlock = bitcoin.getLastBlock();
	const previousBlockHash = lastBlock['hash'];
	const currentBlockData = {
		transactions: bitcoin.pendingTransactions,
		index: lastBlock['index'] + 1,
	};
	const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData); // proof of work to create new block below
	const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

	bitcoin.createNewTransaction(12.5, '00', nodeAddress); // new transaction

	const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash); // new block
	res.json({
		note: 'New block mined successfully', // sending back note
		block: newBlock, // and block
	});
});

// register a node and, broadcast it the network
app.post('/register-and-broadcast-node', function (req, res) {
	const newNodeUrl = req.body.newNodeUrl;
	if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);

	const regNodesPromises = [];
	bitcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + 'register-node',
			method: 'POST',
			body: {newNodeUrl: newNodeUrl},
			json: true,
		};

		regNodesPromises.push(rp(requestOptions));
	});

	Promise.all(regNodesPromises)
		.then(data => {
			const bulkRegisterOptions = {
				uri: newNodeUrl + '/register-nodes-bulk',
				method: 'POST',
				body: {allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
				json: true,
			};

			return rp(bulkRegisterOptions);
		})
		.catch(error => {
			console.error('/register-and-broadcast-node Promise error 1 ' + error);
		})
		.then(data => {
			res.json({note: 'New node registered with network successfully.'});
		})
		.catch(error => {
			console.error('/register-and-broadcast-node Promise error 2 ' + error);
		});
});

// register a node with the network
app.post('/register-node', function (req, res) {
	const newNodeUrl = req.body.newNodeUrl;
	const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
	const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
	if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
	res.json({note: 'New node registered successfully.'});
});

// register multiple nodes at once
app.post('/register-nodes-bulk', function (req, res) {
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl => {
		const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
		if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
	});

	res.json({note: 'Bulk registration successful'});
});

app.listen(port, () => {
	console.log(`listening on ${port}...`);
});
