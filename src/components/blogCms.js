import {
  Box,
  TextField,
  Button,
  Snackbar,
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
  FormLabel,
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

import { getBlogData } from "@/helpers/functions";
import { blogColumns } from "@/helpers/staticData";

export default function blogCms() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [url, setUrl] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [id, setId] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const editorRef = useRef(null);
  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isExpanded, setIsExpanded] = useState(false);
  const [blogsTemp, setBlogsTemp] = useState([]);
  const [search, setSearch] = useState("");

  const blogs = useSelector((state) => state.blogs);
  const isJobLoading = useSelector((state) => state.isJobLoading);

  useEffect(() => {
    if (!blogs.length) {
      getBlogData(dispatch, setBlogsTemp);
    } else {
      setBlogsTemp(blogs);
    }
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [search]);

  const deleteBlog = (id) => {
    const docRef = doc(db, "blogs", id);
    deleteDoc(docRef)
      .then(() => {
        handleSnackBarOpen();
        getBlogData(dispatch, setBlogsTemp);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openUpdateBlog = async (id) => {
    setIsExpanded(true);
    const docRef = doc(db, "blogs", id);
    try {
      const doc = await getDoc(docRef);
      setIsEdit(true);
      setTitle(doc.data().title);
      setUrl(doc.data().url);
      setShortDesc(doc.data().short_desc);
      editorRef.current.setContent(doc.data().content);
      setId(id);
    } catch (e) {
      console.error("Error getting cached document:", e);
    }
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
      getBlogData(dispatch, setBlogsTemp);
      handleSnackBarOpen();
      setIsDisabled(false);
      clearForm();
    });
  };

  const updateBlog = async () => {
    const docRef = doc(db, "blogs", id);
    const data = {
      title: title,
      short_desc: shortDesc,
      content: editorRef.current ? editorRef.current.getContent() : "",
      url: url,
    };
    updateDoc(docRef, data)
      .then(() => {
        clearForm();
        getBlogData(dispatch, setBlogsTemp);
        handleSnackBarOpen();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filterBlogs = () => {
    const filterBlogs = [];
    var blogsToFilter = [...blogs];
    for (const blog of blogsToFilter) {
      if (blog.title.toLowerCase().includes(search.toLowerCase())) {
        filterBlogs.push(blog);
      }
    }
    setBlogsTemp(filterBlogs);
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
    setTitle("");
    setShortDesc("");
    setUrl("");
    editorRef.current.setContent("");
    setIsEdit(false);
    setIsExpanded(false);
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
      <Accordion className="mt-[40px]" expanded={isExpanded}>
        <AccordionSummary
          expandIcon={<FontAwesomeIcon icon="fa-solid fa-angle-down" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p>Vijesti forma</p>
        </AccordionSummary>
        <AccordionDetails className="w-full">
          <div className="w-full">
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
                  multiline
                  minRows={3}
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
            <div className="mt-[20px] flex flex-row gap-[10px]">
              <Button
                disabled={isDisabled}
                onClick={isEdit ? updateBlog : saveBlog}
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
          Prikaz vijesti
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
              {blogColumns.map((column, index) => (
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
            {blogsTemp.length > 0 &&
              blogsTemp
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {blogColumns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={index}>
                            {column.format
                              ? value.toDate().toLocaleDateString()
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <div className="flex items-center justify-start gap-[10px]">
                          <Link
                            href={`/singleBlog/${row.id}`}
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
                            onClick={() => openUpdateBlog(row.id)}
                          />
                          <FontAwesomeIcon
                            className="text-[#334155] cursor-pointer"
                            icon="trash"
                            onClick={() => deleteBlog(row.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {blogsTemp.length < 1 && !isJobLoading && (
        <Typography className="flex items-center justify-center w-[140px] rounded-[8px] mx-[auto!important] text-center my-[10px!important] px-[12px] py-[8px] bg-red-500 text-white">
          Nema rezultata.
        </Typography>
      )}
      {blogsTemp.length < 1 && isJobLoading && (
        <FontAwesomeIcon
          icon="fa-solid fa-spinner"
          className="text-[30px] spin-anim flex items-center justify-center mx-auto text-red-500 py-[20px]"
        />
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={blogsTemp.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
