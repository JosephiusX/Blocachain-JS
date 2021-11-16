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
