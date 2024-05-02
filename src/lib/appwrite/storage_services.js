
import envVariables from '../../envVariables/envVariables'
import { Account, Client, Databases, ID, Query, Storage } from "appwrite";

export class StorageServices {

  client = new Client();
  storage;
  account;

  constructor() {
    this.client
      .setEndpoint(envVariables.appwriteUrl)
      .setProject(envVariables.appwriteProjectId)
    this.account = new Account();
    this.storage = new Storage(this.client);

  }


  //upload file
  async uploadFile(file) {

    try {
      console.log(file)
      const uploadedFile = await this.storage.createFile(envVariables.appwriteStorageId, ID.unique(), file)
      console.log(uploadedFile)
      return uploadedFile;

    } catch (error) {
      console.log("error uploading file", error)
      return error
    }
  }


  //get file preview     
  async getFilePreview(fileId){
    try {
      const fileUrl = this.storage.getFilePreview(envVariables.appwriteStorageId,fileId,2000,2000,"top",100);
      return fileUrl;
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  // deleteFile     
  async deleteFile(fileId){
    try {
     await this.storage.deleteFile(envVariables.appwriteStorageId,fileId,)
      return {status:'ok'};
    } catch (error) {
      console.log(error)
      return error;
    }
  }

}

const storageServices = new StorageServices;
export default storageServices;