import { Box, TextField, Button, FormLabel } from "@material-ui/core";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function blogCms() {
  const [value, setValue] = useState("");
  const handleChange = () => {
    console.log("change");
  };
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div>
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
            />
            <TextField
              id="outlined-basic"
              label="URL slike"
              variant="outlined"
              className="flex-[45%]"
            />
            <TextField
              id="outlined-basic"
              label="Kratki opis"
              variant="outlined"
              className="flex-[100%]"
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
          <Button color="primary" variant="contained">
            Sačuvaj
          </Button>
        </div>
      </div>
    </div>
  );
}
