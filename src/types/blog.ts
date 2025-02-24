export interface BlogPost {
    _id?: string; // MongoDB uses _id as the primary key
    title: string;
    content: string;
    images?: string[]; // Array of image URLs or paths
    likes: number;
    comments: Comment[];
    createdAt: Date;
}