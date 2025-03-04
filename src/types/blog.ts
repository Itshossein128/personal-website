import { ObjectId } from "mongodb";

export interface BlogPost {
    _id?: ObjectId; // MongoDB uses _id as the primary key
    title: string;
    content: string;
    images?: string[]; // Array of image URLs or paths
    createdAt: Date;
}