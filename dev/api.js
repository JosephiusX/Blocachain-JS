const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid').v1;
// import {v1 as uuidv1} from 'uuid';

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

app.listen(3000, () => {
	console.log('listening on port 3000');
});
