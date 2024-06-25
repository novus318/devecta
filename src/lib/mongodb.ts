import { MongoClient, MongoClientOptions } from 'mongodb';

const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Add Mongo URI to .env.local');
}

const options:any = {
    useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // This is necessary to ensure the global namespace augmentation
  // doesn't interfere with other global declarations
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the client is reused across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client for each request
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
