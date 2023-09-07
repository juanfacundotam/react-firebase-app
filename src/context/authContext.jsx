import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore, storage } from "../firebase";
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
import {getDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

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

  const deleteTask = async (updatedTasks) => {
    console.log(updatedTasks)
    try{
      const userDocRef = doc(firestore, `usuarios/${user.email}`);
      await updateDoc(userDocRef, {tareas: [...updatedTasks]})
      return updatedTasks
    }
    catch (error) {
      console.error("Error al eliminar la tarea:", error);
      // Manejar el error aquí
    }
//podria ser asi
    // try {
    //   // Obtén una referencia al documento del usuario actual
    //   const userDocRef = doc(firestore, `usuarios/${user.email}`);

    //   // Obtiene el documento del usuario
    //   const userDocAccess = await getDoc(userDocRef);

    //   // Verifica si el documento existe
    //   if (userDocAccess.exists()) {
    //     // Obtiene las tareas actuales del usuario
    //     const userTasks = userDocAccess.data().tareas;
    //     console.log(userTasks)

    //     // Filtra las tareas para eliminar la que coincida con el ID proporcionado
    //     const updatedTasks = userTasks.filter((tarea) => tarea.id !== taskId);
    //     console.log(updatedTasks)
    //     // Actualiza el documento del usuario con las tareas actualizadas
    //     await setDoc(userDocRef, { tareas: updatedTasks });

    //     return updatedTasks
    //   //   // Actualiza el estado local de las tareas (opcional)
    //   //   setTareas(updatedTasks);
    //   }
    try{

    }
    catch (error) {
      console.error("Error al eliminar la tarea:", error);
      // Manejar el error aquí
    }
  };

  const addTask = async (updatedTasks) => {
    try{
      const userDocRef = doc(firestore, `usuarios/${user.email}`);
      await updateDoc(userDocRef, {tareas: [...updatedTasks]})
      return updatedTasks
    }
    catch (error) {
      console.error("Error al agregar la tarea:", error);
      // Manejar el error aquí
    }
  }

  const addFile = async (archive) => {
console.log(archive)
const archivoRef = ref(storage, `documentos/${archive.name}`)
await uploadBytes(archivoRef, archive)


 const urlDownload = await getDownloadURL(archivoRef)
 return urlDownload
  }



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
        deleteTask,
        addTask,
        addFile,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
