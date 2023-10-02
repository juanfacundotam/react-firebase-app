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
  // {
  //   name: "Juan Pedro",
  //   email: "jpedro@gmail.com",
  //   category: "contact",
  //   message: [
  //     {
  //       date: "2023-09-25T19:51:24.320Z",
  //       estado: "Desarrollador apasionado",
  //       name: "Juan Pedro",
  //       message: "todo bien?",
  //       image:
  //         "https://firebasestorage.googleapis.com/v0/b/react-firebase-app-d4e2b.appspot.com/o/documentos%2Ffacutam%40gmail.com%2FfotoCV-removebg-preview.png?alt=media&token=c82358f0-946c-45e5-95b1-a769c73f3e7d",
  //       nickName: "Juan Facundo Tam",
  //       user: "facutam@gmail.com",
  //     },
  //     {
  //       date: "2023-09-25T19:58:24.320Z",
  //       estado: "Data Science",
  //       name: "Juan Pedro",
  //       message: "bien, vos?",
  //       image: "https://i.pravatar.cc/300",
  //       nickName: "JP",
  //       user: "jpedro@gmail.com",
  //     },
  //   ],
  // },
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
  const [channelName, setChannelName] = useState("");
  const [loadSpinner, setLoadSpinner] = useState(true);
  const [message, setMessage] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [channelMessageArray, setChannelMessageArray] = useState([]);
  const [contactMessageArray, setContactMessageArray] = useState([]);
  const [image, setImage] = useState("");
  const [newContact, setNewContact] = useState("")

  const anchor = useRef();
  const {
    user,
    logout,
    loading,
    searchOrCreateDocument,
    searchOrCreateImage,
    getMessageContacts,
    searchAndLinkMyContacts,
  } = useAuth();
  const [messageChats, setMessageChats] = useState([]);
  const [datos, setDatos] = useState({
    user: user.email,
    nickName: "NickName",
    estado: "Estado",
    image: image,
  });
  useEffect(() => {
    // const fetchData = async () => {
    //   const contacts = await getMessageContacts();
    //   setMessageChats(contacts);
    //   getImage();
    //   getDatos();
    // };
    fetchData();
  }, []);

  useEffect(() => {
    if(activeChannel !== ""){
      loadMessageBody();
    }
  }, [activeChannel]);

  function loadMessageBody() {
    let messageBodyFilered = messageChats.filter((item) => item.id === activeChannel);
    setMessageBody(messageBodyFilered)
  }


  async function fetchData() {
    const contacts = await getMessageContacts(activeChannel);
    setMessageChats(contacts);
    getImage();
    getDatos();
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
setNewContact(contact)
  }
  const searchAndLinkContact = () => {
    searchAndLinkMyContacts(newContact)
    fetchData()
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
              setChannelName={setChannelName}
              channelsFiltered={channelsFiltered}
              contactFiltered={contactFiltered}
              messageChats={messageChats}
              setNewContactFunction = {setNewContactFunction}
              searchAndLinkContact = {searchAndLinkContact}
            />
          </div>
          <div className="bg-[#343541] flex flex-col justify-start items-center h-full w-[80%]">
            <div className="border-b-[1px] border-[#646464] flex flex-col justify-center items-center h-[8%] w-full">
              <UpBar channelName={channelName} />
            </div>
            {activeChannel ? (
              <>
                <div className="border-b-[1px] border-[#646464] bg-[#343541] flex flex-col justify-start items-start h-[82%] w-full mt-2 overflow-y-scroll scrollbar">
                  <BodyMessage
                    messageBody={messageBody}
                    anchor={anchor}
                    user={user.email}
                    activeChannel={activeChannel}
                  />
                </div>
                <div className=" bg-[#343541] flex flex-col justify-center items-center h-[10%] w-full">
                  <SendMessage
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
