import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Channels from "../components/ChatContainers/Channels";
import UpBar from "../components/ChatContainers/UpBar";
import BodyMessage from "../components/ChatContainers/BodyMessage";
import SendMessage from "../components/ChatContainers/SendMessage";
import Spinner from "../components/spinner";

const messageData = [
  { name: "General", category: "channel", message: [] },
  { name: "Ciclismo", category: "channel", message: [] },
  ,
  {
    date: "2023-09-25T19:51:24.320Z",
    estado: "Desarrollador apasionado",
    name: "Juan Pedro",
    category: "contact",
    message: "Hola, como estas?",
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-firebase-app-d4e2b.appspot.com/o/documentos%2Ffacutam%40gmail.com%2FfotoCV-removebg-preview.png?alt=media&token=c82358f0-946c-45e5-95b1-a769c73f3e7d",
    nickName: "Juan Facundo Tam",
    user: "facutam@gmail.com",
  },
  {
    date: "2023-09-25T19:51:24.320Z",
    estado: "Desarrollador apasionado",
    name: "Juan Pedro",
    category: "contact",
    message: "todo bien?",
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-firebase-app-d4e2b.appspot.com/o/documentos%2Ffacutam%40gmail.com%2FfotoCV-removebg-preview.png?alt=media&token=c82358f0-946c-45e5-95b1-a769c73f3e7d",
    nickName: "Juan Facundo Tam",
    user: "facutam@gmail.com",
  },
  {
    date: "2023-09-25T19:51:24.320Z",
    estado: "Desarrollador apasionado",
    name: "Juan Pedro",
    category: "contact",
    message: "Espero que si!",
    image:
      "https://firebasestorage.googleapis.com/v0/b/react-firebase-app-d4e2b.appspot.com/o/documentos%2Ffacutam%40gmail.com%2FfotoCV-removebg-preview.png?alt=media&token=c82358f0-946c-45e5-95b1-a769c73f3e7d",
    nickName: "Juan Facundo Tam",
    user: "facutam@gmail.com",
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
  const [messageArray, setMessageArray] = useState({});
  const [channelMessageArray, setChannelMessageArray] = useState([]);
  const [contactMessageArray, setContactMessageArray] = useState([]);
  const [image, setImage] = useState("");

  const anchor = useRef();
  const { user, logout, loading, searchOrCreateDocument, searchOrCreateImage } =
    useAuth();
  const [datos, setDatos] = useState({
    user: user.email,
    nickName: "NickName",
    estado: "Estado",
    image: image,
  });

  useEffect(() => {
    getImage();
    getDatos();
  }, []);

  useEffect(() => {
    let dataFiltered = messageData.filter(
      (item) => item.name === activeChannel
    );
    console.log(dataFiltered)
    // let messageFiltered = dataFiltered.length
    //   ? dataFiltered[0].message.map((item) => item)
    //   : [];
    // console.log(messageFiltered);
    setMessageArray(dataFiltered);
  }, [activeChannel]);
  console.log(messageArray);

  async function SetMessageArrayFunction() {}

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
                  <BodyMessage messageArray={messageArray} anchor={anchor} />
                </div>
                <div className=" bg-[#343541] flex flex-col justify-center items-center h-[10%] w-full">
                  <SendMessage
                    setMessage={setMessage}
                    message={message}
                    messageArray={messageArray}
                    setMessageArray={setMessageArray}
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
