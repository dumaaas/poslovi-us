import { Box, TextField, Button, Snackbar } from "@material-ui/core";
import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
export default function clientCms() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSnackBarOpen = () => {
    setShowSnackbar(true);
  };

  const handleSnackBarClose = () => {
    setShowSnackbar(false);
  };

  const clearForm = () => {
    setName("");
    setUrl("");
  };

  const saveClient = async () => {
    setIsDisabled(true);
    var docData = {
      title: name,
      url: url,
      published_at: Timestamp.fromDate(new Date()),
    };
    await addDoc(collection(db, "clients"), docData).then(() => {
      handleSnackBarOpen();
      setIsDisabled(false);
      clearForm();
    });
  };

  return (
    <div>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
        message="Uspješno sačuvano!"
      />
      <h2 className="text-[32px] leading-[40px] text-[#334155] font-bold">
        Klijenti
      </h2>
      <div className="mt-[40px]">
        <Box component="form" noValidate autoComplete="off">
          <div className="flex flex-row justify-between gap-[20px] flex-wrap">
            <TextField
              id="outlined-basic"
              label="Ime klijenta"
              variant="outlined"
              className="flex-[45%]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="URL slike"
              variant="outlined"
              className="flex-[45%]"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </Box>
        <div className="mt-[20px]">
          <Button
            disabled={isDisabled}
            onClick={saveClient}
            color="primary"
            variant="contained"
          >
            Sačuvaj
          </Button>
        </div>
      </div>
    </div>
  );
}
