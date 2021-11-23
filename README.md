# Blocachain-JS

Sourcecode: https://github.com/erictraub/Learn-Blockchain-By-Building-Your-Own-In-JavaScript

constructor function review

10.   Blockchain constructor function

            we can do all this with classes instead but thats really just syntactical sugar on top of constructor functions

11.   Create New blockchain Method

            nonce:
                a way to determine that we created this new block in a ligetimate way by using a proof of work method.

12.   Testing create new block method

13.   Get last block method

14.   Create New Transaction Method

15.   Testing create new transaction method

          basically mining new blocks and placing new transactions in that block

16.   sha256 hashing

17.   Hash Block Method

          npm i sha256 --save

18.   Testing Hash Block Method

19.   What Is A proof Of Work?

      repeatedly hash block until it finds correct hash uses current block data for the hash, but also the previousBlockHash continously changes nonce value until it finds the correct hash returns to us the nonce value that creates the correct hash

20.   Proof of work Method

21.   Testing proof of work Method

22.   Creating a genesis Block

      first block in the blockchain

23.   secton 1 Wrap-up

24.   Blockchain Source Code

# section 3 Accessing The Blockchain Through An API

26.   Setting Up ExpressJS

27.   Bulding The API foundation

28.   Installing postman & body parser

              npm i nodemon

if we dont install body parser we get an error when trying to log the request body.

            npm i body-parser

      require and use:

            const bodyParser = require('body-parser');

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended: false}));

28.   Building The "GET /blockchain" Endpoint

29.   building GET mine endpoint

              npm i uuid

creates unique random string

32. Testing the new endpoints

# sec 4 Creating decentralized Blockchain Network

33.   Decemtralized Blockchain Network - Introduction

34.   Creating Muliple Nodes

              change api.js filename to networkNode.js

              create a port variable instead of hard coded to 3001
                  setup arg v and change the start command to the new file name and add a port to the start command

                  add 3001 to the third element in the start script

npm start should result in listeneig on port 3001

set up for multiple instances

      change start in package.json to node_1

now I can run 'npm run node_1' to run my first node

      in scripts I make 4 more node commands 2 3 4 and 5
            we can test by opening all nodes at same time in their own terminals

we created 5 different instances of our networkNode file, and are running them concurently

35. Testing The Nodes

right now we dont have a network, just 5 unconnected nodes. lets test that they are not connected by adding transactions via postman to different nodes.

we can see that information we update on one node is not updated to any of the other nodes at this point.

36. Adding The Current Node's Url

we want each of our network nodes to be aware of what url they are currently on. to do this we need to alter the script commands.

      - in the third paramiter of each command we are going to add the node's url

      - in blockchain.js we add currentNetworkUrl variable to = process.argv[3]
            -add it to the blockchain function.

now also we want the other nodes inside of our network

            -in Blockchain():
                  this.networkNodes = [];
                        an array that will contain all the other node url's in our network.js in our network, so that all nodes will have a list of all other nodes in the blockchain.

37.   New Endpoints Outline

38.   Building "POST/register-and-broadcast-node" Endpoint - Part 1

            -npm install request --save

we are cycling through all of the nodes that are in our network, then we are using requestOptions to make a request to each one. Thease request that are made are going to register the new node with each node in the network. All the requests are asynchronous meaning we dont know how long its going to take to calculate this data because we are requesting from an outside source (another node). thus we will place all the requests into regNodesPromises array.

39.   Building "POST/register-and-broadcast-node" Endpoint - Part 2

40.   Building 'POST /register-node' Endpoint

41.   UPDATE: Installing the "request" library

                  -inside blockchain directory:
                        npm install request --save

      not sure why this information is gone over again as it would seem to be the same command we used to install the package in lesson 38.

42.   Testing "POST/register-node" Endpoint

43.   Building "POST /register-nodes-bulk" Endpoint

the distributed blockchain network is setup now

44.   Testing "POST /register-nodes-bulk" Endpoint

              -In postman I am able to register localhost3002, 3003, 3004, to localhost 3001 using this url and including urls to register in the body:
                    http://localhost:3001/blockchain

              -we do the same by registering 3002 and 3004 to localhost:3005

              EXAMPLE:
                  in postman if I make a post to 'http://localhost:3001/register-nodes-bulk' with this as the body:
                        {
                              "allNetworkNodes" : [
                                    "http://localhost:3002",
                                    "http://localhost:3003",
                                    "http://localhost:3004",
                                    "http://localhost:3005"
                              ]
                        }
                  the result is that all the other nodes will be visible in the 'networkNodes' array as they have been registered to that node in the endpoint

to connect all the nodes we run post on rach node with the other nodes sent in the body.

Route works!

45.   Testing All Network Endpoints

              -in postman make POST request:
                   http://localhost:3001/register-and-broadcast-node

                  -body:
                        {
                        "newNodeUrl" : "http://localhost:3002"
                        }

