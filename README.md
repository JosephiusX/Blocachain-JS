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
