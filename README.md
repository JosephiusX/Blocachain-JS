# Blocachain-JS

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

              -left off at 4:37
