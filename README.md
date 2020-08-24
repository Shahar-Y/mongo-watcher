# mongo-watcher
Watching for changes in a mongodb 

Based on The Code Barbarian article:
https://thecodebarbarian.com/stock-price-notifications-with-mongoose-and-mongodb-change-streams.html

## To init listener to mongo:

### Initiate repicaSet: 
// 1. `sudo mongod --replSet rs0`
// 2. `mongo`
// 3. >`rs.initiate()`

### npm start

## To initiate receiver of rabbit:
### `tsc && node dist/receive.js`

## To send a message to rabbit:
### `tsc &&  node dist/send.js`
