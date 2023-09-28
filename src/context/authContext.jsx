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
import {
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";

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

  const searchOrCreateDocument = async (idDocumento, datos) => {
    //crear referencia al documento
    const docRef = doc(firestore, `usuarios/${idDocumento}`);
    //buscar documento
    const consulta = await getDoc(docRef);
    // revisar si existe
    if (consulta.exists()) {
      // si, existe
      const infoDoc = consulta.data();
      return infoDoc.datos;
    } else {
      // no, no existe
      await setDoc(docRef, {
        datos: { nickName: user.displayName || user.email, estado: "..." },
        contacts: [],
      });
      const consulta = await getDoc(docRef);
      const infoDoc = consulta.data();
      return infoDoc.tareas;
    }
  };
  // const searchOrCreateDocument = async (idDocumento) => {
  //   //crear referencia al documento
  //   const docRef = doc(firestore, `usuarios/${idDocumento}`);
  //   //buscar documento
  //   const consulta = await getDoc(docRef);
  //   // revisar si existe
  //   if (consulta.exists()) {
  //     // si, existe

  //     const infoDoc = consulta.data();
  //     return infoDoc.tareas;
  //   } else {

  //     // no, no existe
  //     await setDoc(docRef, { tareas: [...arrayTasks] });
  //     const consulta = await getDoc(docRef);
  //     const infoDoc = consulta.data();
  //     return infoDoc.tareas;
  //   }
  // };

  const deleteTask = async (updatedTasks) => {
    try {
      const userDocRef = doc(firestore, `usuarios/${user.email}`);
      await updateDoc(userDocRef, { tareas: [...updatedTasks] });
      return updatedTasks;
    } catch (error) {
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

    //     // Filtra las tareas para eliminar la que coincida con el ID proporcionado
    //     const updatedTasks = userTasks.filter((tarea) => tarea.id !== taskId);
    //     // Actualiza el documento del usuario con las tareas actualizadas
    //     await setDoc(userDocRef, { tareas: updatedTasks });

    //     return updatedTasks
    //   //   // Actualiza el estado local de las tareas (opcional)
    //   //   setTareas(updatedTasks);
    //   }
    try {
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      // Manejar el error aquí
    }
  };

  const addTask = async (updatedTasks) => {
    try {
      const userDocRef = doc(firestore, `usuarios/${user.email}`);
      await updateDoc(userDocRef, { tareas: [...updatedTasks] });
      return updatedTasks;
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
      // Manejar el error aquí
    }
  };

  const addFile = async (idDocumento, archive) => {
    const archivoRef = ref(
      storage,
      `documentos/${idDocumento}/${archive.name}`
    );
    await uploadBytes(archivoRef, archive);
    const urlDownload = await getDownloadURL(archivoRef);
    return urlDownload;
  };

  //Image Profile
  const searchOrCreateImage = async (idDocumento, fileURL) => {
    const docRef = doc(firestore, `usuarios/${idDocumento}`);
    let consulta = await getDoc(docRef);
    let infoDoc = consulta.data();

    if (consulta.exists()) {
      if (infoDoc.hasOwnProperty("newImage")) {
        return infoDoc.newImage;
      } else {
        await updateDoc(docRef, { newImage: fileURL });
        consulta = await getDoc(docRef);
        infoDoc = consulta.data();
        return infoDoc.newImage;
      }
    } else {
      // await setDoc(docRef, { newImage: fileURL });
      consulta = await getDoc(docRef);
      infoDoc = consulta.data();
      return infoDoc.newImage;
    }
  };

  const addNewImage = async (idDocumento, archive) => {
    // Obtén una referencia a la carpeta de documentos
    const documentosRef = ref(storage, `documentos/${idDocumento}`);
    const listResult = await listAll(documentosRef);
    listResult.items.forEach(async (item) => await deleteObject(item));

    const archivoRef = ref(documentosRef, archive.name);
    await uploadBytes(archivoRef, archive);
    const urlDownload = await getDownloadURL(archivoRef);

    const docRef = doc(firestore, `usuarios/${idDocumento}`);
    await updateDoc(docRef, { newImage: urlDownload });
    return urlDownload;
  };

  const addDatos = async (datosUpdated) => {
    try {
      const userDocRef = doc(firestore, `usuarios/${user.email}`);
      await updateDoc(userDocRef, { datos: datosUpdated });
      return datosUpdated;
    } catch (error) {
      console.error("Error al agregar los datos:", error);
      // Manejar el error aquí
    }
  };

  const sendMessageFirebase = async (messageBody) => {
    console.log(messageBody);

    try {
      const userDocRef = doc(firestore, `usuarios/${user.email}`);
      const contactsCollectionRef = collection(userDocRef, "contactos");

      const contactEmail = messageBody[0].id;
      const contactData = messageBody[0].data;

      const contactDocRef = doc(contactsCollectionRef, contactEmail);

      await setDoc(contactDocRef, contactData);

      console.log(
        `Datos agregados con éxito en la carpeta '${contactEmail}' dentro de la subcolección 'contacts'`
      );
    } catch (error) {
      console.error("Error al agregar los datos:", error);
      // Manejar el error aquí
    }
  };

  const getMessageContacts = async () => {
    try {
      // Obtener una referencia al documento del usuario
      const userDocRef = doc(firestore, `usuarios/${user.email}`);

      // Obtener una referencia a la colección "contactos"
      const contactsCollectionRef = collection(userDocRef, "contactos");

      // Obtener todos los documentos de la colección "contactos"
      const querySnapshot = await getDocs(contactsCollectionRef);

      const documentos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log(documentos);
      // Consololear todo el array de documentos
      return documentos;

      // Iterar a través de los documentos y mostrar sus datos
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      // });
      // console.log(querySnapshot.data())
      //       return querySnapshot
    } catch (error) {
      console.error("Error obteniendo documentos: ", error);
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
        deleteTask,
        addTask,
        addFile,
        searchOrCreateImage,
        addNewImage,
        addDatos,
        sendMessageFirebase,
        getMessageContacts,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
