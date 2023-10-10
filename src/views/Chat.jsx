import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Channels from "../components/ChatContainers/Channels";
import UpBar from "../components/ChatContainers/UpBar";
import BodyMessage from "../components/ChatContainers/BodyMessage";
import SendMessage from "../components/ChatContainers/SendMessage";
import Spinner from "../components/spinner";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';



import {
  getDocs,
  doc,
  collection,
  getFirestore,
  onSnapshot
} from "firebase/firestore";






export default function Chat() {


  const [activeChannel, setActiveChannel] = useState({
    name: "",
    category: "",
  });
  const [channelName, setChannelName] = useState("");
  const [loadSpinner, setLoadSpinner] = useState(true);
  const [message, setMessage] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [channelMessageArray, setChannelMessageArray] = useState([]);
  const [contactMessageArray, setContactMessageArray] = useState([]);
  const [image, setImage] = useState("");
  const [newContact, setNewContact] = useState("");
  const [dataChanged, setDataChanged] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconsHidden, setIconsHidden] = useState(false);

  const anchor = useRef();
  const {
    user,
    logout,
    loading,
    searchOrCreateDocument,
    searchOrCreateImage,
    // getMessageContacts,
    searchAndLinkMyContacts,
    updatedMessage
  } = useAuth();
  const [messageChats, setMessageChats] = useState([]);
  const [datos, setDatos] = useState({
    user: user.email,
    nickName: "NickName",
    estado: "Estado",
    image: image,
  });
  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setMenuOpen(false);
        setIconsHidden(false)
      } else {
        setMenuOpen(true);
        setIconsHidden(true)
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  const fetchData = async () => {
    let unsubscribeCanales, unsubscribeContactos;
    try {
      const result = await getMessageContacts();
      unsubscribeCanales = result.unsubscribeCanales;
      unsubscribeContactos = result.unsubscribeContactos;
      setMessageChats({canales: result.canales, contactos: result.contactos });
    } catch (error) {
      console.error('Error obteniendo documentos:', error);
    }
  };
  useEffect(() => {
    let unsubscribeCanales, unsubscribeContactos;
    
    const fetchData = async () => {
      try {
        const result = await getMessageContacts();
        unsubscribeCanales = result.unsubscribeCanales;
        unsubscribeContactos = result.unsubscribeContactos;
        setMessageChats({canales: result.canales, contactos: result.contactos });
      } catch (error) {
        console.error('Error obteniendo documentos:', error);
      }
    };
    getImage();
    getDatos();
    fetchData();
  
    // Puedes realizar cualquier acción adicional con los datos aquí si es necesario
  
    // Limpia la escucha cuando el componente se desmonta
    return () => {
      if (unsubscribeCanales) {
        unsubscribeCanales();
      }
      if (unsubscribeContactos) {
        unsubscribeContactos();
      }
    };
  }, []);


  console.log(messageChats)



  useEffect(() => {
    if (activeChannel !== "") {
      loadMessageBody();
    }
  }, [activeChannel, messageChats]);

  function loadMessageBody() {
    if (activeChannel.category === "channel") {
      let messageBodyFilered = messageChats.canales.filter(
        (item) => item.id === activeChannel.name
      );
      setMessageBody(messageBodyFilered);
    }
    if (activeChannel.category === "contact") {
      let messageBodyFilered = messageChats.contactos.filter(
        (item) => item.id === activeChannel.name
      );
      setMessageBody(messageBodyFilered);
    }
  }

  const getMessageContacts = async () => {
    try {
      const db = getFirestore();
      const canalesRef = collection(db, 'canales');
      const userDocRefContactos = doc(db, `usuarios/${user.email}`);
      const contactsCollectionRefContactos = collection(userDocRefContactos, 'contactos');
  
      // Escucha cambios en la colección "canales"
      const unsubscribeCanales = onSnapshot(canalesRef, (querySnapshot) => {
        const documentosCanales = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        // Actualiza tu estado o realiza cualquier otra acción con los datos de "canales"
        console.log('Canales actualizados:', documentosCanales);
        setMessageChats((prevChats) => ({ ...prevChats, canales: documentosCanales }));
      });
  
      // Escucha cambios en la colección "contactos"
      const unsubscribeContactos = onSnapshot(contactsCollectionRefContactos, (querySnapshot) => {
        const documentosContactos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        // Actualiza tu estado o realiza cualquier otra acción con los datos de "contactos"
        console.log('Contactos actualizados:', documentosContactos);
        setMessageChats((prevChats) => ({ ...prevChats, contactos: documentosContactos }));
      });
  
      // Obtén los datos iniciales de canales y contactos
      const canalesSnapshot = await getDocs(canalesRef);
      const contactosSnapshot = await getDocs(contactsCollectionRefContactos);
  
      const documentosCanales = canalesSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
  
      const documentosContactos = contactosSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
  
      // Devuelve tanto los datos como las funciones de cancelación
      return {
        canales: documentosCanales,
        contactos: documentosContactos,
        unsubscribeCanales,
        unsubscribeContactos,
      };
    } catch (error) {
      console.error('Error obteniendo documentos:', error);
      throw error; // Re-lanza el error para manejarlo en el componente
    }
  };


  async function getDatos() {
    const datosSearched = await searchOrCreateDocument(user.email);
    setDatos(datosSearched);
    setLoadSpinner(false);
  }
  async function getImage() {
    setImage(await searchOrCreateImage(user.email, user.photoURL));
  }

  const setNewContactFunction = (contact) => {
    setNewContact(contact);
  };
  const searchAndLinkContact = () => {
    searchAndLinkMyContacts(newContact);
    fetchData();
  };

  return (
    <div className="flex justify-center items-center h-screen relative text-xl md:text-xs">
      {loadSpinner ? (
      // {true ? (
        <Spinner />
      ) : (
        <>
          <div className={menuOpen ? "bg-[#202123] flex flex-col justify-start items-center h-screen md:w-[20%] md:relative absolute  w-full z-50" : "hidden"}>
          {!iconsHidden && <ArrowBackIcon sx={{
          fontSize: 25,
          position: "absolute",
          right: 10,
          top: 15,
          cursor: "pointer",
          marginLeft: 3,
          marginRight: 1,
          transition: "color 0.3s ease",
          "&:hover": {
            color: "grey",
            scale: "1.1",
          },
        }} onClick={() => setMenuOpen(false)}/>}
            <Channels
            setMenuOpen={setMenuOpen}
              setActiveChannel={setActiveChannel}
              setChannelName={setChannelName}
              messageChats={messageChats}
              setNewContactFunction={setNewContactFunction}
              searchAndLinkContact={searchAndLinkContact}
            />
          </div>
          <div className="bg-[#343541] flex flex-col justify-start items-center h-full w-full md:w-[80%]">
            <div className="border-b-[1px] border-[#646464] flex flex-col justify-center items-center h-[8%] w-full">
              <UpBar iconsHidden={iconsHidden} channelName={channelName} setMenuOpen={setMenuOpen}/>
            </div>
            {activeChannel.name ? (
              <>
                <div className="border-b-[1px] border-[#646464] bg-[#343541] flex flex-col justify-start items-start h-[82%] w-full mt-2 overflow-y-scroll scrollbar">
                  <BodyMessage
                  iconsHidden={iconsHidden}
                    messageBody={messageBody}
                    anchor={anchor}
                    user={user.email}
                    activeChannel={activeChannel}
                  />
                </div>
                <div className=" bg-[#343541] flex flex-col justify-center items-center h-[10%] w-full">
                  <SendMessage
                    activeChannel={activeChannel}
                    setMessage={setMessage}
                    message={message}
                    messageChats={messageChats}
                    setMessageChats={setMessageChats}
                    messageBody={messageBody}
                    setMessageBody={setMessageBody}
                    datos={datos}
                    user={user.email}
                    image={image}
                    anchor={anchor}
                    fetchData={fetchData}
                  />
                </div>
              </>
            ) : (
              <div className="border-b-[1px] border-[#646464] bg-[#343541] flex flex-col justify-center items-center h-[82%] w-full mt-2 overflow-y-scroll scrollbar">
                <p>Elige un canal/contacto</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
