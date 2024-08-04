import { Client, Account, ID } from "appwrite";
import { config } from "../config/config";


export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL) 
      .setProject(config.appwriteProjectID);

      this.account = new Account(this.client)
  }

    Register = async({email,password,name})=>{
    try {
        const response = await this.account.create(ID.unique(),email,password, name)
         if(response){
            return this.Login({email,password})
         }
         else{
            return response;
         }


    } catch (error) {
        throw error
    }
    
 }

  Login = async({email,password})=>{
    try {
        return await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
        throw error
    }
  }
  getCurrentUser = async()=>{
    try {
        return await this.account.get()
    } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
  }
  Logout = async()=>{
    try {
        return await this.account.deleteSessions()

    } catch (error) {
        console.log("Appwrite serive :: logout :: error", error);

    }
  }
   
}

const authService = new AuthService();

export default authService;
