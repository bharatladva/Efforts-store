/** @format */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDPWFSbuHeGCM_cAqrJksauaXW_tpMq0C4",
	authDomain: "efforts-store.firebaseapp.com",
	projectId: "efforts-store",
	storageBucket: "efforts-store.appspot.com",
	messagingSenderId: "384223782040",
	appId: "1:384223782040:web:2ab73b0d9033251b3adced",
	measurementId: "G-NT6K2HSSFQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
