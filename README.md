# CS3219-AY22-23-Project-PeerPrep-Grp46
A web application for students to find peers to practice whiteboard-style interview 
questions together. 

Project report:<a href="46-ProjectReport.pdf" target="_blank">Project report</a>

## How to setup 
Clone this repository and open it in your preferred code editor or IDE 

### User Service Setup
```
cd user-service
npm install
npm start
```
### Redis Setup (Requires Docker)
```
docker run --name=redis --detach=true --publish=6379:6379 redis
```
### Matching Service Setup
Beforehand, start up the Redis cache first.
```
cd matching-service
npm install
npm start
```
### Question Service Setup
```
cd question-service
npm install
npm start
```
### History Service Setup
```
cd history-service
npm install
npm start
```
### Frontend Setup
```
cd frontend
npm install
npm run client-install
```


