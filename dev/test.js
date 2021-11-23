const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const bc1 = {
	chain: [
		{
			index: 1,
			timestamp: 1637643667844,
			transactions: [],
			nonce: 100,
			hash: '0',
			previousBlockHash: '0',
		},
		{
			index: 2,
			timestamp: 1637646501106,
			transactions: [],
			nonce: 18140,
			hash: '0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100',
			previousBlockHash: '0',
		},
		{
			index: 3,
			timestamp: 1637647508975,
			transactions: [
				{
					amount: 12.5,
					sender: '00',
					transactionId: 'f72fc4504c2011ecaf11f1ce21639c1c',
				},
				{
					amount: 10,
					sender: 'bob then man',
					transactionId: '407be3304c2311ecaf11f1ce21639c1c',
				},
				{
					amount: 20,
					sender: 'bob then man',
					transactionId: '461c78404c2311ecaf11f1ce21639c1c',
				},
				{
					amount: 30,
					sender: 'bob then man',
					transactionId: '4ac407504c2311ecaf11f1ce21639c1c',
				},
			],
			nonce: 32737,
			hash: '00002e913e792f51bd7027cbc62539458b76cd4fc05173346a1b436dbda3c1cf',
			previousBlockHash: '0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100',
		},
		{
			index: 4,
			timestamp: 1637647901694,
			transactions: [
				{
					amount: 12.5,
					sender: '00',
					transactionId: '4fe756104c2311ecaf11f1ce21639c1c',
				},
				{
					amount: 40,
					sender: 'bob then man',
					transactionId: '1aa669904c2411ecaf11f1ce21639c1c',
				},
				{
					amount: 50,
					sender: 'bob then man',
					transactionId: '1ea339b04c2411ecaf11f1ce21639c1c',
				},
				{
					amount: 60,
					sender: 'bob then man',
					transactionId: '22dc76904c2411ecaf11f1ce21639c1c',
				},
				{
					amount: 70,
					sender: 'bob then man',
					transactionId: '28edced04c2411ecaf11f1ce21639c1c',
				},
			],
			nonce: 50047,
			hash: '00003bb90dbaf59fd955119b988c71f4ba34a4f9b1c874115d3625be265966c8',
			previousBlockHash: '00002e913e792f51bd7027cbc62539458b76cd4fc05173346a1b436dbda3c1cf',
		},
		{
			index: 5,
			timestamp: 1637648234612,
			transactions: [
				{
					amount: 12.5,
					sender: '00',
					transactionId: '39fb80004c2411ecaf11f1ce21639c1c',
				},
			],
			nonce: 161830,
			hash: '00009898ac8143d9ea99513ccd5d442334afe2ba71095285d7084852d7b040c4',
			previousBlockHash: '00003bb90dbaf59fd955119b988c71f4ba34a4f9b1c874115d3625be265966c8',
		},
		{
			index: 6,
			timestamp: 1637648250947,
			transactions: [
				{
					amount: 12.5,
					sender: '00',
					transactionId: '006a9a504c2511ecaf11f1ce21639c1c',
				},
			],
			nonce: 25942,
			hash: '00008ec99b9e9bc2b085ce826b997c2fd0a89e8f73aeb3835bbc5bc76c65fdb1',
			previousBlockHash: '00009898ac8143d9ea99513ccd5d442334afe2ba71095285d7084852d7b040c4',
		},
	],
	pendingTransactions: [
		{
			amount: 12.5,
			sender: '00',
			transactionId: '0a2747504c2511ecaf11f1ce21639c1c',
		},
	],
	currentNodeUrl: 'http://localhost:3001',
	networkNodes: [],
};

console.log('VALID:', bitcoin.chainIsValid(bc1.chain));
