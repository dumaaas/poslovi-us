import {
  Box,
  TextField,
  FormGroup,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
export default function jobsCms() {
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
        Oglasi
      </h2>
      <div className="mt-[40px]">
        <Box component="form" noValidate autoComplete="off">
          <div className="flex flex-row justify-between gap-[20px] flex-wrap">
            <TextField
              id="outlined-basic"
              label="Ime kompanije/Ime prezime"
              variant="outlined"
              className="flex-[30%]"
            />
            <TextField
              id="outlined-basic"
              label="Email kompanije/klijenta"
              variant="outlined"
              className="flex-[30%]"
            />
            <TextField
              id="outlined-basic"
              label="Naziv pozicije"
              variant="outlined"
              className="flex-[30%]"
            />
            <TextField
              id="outlined-basic"
              label="Plata"
              variant="outlined"
              className="flex-[30%]"
            />
            <Select
              labelId="demo-simple-select-label"
              variant="outlined"
              id="demo-simple-select"
              value={value}
              onChange={handleChange}
              className="flex-[30%]"
              placeholder="Lokacija"
            >
              <MenuItem value={10}>Niksic</MenuItem>
              <MenuItem value={20}>Podgorica</MenuItem>
              <MenuItem value={30}>Berane</MenuItem>
            </Select>
            <TextField
              id="outlined-basic"
              label="Tip posla"
              variant="outlined"
              className="flex-[30%]"
            />
            <TextField
              id="outlined-basic"
              label="URL slike"
              variant="outlined"
              className="flex-[100%]"
            />
            <TextField
              id="outlined-basic"
              label="Kratki opis"
              variant="outlined"
              className="flex-[100%]"
            />
            <div className="flex flex-row gap-[20px] flex-wrap flex-[100%]">
              <FormControl className="flex-[45%]">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className="mb-[15px]"
                >
                  Tip oglasa
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Ponuda"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Potražnja"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className="flex-[45%]">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className="mb-[15px]"
                >
                  Dodatne opcije
                </FormLabel>
                <FormControlLabel control={<Checkbox />} label="Izdvojeni" />
                <FormControlLabel control={<Checkbox />} label="Izdvojeni +" />
              </FormControl>
            </div>
          </div>
          <div className="mt-[15px] flex flex-col gap-[8px]">
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
          <Button onClick={log} color="primary" variant="contained">
            Sačuvaj
          </Button>
        </div>
      </div>
    </div>
  );
}
