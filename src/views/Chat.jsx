import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Channels from "../components/ChatContainers/Channels";
import UpBar from "../components/ChatContainers/UpBar";
import BodyMessage from "../components/ChatContainers/BodyMessage";
import SendMessage from "../components/ChatContainers/SendMessage";
import Spinner from "../components/spinner";

export default function Chat() {
  const anchor = useRef()

  const [loadSpinner, setLoadSpinner] = useState(true);
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const [datos, setDatos] = useState({
    nickName: "NickName",
    estado: "Estado",
  });
  const [image, setImage] = useState("");

  const { user, logout, loading, searchOrCreateDocument, searchOrCreateImage } =
    useAuth();
  useEffect( ( )  => {
    getImage();
    getDatos()
    
  }, []);


  async function SetMessageArrayFunction() {

  }

  async function getDatos() {
    const datosSearched = await searchOrCreateDocument(user.email);
    console.log(datosSearched);
    setDatos(datosSearched)
    setLoadSpinner(false);
  }
  async function getImage() {
    setImage(await searchOrCreateImage(user.email, user.photoURL));
  }

  console.log(messageArray)
  return (
    <div className="flex justify-center items-center h-screen relative">
      {loadSpinner ? (
        <Spinner />
      ) : (
        <>
          <div className="bg-[#202123] flex flex-col justify-start items-center h-full w-[20%]">
            <Channels />
          </div>
          <div className="bg-[#343541] flex flex-col justify-center items-center h-full w-[80%]">
            <div className="border-b-[1px] border-[#646464] flex flex-col justify-center items-center h-[8%] w-full">
              <UpBar />
            </div>
            <div className="border-b-[1px] border-[#646464] bg-[#343541] flex flex-col justify-start items-start h-[82%] w-full mt-2 overflow-y-scroll scrollbar"  >
              <BodyMessage messageArray={messageArray} anchor={anchor}/>
            </div>
            <div className=" bg-[#343541] flex flex-col justify-center items-center h-[10%] w-full">
              <SendMessage setMessage={setMessage} message={message} messageArray={messageArray} setMessageArray={setMessageArray}  datos={datos} user={user.email} image={image} anchor={anchor}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
