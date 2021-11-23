const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid').v1;

function Blockchain() {
	this.chain = [];
	this.pendingTransactions = [];

	this.currentNodeUrl = currentNodeUrl;
	this.networkNodes = [];

	this.createNewBlock(100, '0', '0');
}

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
	const newBlock = {
		index: this.chain.length + 1,
		timestamp: Date.now(),
		transactions: this.pendingTransactions,
		nonce: nonce,
		hash: hash, // hash for current block
		previousBlockHash: previousBlockHash, // hash for previous block
	};

	this.pendingTransactions = []; // clear out transactions
	this.chain.push(newBlock); // push new block into our chain

	return newBlock;
};

Blockchain.prototype.getLastBlock = function () {
	return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
	// create new transaction object
	const newTransaction = {
		amount: amount,
		sender: sender,
		recipient: recipient,
		transactionId: uuid().split('-').join(''),
	};

	return newTransaction;
};

Blockchain.prototype.addTransactionToPendingTransactions = function (transactionObj) {
	this.pendingTransactions.push(transactionObj);
	return this.getLastBlock()['index'] + 1;
};

Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
	const hash = sha256(dataAsString);
	return hash;
};

Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
	let nonce = 0;
	let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
	while (hash.substring(0, 4) !== '0000') {
		nonce++;
		hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
	}

	return nonce;
};

Blockchain.prototype.chainIsValid = function (blockchain) {
	let validChain = true; // defaults to true
	// starting from 1 in the blockchain iterate by 1
	for (var i = 1; i < blockchain.length; i++) {
		const currentBlock = blockchain[i]; // index of every block
		const prevBlock = blockchain[i - 1]; // index of the previous block
		const blockHash = this.hashBlock(
			prevBlock['hash'],
			{
				transactions: currentBlock['transactions'],
				index: currentBlock['index'],
			},
			currentBlock['nonce']
		);
		// hashing every block and making sure it dosent start with '0000'
		if (blockHash.substring(0, 4) !== '0000') validChain = false;
		// if current block dosent equal previous set validChain to false
		if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
	}

	const genesisBlock = blockchain[0];
	const correctNonce = genesisBlock['nonce'] === 100;
	const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
	const correctHash = genesisBlock['hash'] === '0';
	const correctTransactions = genesisBlock['transactions'].length === 0;

	// if any of the variables above return false validChain is given value of false.
	if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

	return validChain;
};

module.exports = Blockchain;
