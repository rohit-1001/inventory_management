import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const ShowInfo = (props) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleOpen = async () => {
    try {
      const c = await axios.post(
        "/getinfo",
        { email: props.email },
        {
          withCredentials: true,
        }
      );
      const { name, email, phone } = c.data.details;
      setInfo({ name, email, phone });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured");
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    borderRadius: "8px",
    padding: "20px",
  };

  return (
    <div>
      {/* <TextField className="form-control-plaintext" onClick={handleOpen}>
        {props.email}
      </TextField> */}
      <Typography
        style={{ color: "#1976d2", cursor: "pointer" }}
        onClick={handleOpen}
      >
        {props.email}
      </Typography>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle}>
          <div className="mb-2 row">
            <div className="mb-2 row">
              <div className="col-auto">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value="Name "
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={info.name}
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="mb-2 row">
              <div className="col-auto">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value="Email "
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  defaultValue={info.email}
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="mb-2 row">
              <div className="col-auto">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value="Phone "
                />
              </div>
              <div className="col-auto">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone"
                  defaultValue={info.phone}
                  readOnly
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShowInfo;
