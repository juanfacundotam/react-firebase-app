import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Channels from "../components/ChatContainers/Channels";
import UpBar from "../components/ChatContainers/UpBar";
import BodyMessage from "../components/ChatContainers/BodyMessage";
import SendMessage from "../components/ChatContainers/SendMessage";
import Spinner from "../components/spinner";

const messageData = [{name: "General", category: "channel",  message: []}, {name: "Ciclismo", category: "channel", message: []}, , {name: "Juan Pedro", category: "contact", message: []}]


export default function Chat() {

  const channelsFiltered = messageData.filter(channel => channel.category === "channel")
  const contactFiltered = messageData.filter(channel => channel.category === "contact")

  console.log(channelsFiltered)
  console.log(contactFiltered)

  const anchor = useRef();
  const { user, logout, loading, searchOrCreateDocument, searchOrCreateImage } =
    useAuth();
  useEffect(() => {
    getImage();
    getDatos();
  }, []);

  const [activeChannel, setActiveChannel] = useState("");
  const [loadSpinner, setLoadSpinner] = useState(true);
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const [channelMessageArray, setChannelMessageArray] = useState([]);
  const [contactMessageArray, setContactMessageArray] = useState([]);
  const [image, setImage] = useState("");
  const [datos, setDatos] = useState({
    user: user.email,
    nickName: "NickName",
    estado: "Estado",
    image: image,
  });


console.log(activeChannel)


  async function SetMessageArrayFunction() {}

  async function getDatos() {
    const datosSearched = await searchOrCreateDocument(user.email);
    console.log(datosSearched);
    setDatos(datosSearched);
    setLoadSpinner(false);
  }
  async function getImage() {
    setImage(await searchOrCreateImage(user.email, user.photoURL));
  }

  console.log(messageArray);
  return (
    <div className="flex justify-center items-center h-screen relative">
      {loadSpinner ? (
        <Spinner />
      ) : (
        <>
          <div className="bg-[#202123] flex flex-col justify-start items-center h-full w-[20%]">
            <Channels  setActiveChannel={setActiveChannel} channelsFiltered={channelsFiltered} contactFiltered={contactFiltered}/>
          </div>
          <div className="bg-[#343541] flex flex-col justify-start items-center h-full w-[80%]">
            <div className="border-b-[1px] border-[#646464] flex flex-col justify-center items-center h-[8%] w-full">
              <UpBar activeChannel={activeChannel}/>
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
