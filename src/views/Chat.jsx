import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Channels from "../components/ChatContainers/Channels";
import UpBar from "../components/ChatContainers/UpBar";
import BodyMessage from "../components/ChatContainers/BodyMessage";
import SendMessage from "../components/ChatContainers/SendMessage";
import Spinner from "../components/spinner";

const messageData = [
  {
    name: "General",
    category: "channel",
    message: [
      {
        date: "2023-09-25T19:51:24.320Z",
        estado: "Desarrollador apasionado",
        name: "facundo",
        message: "Hola!",
        image:
          "https://firebasestorage.googleapis.com/v0/b/react-firebase-app-d4e2b.appspot.com/o/documentos%2Ffacutam%40gmail.com%2FfotoCV-removebg-preview.png?alt=media&token=c82358f0-946c-45e5-95b1-a769c73f3e7d",
        nickName: "Juan Facundo Tam",
        user: "facutam@gmail.com",
      },
      {
        date: "2023-09-25T19:51:24.320Z",
        estado: "Desarrollador apasionado",
        name: "facundo",
        message: "Tanto tiempo!",
        image:
          "https://firebasestorage.googleapis.com/v0/b/react-firebase-app-d4e2b.appspot.com/o/documentos%2Ffacutam%40gmail.com%2FfotoCV-removebg-preview.png?alt=media&token=c82358f0-946c-45e5-95b1-a769c73f3e7d",
        nickName: "Juan Facundo Tam",
        user: "facutam@gmail.com",
      },
      {
        date: "2023-09-25T19:51:24.320Z",
        estado: "Desarrollador apasionado",
        name: "Javier",
        message: "Hola!",
        image: "https://i.pravatar.cc/300",
        nickName: "Javi",
        user: "Javier@gmail.com",
      },
      {
        date: "2023-09-25T19:51:24.320Z",
        estado: "Desarrollador apasionado",
        name: "facundo",
        message: "Como va!",
        image: "https://i.pravatar.cc/300",
        nickName: "Javi",
        user: "Javier@gmail.com",
      },
      {
        date: "2023-09-25T19:51:24.320Z",
        estado: "Desarrollador apasionado",
        name: "facundo",
        message: "Bien y vos?",
        image:
          "https://firebasestorage.googleapis.com/v0/b/react-firebase-app-d4e2b.appspot.com/o/documentos%2Ffacutam%40gmail.com%2FfotoCV-removebg-preview.png?alt=media&token=c82358f0-946c-45e5-95b1-a769c73f3e7d",
        nickName: "Juan Facundo Tam",
        user: "facutam@gmail.com",
      },
      {
        date: "2023-09-25T19:51:24.320Z",
        estado: "Desarrollador apasionado",
        name: "facundo",
        message: "Que se cuenta?",
        image:
          "https://firebasestorage.googleapis.com/v0/b/react-firebase-app-d4e2b.appspot.com/o/documentos%2Ffacutam%40gmail.com%2FfotoCV-removebg-preview.png?alt=media&token=c82358f0-946c-45e5-95b1-a769c73f3e7d",
        nickName: "Juan Facundo Tam",
        user: "facutam@gmail.com",
      },
      {
        date: "2023-09-25T19:51:24.320Z",
        estado: "Desarrollador apasionado",
        name: "facundo",
        message: "Todo muy bien!",
        image: "https://i.pravatar.cc/300",
        nickName: "Javi",
        user: "Javier@gmail.com",
      },
    ],
  },
  {
    name: "Juan Pedro",
    email: "jpedro@gmail.com",
    category: "contact",
    message: [
      {
        date: "2023-09-25T19:51:24.320Z",
        estado: "Desarrollador apasionado",
        name: "Juan Pedro",
        message: "todo bien?",
        image:
          "https://firebasestorage.googleapis.com/v0/b/react-firebase-app-d4e2b.appspot.com/o/documentos%2Ffacutam%40gmail.com%2FfotoCV-removebg-preview.png?alt=media&token=c82358f0-946c-45e5-95b1-a769c73f3e7d",
        nickName: "Juan Facundo Tam",
        user: "facutam@gmail.com",
      },
      {
        date: "2023-09-25T19:58:24.320Z",
        estado: "Data Science",
        name: "Juan Pedro",
        message: "bien, vos?",
        image: "https://i.pravatar.cc/300",
        nickName: "JP",
        user: "jpedro@gmail.com",
      },
    ],
  },
  {
    name: "Javier Alonso",
    email: "javialo@gmail.com",
    category: "contact",
    message: [
      {
        date: "2023-09-25T19:51:24.320Z",
        estado: "Desarrollador apasionado",
        name: "Juan Pedro",
        message: "todo bien?",
        image:
          "https://firebasestorage.googleapis.com/v0/b/react-firebase-app-d4e2b.appspot.com/o/documentos%2Ffacutam%40gmail.com%2FfotoCV-removebg-preview.png?alt=media&token=c82358f0-946c-45e5-95b1-a769c73f3e7d",
        nickName: "Juan Facundo Tam",
        user: "facutam@gmail.com",
      },
      {
        date: "2023-09-25T19:58:24.320Z",
        estado: "Data Science",
        name: "Javier Alonso",
        message: "Todo bien!",
        image: "https://i.pravatar.cc/300",
        nickName: "Javi",
        user: "javialo@gmail.com",
      },
      {
        date: "2023-09-25T19:58:24.320Z",
        estado: "Data Science",
        name: "Javier Alonso",
        message: "vos?",
        image: "https://i.pravatar.cc/300",
        nickName: "Javi",
        user: "javialo@gmail.com",
      },
    ],
  },
];

