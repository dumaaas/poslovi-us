import {
  Box,
  TextField,
  Snackbar,
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
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { cities } from "@/helpers/staticData";

export default function jobsCms() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [offerType, setOfferType] = useState("offer");
  const [featured, setFeatured] = useState(false);
  const [featuredPlus, setFeaturedPlus] = useState(false);

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
    setName("");
    setShortDesc("");
    setUrl("");
    setEmail("");
    setPosition("");
    setSalary("");
    setLocation("");
    setOfferType("offer");
    setJobType("");
    setFeatured(false);
    setFeaturedPlus(false);
    editorRef.current.setContent("");
  };

  const saveJob = async () => {
    setIsDisabled(true);
    var docData = {
      name: name,
      short_desc: shortDesc,
      url: url,
      content: editorRef.current ? editorRef.current.getContent() : "",
      published_at: Timestamp.fromDate(new Date()),
      email: email,
      position: position,
      salary: salary,
      location: location,
      offer_type: offerType,
      job_type: jobType,
      featured: featured,
      featured_plus: featuredPlus,
    };
    await addDoc(collection(db, "jobs"), docData).then(() => {
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
        Oglasi
      </h2>
      <div className="mt-[40px]">
        <Box component="form" noValidate autoComplete="off">
          <div className="flex flex-row justify-between gap-[20px] flex-wrap">
            <TextField
              id="outlined-basic"
              label="Ime"
              variant="outlined"
              className="flex-[30%]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="flex-[30%]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Naziv pozicije"
              variant="outlined"
              className="flex-[30%]"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Plata"
              variant="outlined"
              className="flex-[30%]"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <Select
              labelId="demo-simple-select-label"
              variant="outlined"
              id="demo-simple-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-[30%]"
              placeholder="Lokacija"
            >
              {cities.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              id="outlined-basic"
              label="Tip posla"
              variant="outlined"
              className="flex-[30%]"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="URL slike"
              variant="outlined"
              className="flex-[100%]"
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
                  defaultValue="offer"
                  name="radio-buttons-group"
                  value={offerType}
                  onChange={(e) => setOfferType(e.target.value)}
                >
                  <FormControlLabel
                    value="offer"
                    control={<Radio />}
                    label="Ponuda"
                  />
                  <FormControlLabel
                    value="offering"
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                    />
                  }
                  label="Izdvojeni"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={featuredPlus}
                      onChange={(e) => setFeaturedPlus(e.target.checked)}
                    />
                  }
                  label="Izdvojeni +"
                />
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
          <Button onClick={saveJob} color="primary" variant="contained">
            Sačuvaj
          </Button>
        </div>
      </div>
    </div>
  );
}
