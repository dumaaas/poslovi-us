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
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

import {
  collection,
  updateDoc,
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { jobTypeData, jobColumns } from "@/helpers/staticData";
import {
  getAllJobs,
  getCityData,
  getCategoryData,
  formatDate,
} from "@/helpers/functions";

export default function jobsCms() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [offerType, setOfferType] = useState("offer");
  const [featured, setFeatured] = useState(false);
  const [featuredPlus, setFeaturedPlus] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jobsTemp, setJobsTemp] = useState([]);
  const [search, setSearch] = useState("");

  const jobs = useSelector((state) => state.allJobs);
  const cities = useSelector((state) => state.cities);
  const categories = useSelector((state) => state.categories);
  const isJobLoading = useSelector((state) => state.isJobLoading);

  const editorRef = useRef(null);

  useEffect(() => {
    if (!jobs.length) {
      getAllJobs(dispatch, setJobsTemp);
    } else {
      setJobsTemp(jobs);
    }
    if (!cities.length) {
      getCityData(dispatch);
    }
    if (!categories.length) {
      getCategoryData(dispatch);
    }
  }, []);

  useEffect(() => {
    filterJobs();
  }, [search]);

  const deleteJob = (id) => {
    const docRef = doc(db, "jobs", id);
    deleteDoc(docRef)
      .then(() => {
        handleSnackBarOpen();
        getAllJobs(dispatch, setJobsTemp);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openUpdateJob = async (id) => {
    setIsExpanded(true);
    const docRef = doc(db, "jobs", id);
    try {
      const doc = await getDoc(docRef);
      setIsEdit(true);
      setName(doc.data().name);
      setUrl(doc.data().url);
      setId(id);
      setShortDesc(doc.data().short_desc);
      setEmail(doc.data().email);
      setPosition(doc.data().position);
      setSalary(doc.data().salary);
      setLocation(doc.data().location);
      setOfferType(doc.data().offer_type);
      setJobType(doc.data().job_type);
      setCategory(doc.data().category);

      setDateTo(formatDate(doc.data().date_to, true));
      setFeatured(doc.data().featured);
      setFeaturedPlus(doc.data().featured_plus);
      setIsRemote(doc.data().is_remote);
      editorRef.current.setContent(doc.data().content);
    } catch (e) {
      console.error("Error getting cached document:", e);
    }
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
      date_to: new Date(dateTo).getTime(),
      offer_type: offerType,
      job_type: jobType,
      featured: featured,
      featured_plus: featuredPlus,
      is_remote: isRemote,
    };
    await addDoc(collection(db, "jobs"), docData).then(() => {
      getAllJobs(dispatch, setJobsTemp);
      handleSnackBarOpen();
      setIsDisabled(false);
      clearForm();
    });
  };

  const updateJob = async () => {
    const docRef = doc(db, "jobs", id);
    const data = {
      name: name,
      short_desc: shortDesc,
      url: url,
      content: editorRef.current ? editorRef.current.getContent() : "",
      email: email,
      position: position,
      salary: salary,
      location: location,
      category: category,
      offer_type: offerType,
      date_to: new Date(dateTo).getTime(),
      job_type: jobType,
      featured: featured,
      featured_plus: featuredPlus,
      is_remote: isRemote,
    };
    updateDoc(docRef, data)
      .then(() => {
        clearForm();
        getAllJobs(dispatch, setJobsTemp);
        handleSnackBarOpen();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filterJobs = () => {
    const filteredJobs = [];
    var jobsToFilter = [...jobs];
    for (const job of jobsToFilter) {
      if (job.position.toLowerCase().includes(search.toLowerCase())) {
        filteredJobs.push(job);
      }
    }
    setJobsTemp(filteredJobs);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
    setCategory("");
    setDateTo("");
    setFeatured(false);
    setFeaturedPlus(false);
    setIsRemote(false);
    editorRef.current.setContent("");
    setIsExpanded(false);
    setIsEdit(false);
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
      <Accordion className="mt-[40px]" expanded={isExpanded}>
        <AccordionSummary
          expandIcon={<FontAwesomeIcon icon="fa-solid fa-angle-down" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p>Oglas forma</p>
        </AccordionSummary>
        <AccordionDetails className="w-full">
          <div className="w-full">
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
                <FormControl variant="outlined" className="flex-[30%]">
                  <InputLabel id="demo-simple-select-label">
                    Kategorija
                  </InputLabel>
                  <Select
                    variant="outlined"
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    value={category}
                    label="Kategorija"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className="flex-[30%]">
                  <InputLabel id="demo-simple-select-label">
                    Lokacija
                  </InputLabel>
                  <Select
                    variant="outlined"
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    value={location}
                    label="Lokacija"
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    {cities.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl variant="outlined" className="flex-[30%]">
                  <InputLabel id="demo-simple-select-label">
                    Tip posla
                  </InputLabel>
                  <Select
                    variant="outlined"
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    value={jobType}
                    label="Tip posla"
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    {jobTypeData.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <TextField
                  id="outlined-basic"
                  label="Plata"
                  variant="outlined"
                  className="flex-[30%]"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="URL slike"
                  variant="outlined"
                  className="flex-[30%]"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <TextField
                  id="date"
                  label="Važi do"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  variant="outlined"
                  className="flex-[30%]"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Kratki opis"
                  variant="outlined"
                  className="flex-[100%]"
                  value={shortDesc}
                  multiline
                  minRows={3}
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isRemote}
                          onChange={(e) => setIsRemote(e.target.checked)}
                        />
                      }
                      label="Remote"
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
            <div className="mt-[20px] flex flex-row gap-[10px]">
              <Button
                disabled={isDisabled}
                onClick={isEdit ? updateJob : saveJob}
                color="primary"
                variant="contained"
              >
                {isEdit ? "AŽURIRAJ" : "SAČUVAJ"}
              </Button>
              {isEdit && (
                <Button onClick={clearForm} color="primary" variant="contained">
                  CANCEL
                </Button>
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <div className="flex flex-wrap gap-[20px] items-center justify-between my-[40px]">
        <h2 className="text-[26px] leading-[34px] text-[#334155] font-bold ">
          Prikaz oglasa
        </h2>
        <div className="w-[350px] h-[40px] relative">
          <TextField
            size="small"
            id="outlined-basic"
            label="Pretraga"
            variant="outlined"
            className="w-full h-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon
            className="text-[#334155] absolute right-[20px] top-[50%] transform translate-y-[-50%] opacity-80"
            icon="search"
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {jobColumns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "800" }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ fontWeight: "800" }}>Akcije</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobsTemp.length > 0 &&
              jobsTemp
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {jobColumns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={index}
                            className={`${
                              column.format == "date2" &&
                              value < new Date().getTime()
                                ? "bg-red-100"
                                : ""
                            }`}
                          >
                            {column.format ? (
                              column.format === "date" ? (
                                value.toDate().toLocaleDateString()
                              ) : (
                                <div className="flex items-center justify-center gap-[8px]">
                                  <p
                                    className={`${
                                      column.format == "date2" &&
                                      value < new Date().getTime()
                                        ? "text-red-500 font-bold"
                                        : ""
                                    }`}
                                  >
                                    {formatDate(value)}
                                  </p>
                                  {column.format == "date2" &&
                                    value < new Date().getTime() && (
                                      <FontAwesomeIcon
                                        className="font-extrabold text-red-500 text-[22px]"
                                        icon="exclamation"
                                      />
                                    )}
                                </div>
                              )
                            ) : typeof value === "boolean" ? (
                              <FontAwesomeIcon
                                className={`${
                                  value ? "text-yellow-500" : "text-red-500"
                                }`}
                                icon={`${value ? "star" : "xmark"}`}
                              />
                            ) : value === "offer" || value === "offering" ? (
                              value === "offer" ? (
                                "Ponuda"
                              ) : (
                                "Potražnja"
                              )
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <div className="flex items-center justify-start gap-[10px]">
                          <Link
                            href={`/singleJob/${row.id}`}
                            target="_blank"
                            className="flex"
                          >
                            <FontAwesomeIcon
                              className="text-[#334155] cursor-pointer"
                              icon="eye"
                            />
                          </Link>
                          <FontAwesomeIcon
                            className="text-[#334155] cursor-pointer"
                            icon="pen-to-square"
                            onClick={() => openUpdateJob(row.id)}
                          />
                          <FontAwesomeIcon
                            className="text-[#334155] cursor-pointer"
                            icon="trash"
                            onClick={() => deleteJob(row.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {jobsTemp.length < 1 && !isJobLoading && (
        <Typography className="flex items-center justify-center w-[140px] rounded-[8px] mx-[auto!important] text-center my-[10px!important] px-[12px] py-[8px] bg-red-500 text-white">
          Nema rezultata.
        </Typography>
      )}
      {jobsTemp.length < 1 && isJobLoading && (
        <FontAwesomeIcon
          icon="fa-solid fa-spinner"
          className="text-[30px] spin-anim flex items-center justify-center mx-auto text-red-500 py-[20px]"
        />
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={jobsTemp.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
