# mongo-watcher
Watching for changes in a mongodb 

Based on The Code Barbarian article:
https://thecodebarbarian.com/stock-price-notifications-with-mongoose-and-mongodb-change-streams.html

## To initiate receiver of rabbit:
### `tsc && node dist/receive.js`

## To init listener to mongo:

### A - Initiate repicaSet: 
1. `sudo mongod --replSet rs0`
2. `mongo`
3. >`rs.initiate()`

### B - `npm start`

## Example update mongo:
1. `use devDB`
2. `db.files.insertOne({ "key": "kk", "name": "myName", "size": 20, "type": "tt", "ownerID": "oid", "bucket": "bb", "parent": "pp" })`
