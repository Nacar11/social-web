import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { INewPost, INewUser, IUpdatePost } from "./types";


export async function createUserAccount(user: INewUser){
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
    );


    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: avatarUrl
    
    })
    return newUser;
    }
    catch(e){
        console.log(e);
    return(e);
    }
}

export async function saveUserToDB(user:{
        accountId: string;
        email: string;
        name: string;
        imageUrl: URL;
        username?: string;
    }){
        try{
            const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
            );
            return newUser
            } catch(e){
            console.log(e)
            }
}

export async function signInAccount(user: {email: string; password: string}){
    try{
        const session  = await account.createEmailSession(user.email, user.password)
        return session;
    }
    catch(e){
        console.log(e)
    }
}

export async function signOutAccount(){
    try{
      const session = await account.deleteSession("current");
      return session
    }
    catch(e){
        console.log(e)
    }
}

export async function getCurrentUser(){
    try {
        const currentAccount = await account.get();

        if(!currentAccount) console.log('asdasd');
        
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', [currentAccount.$id])]
        );
        if(!currentUser) throw Error;

        return currentUser.documents[0];
    }catch(e){
        console.log(e);
    }
}

export async function createPost(post: INewPost){
    try {
        // UPLOAD IMAGE TO STORAGE
       const uploadedFile = await uploadFile(post.file[0])
       if(!uploadedFile) throw Error;
        // GET FILE URL
       const fileUrl = getPreviewFile(uploadedFile.$id);

       if(!fileUrl){
        deleteFile(uploadedFile.$id);
        throw Error;
       }
       // CONVERT TAGS INTO ARRAY
       const tags = post.tags?.replace(/ /g, '').split(',') || [];

       // SAVE POST TO DATABASE
       const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
                
            },
       )
        if(!newPost){
            deleteFile(uploadedFile.$id);
            throw Error;
        }
        return newPost;
        }catch(e){
            console.log(e);
        }
}

export async function uploadFile(file: File){
    try {
       const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
       );
       return uploadedFile;
    }catch(e){
        console.log(e);
    }
}

export function getPreviewFile(fileId: string){
    try {
       const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
       );
       return fileUrl;
    }catch(e){
        console.log(e);
    }
}

export async function deleteFile(fileId: string){
    try {
       await storage.deleteFile(
         appwriteConfig.storageId,
         fileId
       )
       return {status: 'success'}
    }catch(e){
        console.log(e);
    }
}

export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
         appwriteConfig.databaseId,
         appwriteConfig.postCollectionId,
         postId,
         {
            likes: likesArray
         }
    );
    if (!updatedPost) throw Error;
    return updatedPost;

  } catch (error) {
    console.log(error);
  }
}

export async function savePost(postId: string, userId: string) {
  try {
    const updatedPost = await databases.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.saveCollectionId,
         ID.unique(),
         {
            user: userId,
            post: postId
         }
    );
    if (!updatedPost) throw Error;
    return updatedPost;

  } catch (error) {
    console.log(error);
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
         appwriteConfig.databaseId,
         appwriteConfig.saveCollectionId,
         savedRecordId
    );
    if (!statusCode) throw Error;
    return {status: 'success'};

  } catch (error) {
    console.log(error);
  }
}

export async function getPostById(postId: string){
   try {
    const post = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
    )

    return post;
  

  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(post: IUpdatePost){
   const hasFileToUpdate = post.file.length > 0;
    try {
      let image = {
        imageUrl: post.imageUrl,
        imageId: post.imageId
      }
      if(hasFileToUpdate){
        const uploadedFile = await uploadFile(post.file[0])
        if(!uploadedFile) throw Error;

        const fileUrl = getPreviewFile(uploadedFile.$id);

        if(!fileUrl){
          deleteFile(uploadedFile.$id);
          throw Error;
        }

        image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id}
      }
     
       // CONVERT TAGS INTO ARRAY
       const tags = post.tags?.replace(/ /g, '').split(',') || [];

       // SAVE POST TO DATABASE
       const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            post.postId,
            {
                caption: post.caption,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
                location: post.location,
                tags: tags
                
            },
       )
        if(!updatedPost){
            await deleteFile(post.imageId);
            throw Error;
        }
        return updatedPost;
        }catch(e){
            console.log(e);
        }
}

export async function deletePost(postId: string, imageId: string){
  if(!postId || !imageId) throw Error;

   try {
    await databases.deleteDocument(
       appwriteConfig.databaseId,
         appwriteConfig.postCollectionId,
         postId
    )
    return {status: 'success'};
    
  } catch (error) {
    console.log(error);
  }


}