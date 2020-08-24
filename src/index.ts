import mongoose = require("mongoose");
import { Schema, model, Document } from 'mongoose';

const collectionName: string = 'files';
const dbName: string = 'devDB';
run().catch(error => console.error(error));

async function run() {
    console.log('initiating connection');
    // Connect to the replica set
    await mongoose.connect(`mongodb://localhost:27017/${dbName}?replicaSet=rs0`, { useNewUrlParser: true });
    console.log('connection finished');

    const ObjectId = Schema.Types.ObjectId;

    const fileSchema: Schema = new Schema(
    {
        key: {
        type: String,
        },
        name: {
        type: String,
        required: true,
        },
        type: {
        type: String,
        required: true,
        },
        description: {
        type: String,
        default: '',
        },
        ownerID: {
        type: String,
        required: true,
        },
        size: {
        type: Number,
        default: 0,
        },
        parent: {
        type: ObjectId,
        ref: 'File',
        default: null,
        },
        bucket: {
        type: String,
        required: false,
        },
        float: {
        type: Boolean,
        required: false,
        default: false,
        }
    },
    {
        timestamps: true,
        toObject: {
        virtuals: true,
        },
        toJSON: {
        virtuals: true,
        }
    }
    );

    const fileModel = model(collectionName, fileSchema);


    
    console.log('initiating watch');
    // The first argument to `watch()` is an aggregation pipeline. 
    // This pipeline makes sure we only get notified of changes on the 
    // collectionName collection.
    const pipeline = [{ $match: { 'ns.db': dbName, 'ns.coll': collectionName } }];
    fileModel.watch(pipeline).on('change', async(data) => {
        console.log('******************************************');
        console.log(`an ${(<any>data).operationType} operation occured in the database: ${(<any>data).ns.db},
                     in the collection: ${(<any>data).ns.coll}.`);
        console.log(`item id: ${(<any>data).documentKey._id}`);
        console.log(`change info:`);
        switch((<any>data).operationType) {
            case 'update':
                console.log((<any>data).updateDescription)
                break;
            case 'insert':
                console.log((<any>data).fullDocument)
                break;
            default:
                console.log((<any>data));
        }
        console.log('')
    })
}
