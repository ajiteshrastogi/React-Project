import conf from '../conf'
import {Client, Account, ID} from 'appwrite'

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.account = new Account(this.client);
    }

    async createAccount ({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique, email, password, name);
            if(userAccount){
                // we will make a method so that if account create then it auto login done 
                return this.login({email,password})
            }else return userAccount;
        } catch (error) {
            throw error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
           throw error; 
        }
        // if we found that user not exist then return null as we dont want to expose credential in terminal
        return null;
    }

    async logout (){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authservice = new AuthService();
export default authservice;