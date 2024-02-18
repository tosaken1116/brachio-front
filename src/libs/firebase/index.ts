import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log(user);
	} else {
	}
});
export const loginWithGoogle = () =>
	signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			if (credential === null) return;
			const token = credential.idToken;
			localStorage.setItem("google-token", token ?? "");
			localStorage.setItem("uid", result.user?.uid ?? "");
			window.location.href = "/";
		})
		.catch(() => {
			throw new Error("Google Login Error");
		});
