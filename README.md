## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This is the transaction commission application's backend rest api.

Because I was free to do as I pleased, I developed a local database that functions similarly to a genuine database in this scenario. 
I set it up so that I could keep transactions and clients. 

And, because I had some spare time, I created one api end point for creating new transactions and another for retrieving transaction commission details.

## Commission rules
I created a fully customizable configuration file for commission rules, so you could add 100 rules without having to change any logic in the main code, so whatever.
	
## Transactions
The endpoint for creating a new transaction is:
`POST: /api/createtransaction`
It accepts the following body:
```
{
  transaction: {
       transactionAmount: string,
       transactionCurrency: string,
   },
   clientID: number,
};
```
Example Response:
```
{
message: 'success', 
data: {
 "transactionID": "3qrb8cvka1",
}}

```

## Commissions
The endpoint for getting commission details for a transaction is:
`POST: /api/getcommission`
It accepts the following body:
```
{
  transaction: {
     transactionID: string
   }
};
```
Example Response:
```
{
message: 'success',
data: {
 "amount": "0.05",
 "currency": "EUR"
}
}
```
## Database
A transaction with id of `14ow41pvhl1gxphog` exists and can be used in the getcommission api

A client with ID `42` exists


## Technologies
I made this backend with Node JS version 16.13.1 and used express for desiging the api's. For testing i used jest and supertest.
	
## Setup
To run this project, install it locally using npm:

```
$ cd ../transaction-app-backend
$ npm install
$ npm run dev
```
Typescript will be compiled into `/dist`and node will execute the `index.js`file inside of it.
## Notes
I configured cors to only accept requests from port 3000.
