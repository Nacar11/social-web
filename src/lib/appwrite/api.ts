import { ID, Query } from "appwrite";
import { errorUtil } from "node_modules/zod/lib/helpers/errorUtil";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { INewPost, INewUser } from "./types";


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
            appwriteConfig.postsCollectionId,
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