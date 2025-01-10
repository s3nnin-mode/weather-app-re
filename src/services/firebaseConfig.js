// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { updateDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

export const registerUser = async (nombre, correo, contraseña, ) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
    const uid = userCredential.user.uid;
    console.log('Datos del usuario guardados correctamente', userCredential.user);

    await setDoc(doc(db, 'users', uid), {
      name: nombre,
      email: correo,
      photoUrl: '',
      coord: {lat: 16.868, lon: -99.894},
      history: []
    });

    await signOut(auth);
    console.log('Datos del usuario subidos');
    
    return 'Registro exitoso';
  } catch(error) {
    if (error.code === 'auth/email-already-in-use') {
      console.error('The email is already registered.');
      return 'The email is already registered.'
    } else if (error.code === 'auth/invalid-email') {
      console.error('Invalid email format.');
      return 'Invalid email format.';
    } else if (error.code === 'auth/weak-password') {
      console.error('Password is too weak.');
      return 'Password is too weak.';
    } else {
      console.error('Error during registration:', error.message);
      return 'Error during registration';
    }
  }
}

export const getUserInfo = async () => {
  try {
    const auth = getAuth()
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log('no hay usuario autenticado');
        return null;
      }
    }
    return null;
  } catch(error) {
    console.log('error al solicitar de usuario login', error)
  }
}

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('login exitoso, user: ', user);
    return 'Login exitoso';
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error login: ', errorCode, errorMessage);
    switch (error.code) {
      case 'auth/user-not-found':
        return 'No hay una cuenta registrada con este correo electrónico.';
      case 'auth/wrong-password':
        return 'La contraseña ingresada es incorrecta.';
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es válido.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Inténtalo de nuevo más tarde.';
      case 'auth/invalid-credential':
        return 'Email no encontrado, verifica que el correo este registrado'
      default:
        return 'Ocurrió un error inesperado. Inténtalo más tarde.';
    } 
  });
}

export const updateCoordUser = async (coord) => {
  const auth = getAuth()
  const user = auth.currentUser;
  const docRef = doc(db, 'users', user.uid);
  await updateDoc(docRef, { coord: coord });
}

export const updateHistory = async (nuevasLocalidades) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const docRef = doc(db, 'users', user.uid);
  await updateDoc(docRef, { history: nuevasLocalidades});
  console.log('History actualizado en firebase', nuevasLocalidades)
}

export const updateLocalidadUser = async (coord) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const docRef = doc(db, 'users', user.uid);
  await updateDoc(docRef, { coord: coord} )
  console.log('coordenadas actualizadas en firebase');
}

export const updateNombreUser = async(nombre) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const docRef = doc(db, 'users', user.uid);
  await updateDoc(docRef, { name: nombre });
  console.log('nombre de usuario cambiado correctamente')
}

export const updateFotoPerfil = async(url) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const docRef = doc(db, 'users', user.uid);
  await updateDoc(docRef, { photoUrl: url});
}

export const subirFotoUser = async (archivo) => {
  const auth = getAuth();
  const user = auth.currentUser;
  try {
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageRef = ref(storage, `photosUsers/${user.uid}/${archivo.name}`);
    await uploadBytes(storageRef, archivo);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch(error) {
    console.log(error)
  }
}