had to add catch to all my then statements to handle promise rejections:

            .catch(error => {
                              console.error('/register-and-broadcast-node Promise error ' + error);
                            })

            ?? still its saying new node registered with network successfully, I can see node 3002 in node 3001 but not vise versa, and i get an error in the node window for 3001

            ** works when I copy request from source. Cant find the difference

## Sec 5

46. Synchronizing The Network

we need to sync the network so that the blockchain on every node is the same, we need one version of the blockchain to be consistant on every node.

47. Transactions Introduction

we are going to refactor our transaction endpoint, and also creating a new transaction endpoint that will allow us to broadcast changes to our entire blockchain network so that every node ends up with the same data.

      /transaction/broadcast
            we are going to send it transaction data

48. Refactoring Create Transaction Method

we are going to split our createNewTransaction into seporate methods creating addTransactionToPendingTransactions method

49. Building 'POST /transaction/broadcast' Endpoint

we create a new transaction and we broadcast it to all other nodes in our network

50.   Refactoring "POST /transaction" Endpoint

51.   Testing Transaction Endpoints

            -testing
                  -in postman i use the register-and-broadcast-node, and in the body register it to each other node individually.

now when I broadcast a transaction it is uptdated to the network

              ?? adding transaction to a node but it is not updated on the other nodes
              ** I hadent regestered all the nodes yet

52. Updating Mining Information

when we mine a new block we are going to choose a node to '/mine' it, we hit the mine endpoint on that node and it creates a new block and sends it out to the other nodes in the network via their '/recieve-new-block' endpoints

when we create a new block, all of the pending transactions go into that block, and our pending transaction array is cleared

53.   Updating Mining Endpoint

54.   Building 'POST /recieve-new-block' Endpoint

55.   Testing New Endpoints

              -make sure each node is individually registered to every other node via the 'http://localhost:3005/register-nodes-bulk' endpoint using Postman

              - go to localhost:3001/mine while localhost:3001/blockchain is running and I should see something like this:
                  {
                        "note": "New block mined & broadcast successfully",
                        "block": {
                                    "index": 2,
                                    "timestamp": 1637559318836,
                                    "transactions": [],
                                    "nonce": 18140,
                                    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
                                    "previousBlockHash": "0"
                                 }
                  }

            - take a look at the node to see the transaction made above is added to the chain on 'http://localhost:3001/blockchain' like so:
                        {
                           "chain": [
                                    {
                                          "index": 1,
                                          "timestamp": 1637559214940,
                                          "transactions": [],
                                          "nonce": 100,
                                          "hash": "0",
                                          "previousBlockHash": "0"
                                    },
                                    {
                                          "index": 2,
                                          "timestamp": 1637559318836,
                                          "transactions": [],
                                          "nonce": 18140,
                                          "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
                                          "previousBlockHash": "0"
                                    }
                                    ],
                                          "pendingTransactions": [
                                    {
                                          "amount": 12.5,
                                          "sender": "00",
                                          "transactionId": "fa8164904b5511ecbca88391d7d361e8"
                                    }
                                    ],
                                    "currentNodeUrl": "http://localhost:3001",
                                    "networkNodes": [
                                                      "http://localhost:3002",
                                                      "http://localhost:3003",
                                                      "http://localhost:3004",
                                                      "http://localhost:3005"
                                                    ]
                        }

as we can see above, the ammount that was earned by the mine is included in the pending transaction to be added to the next block which is how it works with bitcoin. (best practice opposed to putting it in the block it was mined for)

we can see that our block is mined successfully and our first node and the reward was posted to pending transactions. now we want to check the other nodes in our network and check that they got the block that was genereted as well as the mining reward that was generated

            http://localhost:3002/blockchain:
                  {
                  "chain": [
                              {
                                    "index": 1,
                                    "timestamp": 1637557654585,
                                    "transactions": [],
                                    "nonce": 100,
                                    "hash": "0",
                                    "previousBlockHash": "0"
                              },
                              {
                                    "index": 2,
                                    "timestamp": 1637559318836,
                                    "transactions": [],
                                    "nonce": 18140,
                                    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
                                    "previousBlockHash": "0"
                              }
                              ],
                              "pendingTransactions": [
                                   {
                                    "amount": 12.5,
                                    "sender": "00",
                                    "transactionId": "fa8164904b5511ecbca88391d7d361e8"
                                   }
                              ],
                              "currentNodeUrl": "http://localhost:3002",
                              "networkNodes":   [
                                                      "http://localhost:3001",
                                                      "http://localhost:3003",
                                                      "http://localhost:3004",
                                                      "http://localhost:3005"
                                                ]
                  }

the block we mined with 'http://localhost:3001/mine' is automatically visible on 'localhost:3002/blockchain' as well as '3001/blockchain' , along with the other registered nodes!!

