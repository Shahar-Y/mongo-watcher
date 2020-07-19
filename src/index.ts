import * as mongoose from 'mongoose';
import { Schema, model, Document } from 'mongoose';

const collectionName: string = 'File';
run().catch(error => console.error(error));

async function run() {

    // Connect to the replica set
    await mongoose.connect('mongodb://localhost:27017/devDB', { useNewUrlParser: true });


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



    // The first argument to `watch()` is an aggregation pipeline. 
    // This pipeline makes sure we only get notified of changes on the 
    // collectionName collection.
    const pipeline = [{ $match: { 'ns.db': 'devDB', 'ns.coll': collectionName } }];
    fileModel.watch(pipeline).on('change', async(data) => {
        console.log('collection changed. document data:');
        console.log((<any>data).fullDocument);
    })
}
