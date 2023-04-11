import { Box, TextField, Button, FormLabel, Snackbar } from "@material-ui/core";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";

export default function blogCms() {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [url, setUrl] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const editorRef = useRef(null);

  const handleSnackBarOpen = () => {
    setShowSnackbar(true);
  };

  const handleSnackBarClose = () => {
    setShowSnackbar(false);
  };

  const clearForm = () => {
    setTitle("");
    setShortDesc("");
    setUrl("");
    editorRef.current.setContent("");
  };

  const saveBlog = async () => {
    setIsDisabled(true);
    var docData = {
      title: title,
      short_desc: shortDesc,
      url: url,
      content: editorRef.current ? editorRef.current.getContent() : "",
      published_at: Timestamp.fromDate(new Date()),
    };
    await addDoc(collection(db, "blogs"), docData).then(() => {
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
        Vesti
      </h2>
      <div className="mt-[40px]">
        <Box component="form" noValidate autoComplete="off">
          <div className="flex flex-row justify-between gap-[20px] flex-wrap">
            <TextField
              id="outlined-basic"
              label="Naziv objave"
              variant="outlined"
              className="flex-[45%]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="URL slike"
              variant="outlined"
              className="flex-[45%]"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Kratki opis"
              variant="outlined"
              className="flex-[100%]"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
            />
          </div>
          <div className="mt-[20px] flex flex-col gap-[2px]">
            <FormLabel
              id="demo-radio-buttons-group-label"
              className="mb-[15px]"
            >
              Sadržaj
            </FormLabel>
            <Editor
              apiKey="3g4bxjjckov07ymyx17x5n0p8wcwjdf1dl5ic88qad0v2ad4"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
              init={{
                branding: false,
                height: 400,
                menubar: true,
                plugins:
                  "preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount",
                toolbar:
                  "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                image_advtab: true,
              }}
            />
          </div>
        </Box>
        <div className="mt-[20px]">
          <Button
            disabled={isDisabled}
            onClick={saveBlog}
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
