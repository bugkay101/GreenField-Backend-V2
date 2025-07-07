import { decryptProfile } from "../useProfileWrite";

export const profileTransformer = (user: any, createdAt: any, items: any, reviews: any, username: any) => {
  // let decriptedEmail = decryptProfile(user.email); // on next update 
  return {
    user: user[0],
    profileImage: user.profileImage,
    name: user.name,
    email: user.email,
    description: user.discription,
    contact: user.contact,
    website: user.website,
    twitter: user.tweeter,
    instagram: user.instagram,
    otherSocial: user.otherSocial,
    followers: parseInt(user.followers),
    following: parseInt(user.following),
    createdAt: parseInt(createdAt),
    items,
    reviews,
    username
  };
};

