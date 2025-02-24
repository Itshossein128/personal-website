import { MongoClient, Db } from 'mongodb';
import { BlogPost } from '../types/blog';

// Define a type for the global object to store the cached client
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Environment variable validation
const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Singleton pattern for connection (Vercel-friendly)
if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

// Export the database instance
export async function getDb(): Promise<Db> {
    const client = await clientPromise;
    return client.db('hoseindev'); // Replace 'myBlogDb' with your database name
}

// Optional: Export a typed collection helper if needed
export async function getBlogCollection() {
    const db = await getDb();
    return db.collection<BlogPost>('blogs');
}