export default function Chat() {
  const channelsFiltered = messageData.filter(
    (channel) => channel.category === "channel"
  );
  const contactFiltered = messageData.filter(
    (channel) => channel.category === "contact"
  );

  const [activeChannel, setActiveChannel] = useState("");
  const [loadSpinner, setLoadSpinner] = useState(true);
  const [message, setMessage] = useState("");
  const [channelMessageArray, setChannelMessageArray] = useState([]);
  const [contactMessageArray, setContactMessageArray] = useState([]);
  const [image, setImage] = useState("");

  const anchor = useRef();
  const {
    user,
    logout,
    loading,
    searchOrCreateDocument,
    searchOrCreateImage,
    getMessageContacts,
  } = useAuth();
  const [messageChats, setMessageChats] = useState(getMessageContacts());
  const [datos, setDatos] = useState({
    user: user.email,
    nickName: "NickName",
    estado: "Estado",
    image: image,
  });
  useEffect(() => {
    const fetchData = async () => {
      const contacts = await getMessageContacts();
      setMessageChats(contacts);
      getImage();
      getDatos();
    };
    fetchData();
  }, []);

  console.log(messageChats);

  useEffect(() => {
    loadMassageObject();
  }, [activeChannel]);

  function loadMassageObject() {
// Verifica si messageChats es un array antes de usar filter
if (Array.isArray(messageChats)) {
  let dataFiltered = messageChats.filter((item) => item.id === activeChannel);
  if (dataFiltered.length > 0) {
    console.log(dataFiltered[0].data);
    setMessageChats(dataFiltered[0].data);
  } else {
    console.log("No se encontraron elementos que coincidan con activeChannel.");
  }
} else {
  console.error("messageChats no es un array.");
}


    // console.log(dataFiltered);
    // setMessageChats(dataFiltered[0]);
    // setMessageChats(dataFiltered.message)
    // if(dataFiltered.category === "channel"){
    //   setMessageChats(dataFiltered);
    // } else {
    // }
    // let messageFiltered = dataFiltered.length
    //   ? dataFiltered[0].date.sort()
    //   : [];

  }

  async function getDatos() {
    const datosSearched = await searchOrCreateDocument(user.email);
    setDatos(datosSearched);
    setLoadSpinner(false);
  }
  async function getImage() {
    setImage(await searchOrCreateImage(user.email, user.photoURL));
  }

  return (
    <div className="flex justify-center items-center h-screen relative">
      {loadSpinner ? (
        <Spinner />
      ) : (
        <>
          <div className="bg-[#202123] flex flex-col justify-start items-center h-full w-[20%]">
            <Channels
              setActiveChannel={setActiveChannel}
              channelsFiltered={channelsFiltered}
              contactFiltered={contactFiltered}
            />
          </div>
          <div className="bg-[#343541] flex flex-col justify-start items-center h-full w-[80%]">
            <div className="border-b-[1px] border-[#646464] flex flex-col justify-center items-center h-[8%] w-full">
              <UpBar activeChannel={activeChannel} />
            </div>
            {activeChannel ? (
              <>
                <div className="border-b-[1px] border-[#646464] bg-[#343541] flex flex-col justify-start items-start h-[82%] w-full mt-2 overflow-y-scroll scrollbar">
                  <BodyMessage
                    messageChats={messageChats}
                    anchor={anchor}
                    user={user.email}
                  />
                </div>
                <div className=" bg-[#343541] flex flex-col justify-center items-center h-[10%] w-full">
                  <SendMessage
                    setMessage={setMessage}
                    message={message}
                    messageChats={messageChats}
                    setMessageChats={setMessageChats}
                    datos={datos}
                    user={user.email}
                    image={image}
                    anchor={anchor}
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
