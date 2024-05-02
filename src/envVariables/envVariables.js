const config = {

  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteStorageId: String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteSavesCollectionId: String(import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID),
  appwriteUsersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
  appwritePostsCollectionId: String(import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID),

}

export default config;