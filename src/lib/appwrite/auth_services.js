
import envVariables from '../../envVariables/envVariables'
import { Client, Account, ID, Avatars, Databases, Query } from "appwrite"




export class AuthService {

  client = new Client;
  account;
  avatars;
  constructor() {
    this.client
      .setEndpoint(envVariables.appwriteUrl)
      .setProject(envVariables.appwriteProjectId)
    this.account = new Account(this.client)
    this.avatars = new Avatars(this.client)
    this.databases = new Databases(this.client)
  }

  //Creat Account
  async createUserAccount({ email, password, name, username }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name,)
      if (userAccount) {

        const avatarUrl = this.avatars.getInitials(name)

        const newUser = await this.saveUserToDB({
          accountId: userAccount.$id,
          name: userAccount.name,
          email: userAccount.email,
          username: "@"+ username,
          imageUrl: avatarUrl,
        })

        return newUser;
      }
      else {
        return new Error ("Failed to creat a new account, Please try again");
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }


  //Save user to DB
  async saveUserToDB({
    accountId, email, name, imageUrl, username,
  }) {
    try {
      const userData = {
        accountId, email, name, imageUrl, username,
      }
      const newUser = await this.databases.createDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteUsersCollectionId,
        accountId,
        userData,
      )
      if (newUser) {
        return newUser
      }
      else {
        return Error
      }
    } catch (error) {
      console.log("Error in saveUserToDB:: ", error)
    }

  }


  //SignIn

  async signIn({ email, password }) {
    console.log(email)
    console.log(password)
    try {
      const session = await this.account.createEmailPasswordSession(email, password)
      console.log("Successfully Logged in")
      console.log(session)
      return session;


    } catch (error) {
      console.log("Error in the login::", error);
      return error;
    }
  }


  //signOut
  async signOut(){
    try {
      const session = await this.account.get();  // Check for existing session
  
      if (session) {
        const deletedSession = await this.account.deleteSession('current');
        console.log(deletedSession)
        return deletedSession;
      } else {

        console.log("No session found to delete"
      )
        return 0; // Or some message indicating no session found
      }
    } catch (error) {
      console.log(error)
      return 0
    }
  }
  

  
  //CurrentUser
  async getCurrentUserAccount() {
    try {
      const currentAccount = await this.account.get();
      console.log(currentAccount)
      if (!currentAccount) {
        return null
      }
  
      // Use getDocument instead of listDocuments with specific ID
      const currentUser = await this.databases.getDocument(
        envVariables.appwriteDatabaseId,
envVariables.appwriteUsersCollectionId,
        currentAccount.$id
      );
      if (!currentUser) {
        return new Error("Error getting current user data");
      }else{
        return currentUser
      }
    } catch (error) {
      return error;
    }
  }
  

  

}





const authService = new AuthService;
export default authService;