import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, signOut } from "firebase/auth";


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error("Google Sign-In Error: ", error);
    }
}

export const signInWithGithub = async () => {
    try {
        await signInWithPopup(auth, githubProvider);
    } catch (error) {
        console.error("GitHub Sign-In Error: ", error);
    }
}

export const menu = [
    { id: uuidv4(), name: "Projects", url: "/home/projects" },
    { id: uuidv4(), name: "Collections", url: "/home/collection" },
    { id: uuidv4(), name: "Profile", url: "/home/profile" },
];

export const signoutfn = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Sign-out successful.");
    } catch (error) {
      console.error("An error happened during sign-out:", error);
    }
  };
