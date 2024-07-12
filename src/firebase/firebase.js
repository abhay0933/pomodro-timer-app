import {getApp,getApps,initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCXyKyoFbOM6X46pXOtxzQ7tGnPT_DV9xo",
  authDomain: "mtechzilla-90424.firebaseapp.com",
  projectId: "mtechzilla-90424",
  storageBucket: "mtechzilla-90424.appspot.com",
  messagingSenderId: "750249488304",
  appId: "1:750249488304:web:b0a42428d3ca68f10fb075",
  measurementId: "G-NLFC7B4LWQ"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db= getFirestore(app);

  export {app, auth, db};