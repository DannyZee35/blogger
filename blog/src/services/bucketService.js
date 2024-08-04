import { Client, Storage, ID } from "appwrite";
import { config } from "../config/config";

export class BucketService {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.bucket = new Storage(this.client);
  }

  async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.appwriteBucketID,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite serive :: uploadFile :: error", error);
        return false
    }
}

  deleteFile = async (fileID) => {
    try {
        await this.bucket.deleteFile(config.appwriteBucketID, fileID);
        return true
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  };

  filePreview = (fileID) => {
   return this.bucket.getFilePreview(config.appwriteBucketID, fileID);
  };
}

const bucketService= new BucketService()

export default bucketService;
