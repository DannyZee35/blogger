import { Client, Databases, ID, Query } from "appwrite";
import { config } from "../config/config";

export class DbService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.databases = new Databases(this.client);
  }

  createPost = async ({
    title,
    slug,
    content,
    featuredImage,
    status,
    userID,
  }) => {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  };

  updatePost = async (
    slug,{title,content, featuredImage, status}
  ) => {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  };

  deletePost = async (slug) => {
    try {
       await this.databases.deleteDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug
     )
     return true
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  };

  getPosts =async(queries = [Query.equal("status", "active")])=>{

    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseID,
            config.appwriteCollectionID,
            queries,

        )
    } catch (error) {
        console.log("Appwrite serive :: getPosts :: error", error);
        return false
    }
  }

  getSinglePost=async(slug)=>{
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseID,
            config.appwriteCollectionID,
            slug,
           
        )
    } catch (error) {
                    console.log("Appwrite serive :: getPost :: error", error);
return false
    }
  }
}


const dbService = new DbService()

export default dbService;
