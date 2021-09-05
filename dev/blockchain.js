const sha256 = require('sha256');

function Blockchain() {
	this.chain = [];
	this.pendingTransactions = [];

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
	};

	this.pendingTransactions.push(newTransaction); // push newTransaction into pending transactions

	return this.getLastBlock()['index'] + 1; // return the number of the block that this transaction will be added to
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

module.exports = Blockchain;
