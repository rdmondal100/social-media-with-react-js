
import envVariables from '../../envVariables/envVariables'
import { Account, Client, Databases, ID, Query } from "appwrite";
import storageServices from './storage_services';


export class PostServices {

   client = new Client();
   databases;
   account;

   constructor() {
      this.client
         .setEndpoint(envVariables.appwriteUrl)
         .setProject(envVariables.appwriteProjectId)
      this.account = new Account(this.client);
      this.databases = new Databases(this.client);

   }


   // creat post 
   async createPost({ post }) {
      try {
         console.log(post)
         console.log(post.file[0])
         const uploadedFile = await storageServices.uploadFile(post.file[0])
         console.log(uploadedFile)
         if (!uploadedFile) {
            throw Error
         }


         const fileUrl = await storageServices.getFilePreview(uploadedFile.$id)
         console.log(fileUrl)
         if (!fileUrl) {
            storageServices.deleteFile(uploadedFile.$id)
            throw Error;
         }

         //tags
         const tags = post.tags?.replace(/ /g, '').split(',') || []
         console.log(tags)


         //save post to db
         const newPost = await this.databases.createDocument(envVariables.appwriteDatabaseId, envVariables.appwritePostsCollectionId, ID.unique(), {
            creator: post.userId,
            caption: post.caption,
            imageUrl: fileUrl,
            imageId: uploadedFile.$id,
            location: post.location,
            tags: tags,
         })
         console.log(newPost)

         if (!newPost) {
            await storageServices.deleteFile(uploadedFile.$id)
            throw Error;
         }
         return newPost;

      } catch (error) {
         console.log("Error creating post ", error)
         return error;
      }
   }



   // get recent post
   async getRecentPosts() {
      try {

         const posts = await this.databases.listDocuments(
            envVariables.appwriteDatabaseId,
            envVariables.appwritePostsCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(20)]
         );
         console.log(posts);
         if (!posts) {
            throw new Error('Failed to get recent posts');
         }
         return posts;
      } catch (error) {
         console.error('Error fetching recent posts:', error);
         return error;
      }
   }


   //like post
   async likePost({postId, likesArray}) {
      try {
         console.log(postId)
         console.log(likesArray)
         const updatedPost = await this.databases.updateDocument(envVariables.appwriteDatabaseId, envVariables.appwritePostsCollectionId, postId, { likes: likesArray })
         if (!updatedPost) throw Error
         return updatedPost
      } catch (error) {
         console.log(error)
      }
   }

   //save post
   async savePost({postId,userId}) {
      try {
         console.log(postId,userId)
         const data = {
            user:userId,
            post:postId
         }
         console.log(data)
         const updatedPost = await this.databases.createDocument(envVariables.appwriteDatabaseId, envVariables.appwriteSavesCollectionId, ID.unique(), data)
         console.log(updatedPost)

         if (!updatedPost) {
            console.log("Failed to save the post")
            throw Error
         }
         return updatedPost
      } catch (error) {
         console.log(error)
      }
   }
   //delete save post
   async deleteSavedPost(savedRecordId) {
      try {
         const sattusCode = await this.databases.deleteDocument(envVariables.appwriteDatabaseId, envVariables.appwriteSavesCollectionId, savedRecordId)
         if (!sattusCode) throw Error
         return {status:'ok'}
      } catch (error) {
         console.log(error)
      }
   }

   //get post by id from database
   async getPostById(postId){
      try {
         const post = await this.databases.getDocument(
            envVariables.appwriteDatabaseId,
            envVariables.appwritePostsCollectionId,
            postId
         )
         if(!post) {
            console.log("Error getting post")
            throw new Error;
         }
         return post;
      } catch (error) {
         console.log(error)
      }
   }

   async updatePost( post ) {
      console.log(post)
      const hasFileToUpdate = post?.file?.length > 0;
      try {
         let image = {
            imageUrl: post.imageUrl,
            imageId: post.imageId,
         }
         if(hasFileToUpdate){
            const uploadedFile = await storageServices.uploadFile(post.file[0])

            if (!uploadedFile) {
               throw Error
            }


            const fileUrl = await storageServices.getFilePreview(uploadedFile.$id)
            console.log(fileUrl)
            if (!fileUrl) {
               storageServices.deleteFile(uploadedFile.$id)
               throw Error;
            }

            image = {...image,
               imageUrl:fileUrl,
               imageId:uploadedFile.$id,
            }
         }



         //tags
         const tags = post.tags?.replace(/ /g, '').split(',') || []


         //save post to db
         const updatePost = await this.databases.updateDocument(envVariables.appwriteDatabaseId, envVariables.appwritePostsCollectionId, post.postId, {
            caption: post.caption,
            imageUrl: image.imageUrl,
            imageId: image.imageId,
            location: post.location,
            tags: tags,
         })

         if (!updatePost) {
            await storageServices.deleteFile(post.imageId)
            throw Error;
         }
         return updatePost;

      } catch (error) {
         console.log("Error creating post ", error)
      }
   }


   async deletePost(postId,imageId){
      if(!imageId || !postId){
         throw Error;
      }

      try {
         const deletePost= await this.databases.deleteDocument(
            envVariables.appwriteDatabaseId,
            envVariables.appwritePostsCollectionId,
            postId
         )
         if(deletePost){
            await storageServices.deleteFile(imageId)
         }
         return {status: 'ok'}
      } catch (error) {
         console.log(error)
      }
   }


   async getInfinitePosts(id){
      console.log(id)

      const queries=[Query.orderDesc('$updatedAt'), Query.limit(5)]
      if(id){
         console.log("get page praram")
         queries.push(Query.cursorAfter(id.toString()))
      }
      try {
         const posts = await this.databases.listDocuments(
            envVariables.appwriteDatabaseId,
            envVariables.appwritePostsCollectionId,
            queries
         )
         
      
            console.log("**********get the post ********")
            console.log(id)
            console.log(posts)
         
         if(!posts) {
            throw Error;
         }
         return posts;
      } catch (error) {
         console.log(error)
      }
   }


   async searchPosts(searchString){


      try {
         const posts = await this.databases.listDocuments(
            envVariables.appwriteDatabaseId,
            envVariables.appwritePostsCollectionId,
            [Query.search('caption',searchString)]
         )
         if(!posts) {
            throw Error;
         }
         return posts;
      } catch (error) {
         console.log(error)
      }
   }
}

const postServices = new PostServices;
export default postServices;