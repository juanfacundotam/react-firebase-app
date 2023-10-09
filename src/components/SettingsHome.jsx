import React, { useEffect, useState, useRef } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useAuth } from "../context/authContext";
import iconImage from "../assets/logoloro.png";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
export default function SettingsHome({
  nickName,
  estado,
  image,
  setDatos,
  settingsHandler,
  getImage,
  getDatos,
  setLoadSpinner,
  datos,
}) {
  const { user, logout, loading, searchOrCreateDocument, addNewImage, addDatos } =
    useAuth();
  const [editImage, setEditImage] = useState(false);
  const [datosUpdated, setDatosUpdated] = useState({
    nickName: datos.nickName,
    estado: datos.estado,
  });

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);



  // const ImageInputChangeHandler = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);
  //   setEditImage(file);
  // };



  const ImageInputChangeHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async () => {
        const image = new Image();
        image.src = reader.result;

        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Define el nuevo tamaño de la imagen (ajusta según sea necesario)
          const maxWidth = 800;
          const maxHeight = 600;
          let newWidth = image.width;
          let newHeight = image.height;

          if (newWidth > maxWidth) {
            newWidth = maxWidth;
            newHeight = (image.height * maxWidth) / image.width;
          }

          if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = (image.width * maxHeight) / image.height;
          }

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(image, 0, 0, newWidth, newHeight);

          // Convierte el lienzo a WebP (puedes ajustar la calidad según tus necesidades)
          canvas.toBlob(async (blob) => {
            const webpFile = new File([blob], `image.webp`, {
              type: 'image/webp',
            });
            // setConvertedFile(webpFile);
            setSelectedFile(webpFile);
            setEditImage(webpFile);
            console.log(webpFile)
          }, 'image/webp', 0.7);
        };
      };

      reader.readAsDataURL(file);
    }

    // Puedes hacer algo con el archivo seleccionado aquí si lo deseas.
  };

  const changeInputDatosHandler = (e) => {
    setDatosUpdated({ ...datosUpdated, [e.target.name]: e.target.value });
  };

  const setChangesSubmit = async () => {
    setLoadSpinner(true);
    settingsHandler();
    if (selectedFile) {
      // await deleteNewImage(user.email, selectedFile);
      await addNewImage(user.email, selectedFile);
      await getImage();
    }
    if (
      (datosUpdated.nickName.trim() !== "" && datosUpdated.nickName !== datos.nickName) ||
      (datosUpdated.estado.trim() !== "" && datosUpdated.estado !== datos.estado)
      ) {
        await addDatos(datosUpdated)
        await getDatos();
    }

    setLoadSpinner(false);
  };

  const divImageEditHandler = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="absolute expand-diagonal flex flex-col justify-center items-center bg-[#202123] right-8 top-8 w-[16rem] h-[16rem] border-[1px] border-[#ffffff2d] rounded-lg z-50 overflow-hidden gap-2">
      <div className="flex flex-col justify-center items-start w-[80%]">
        <label
          htmlFor="email"
          className="block mb-2 text-sm  text-gray-900 font-light dark:text-white"
        >
          NickName
        </label>
        <input
          type="text"
          name="nickName"
          maxLength="25"
          defaultValue={nickName}
          onChange={changeInputDatosHandler}
          placeholder="Edita tu NickName"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div className="flex flex-col justify-center items-start w-[80%]">
        <label
          htmlFor="email"
          className="block mb-2 text-sm  text-gray-900 font-light dark:text-white"
        >
          Estado
        </label>
        <input
          type="text"
          name="estado"
          maxLength="31"
          defaultValue={estado}
          onChange={changeInputDatosHandler}
          placeholder="Edita tu Estado"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div className="flex justify-around items-center w-[80%] gap-5 mt-4">
        <div className="group relative w-16 h-16 bg-[#1b1b1b] rounded-full overflow-hidden  ">
          <div
            className="absolute flex justify-center items-start -bottom-[127%] -right-2  w-20 h-20 bg-[#0de4f36c] border-[1px] border-gray-600 rounder-full z-50 group-hover:-translate-y-8 transition-transform duration-500 ease-in-out cursor-pointer "
            onClick={divImageEditHandler}
          >
            <AddAPhotoIcon
              sx={{
                fontSize: 20,
                cursor: "pointer",
                color: "white",
                marginTop: 0.3,
              }}
            />
          </div>
          <img
            src={(selectedFile && URL.createObjectURL(selectedFile)) || image}
            className="w-16 h-16 rounded-full z-1"
            alt=""
          />
        </div>
        <div className="flex  justify-center items-start gap-5 text-[#cac7c7]">
          <CloseIcon
            sx={{
              fontSize: 25,
              cursor: "pointer",
              color: "#ad4343",
              border: "1px solid #cac7c7",
              borderRadius: "5px",
              "&:hover": {
                color: "#ff3838",
                border: "1px solid white",
              },
            }}
            onClick={settingsHandler}
          />
          <CheckIcon
            sx={{
              fontSize: 25,
              cursor: "pointer",
              color: "#55a046",
              border: "1px solid #cac7c7",
              borderRadius: "5px",
              "&:hover": {
                color: "#65ff46",
                border: "1px solid white",
              },
            }}
            onClick={setChangesSubmit}
          />
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={ImageInputChangeHandler}
      />
    </div>
  );
}
