import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  color: "white",
  borderRadius: "10px",
  p: 4,
};

export default function BasicModal({ setNewContactFunction, searchAndLinkContact }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewContactFunction(value);
  };

  const addContactHandler = () => {
    searchAndLinkContact()
    handleClose();
  };

  return (
    <div>
      <AddCircleIcon
        onClick={handleOpen}
        sx={{
          fontSize: 25,
          cursor: "pointer",
          marginLeft: 1,
          transition: "color 0.3s ease",
          "&:hover": {
            color: "grey",
          },
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-[20px] text-center">
            Agregar Email del Contacto
          </h1>
          <div className="flex flex-col justify-center items-center w-full mt-10">
            <input
              type="email"
              name="contact"
              placeholder="example@email.com"
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className="flex mt-10 justify-center gap-5">
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={handleClose}
            >
              Cerrar x
            </button>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={addContactHandler}
            >
              Agregar
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
