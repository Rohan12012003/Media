import {Client,Account,Databases,Storage,Avatars} from 'appwrite'

export const appwriteConfig={
    projectID:'657028f231578eddf1d3',
    url:"https://cloud.appwrite.io/v1",
    databaseId:'6570763b390eeb4bfae5',
    storageId:'657075a89a0846c95b81',
    userCollectionId:'6570772a4b7060d83f73',
    postCollectionId:'657076ac2058daaff841',
    savesCollectionId:'6570776e343f96ff2a72',

}
export const client=new Client();
client.setProject(appwriteConfig.projectID);
client.setEndpoint(appwriteConfig.url);


export const account=new Account(client);
export const databases=new Databases(client);
export const storage=new Storage(client);
export const avatars=new Avatars(client); 