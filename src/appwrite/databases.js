import conf from '../conf/conf.js';
import {Client, ID, Databases, Storage, Query, Account} from 'appwrite';

export class DatabaseService{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }
            )                       
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error);
            return false;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )                       
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error);
            return false;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )   
            return true                    
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error);
            return false;
        }
    }

    //file upload

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false;
        } 
    }

    async deleteFile(fileID){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileID,
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false;
        }      
    }

    previewFile(fileID){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileID,
        )   
    }
}

const databaseService = new DatabaseService();
export default databaseService;