next, if we want to mine a new block, that can be done using any other node and it should be broadcast to nodes on network as well.

      - in the browser mine a block by using the 'localhost:3004/mine' url

the result is that the new block that was mined is visible on the other blocks because it was broadcast to all the other nodes from 3004(really imporntaint)

using postman lets make some transactions and then mine a block to see if we can find the transactions on other nodes in the network

      - using the /transaction/broadcast POST endpoint:
            http://localhost:3001/transaction/broadcast
      - with this in the body for transaction data:
                  {
                        "amount": 100,
                        "sender": "bob then man",
                        "recipient": "gramkracker"
                  }
                        response:
                              {
                              "note": "Transaction created and broadcast successfully"
                              }

lets make a couple more transactions before mineing a block.

            - ammount 200 to our 5th node this time
            - 300 to node 1

now when I refresh each of the nodes I see those pending transactions in each node in the network. all of our transactions are being broadcast to the entire network correctly.

now we want to mine a new block to make sure that all of the pending transactions are added to the block correctly.

      localhost:3003/mine:
            response:
                  {
                        {
                        "note": "New block mined & broadcast successfully",
                        "block": {
                        "index": 4,
                        "timestamp": 1637573566434,
                        "transactions": [
                        {
                        "amount": 12.5,
                        "sender": "00",
                        "transactionId": "4fc6e5c04b7311eca73ccf8bf27c2512"
                        },
                        {
                        "amount": 100,
                        "sender": "bob then man",
                        "transactionId": "5d60bb004b7511ecbca88391d7d361e8"
                        },
                        {
                        "amount": 200,
                        "sender": "bob then man",
                        "transactionId": "f5e364e04b7511ec85a613eb5079d528"
                        },
                        {
                        "amount": 300,
                        "sender": "bob then man",
                        "transactionId": "0919c2704b7611ecbca88391d7d361e8"
                        }
                        ],
                        "nonce": 13437,
                        "hash": "0000db54423eb6c8d4609a7b3a8c925736a17cf8b62b906cf2ba78971ac1131b",
                        "previousBlockHash": "0000ee63a8183a7add894160c380d94f4974113bb28eef744f32d79810988f77"
                        }
                        }
                  }

I can see the block 4 was mined successfully, and when I refresh other network nodes that block shows up on the chain !!!!! The pending tranctions were cleared out and the reward is placed in the pending transactions.

we created diffrent transactions from different nodes and they were all broadcast to the network correctly. then we mined a new block and all the transactions we created were added to that new block successfully, and our newly mined block was broadcast to the node. Synchronization of data among nodes achieved!!

A decentralized blockchain network thats currently running on 5 nodes and synchronises data.

this is a great time to play around with all the endpoints to get a feel

56. Consensus Introduction

we are going to build a algorithim for the nodes in our network to agree on what the correct data on the blockchain is. in a real world situation with thousands of nodes, we need a way of protecting the network from corrupted data weather accidental or malicious

longest chain rule - takes a look at a single node and looks at the copy of the blockchain on the node and compares the length of the chane on this node with the blockchains on all the other nodes. If there is a chain found that has a longer length than the chain that is present on this node, we are going to replace the chain on this node with the longest chain in the network.

the theory is that we should be able to trust the longest chain as the most work was put into creating that chain. the longes chain has the most blocks and each block was mined with a proof of work, so we can assume that the whole network contributed to the chain because of the amount of work that went into that chain.

Bitcoin uses this rule

57. Chain Is Valid Method

we are iterating through every single block inside the blockchain thats passed in, and compairing the hashes on every single block to make sure they are correct, if they are not correct we indicate that the chain is not valid. we are also checking to make sure that every block has the correct data by rehashing every single block and making sure our newly generated hash starts with 0000. If it dosent then we know the data has been changed because our hash is now different, so we indicate that the chain is not valid. finally we check to make sure our genesisBlock has all the correct data.

58.   Testing Chain Is Valid Method

                    - open node_1
                    - mine on 3001
                        result with localhost:3001 :

      on localhost:3001 2 blocks are present with a reward in the pending transactions.

                  - in postman add some transactions using /transaction/broadcast to node_1

                        10
                        20
                        30

                  - mine a new

      now block 3 has those transactions we just made with a reward in the pending transactions

                  - lets do more

                        40
                        50
                        60
                        70

                  -mine

      all of the transactions are now on block 4 with the reward pending as usual

                  - mine 2 more blocks without any transactions

      now we have a blockchain with 6 blocks with about 10 transactions,

                  - copy the blockchain and paste it into test.js

                  - save whole object into variable bc1

                  - in test.js add :
                        console.log('VALID:', bitcoin.chainIsValid(bc1.chain))

                  - run node dev/test.jsw terminal
                        result:
                              VALID: true

left off at 5:48
