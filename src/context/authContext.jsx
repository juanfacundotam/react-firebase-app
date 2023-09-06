import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
//Estas funciones podriamos usarlas en cualquier componente sin el authContext
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tareas, setTareas] = useState(null);
  const [loading, setLoading] = useState(true);

  const arrayTasks = [
    { id: 1, description: "Foto Pedro", url: "https://picsum.photos/420" },
    { id: 2, description: "Foto Juan", url: "https://picsum.photos/420" },
    { id: 3, description: "Foto Tomas", url: "https://picsum.photos/420" },
  ];
  // const user = {
  //   login: true,
  // };

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  // const login = (email, password) => {
  //   //podemos guardar la respuesta que es un objeto con info
  //   const userCredencial = signInWithEmailAndPassword(auth, email, password)
  //   console.log(userCredencial)
  // }
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
    // Si la función se ejecuta correctamente, puedes realizar acciones adicionales aquí.
  };

  const searchOrCreateDocument = async (idDocumento) => {
    //crear referencia al documento
    const docRef = doc(firestore, `usuarios/${idDocumento}`);
    //buscar documento
    const consulta = await getDoc(docRef);
    // revisar si existe
    if (consulta.exists()) {
      // si, existe
      console.log("Entro en existe consulta")
      const infoDoc = consulta.data();
      return infoDoc.tareas;
    } else {
      console.log("Entro en NO existe consulta")
      // no, no existe
      await setDoc(docRef, { tareas: [...arrayTasks] });
      const consulta = await getDoc(docRef);
      const infoDoc = consulta.data();
      return infoDoc.tareas;
    }
  };

  useEffect(() => {
    //con esto tambien veo ese objeto con la info. onAuthStateChanged detecta el cambio de sesion. si se logeo o cerro
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      return () => unsubscribe();
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
        searchOrCreateDocument,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
