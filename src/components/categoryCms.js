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
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { categoryColumns } from "@/helpers/staticData";
import { getCategoryData } from "@/helpers/functions";

export default function categoryCms() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [page, setPage] = useState(0);
  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isExpanded, setIsExpanded] = useState(false);
  const [categoriesTemp, setCategoriesTemp] = useState([]);
  const [search, setSearch] = useState("");

  const categories = useSelector((state) => state.categories);
  const isJobLoading = useSelector((state) => state.isJobLoading);

  useEffect(() => {
    if (!categories.length) {
      getCategoryData(dispatch, setCategoriesTemp);
    } else {
      setCategoriesTemp(categories);
    }
  }, []);

  useEffect(() => {
    filterCategories();
  }, [search]);

  const deleteCategory = (id) => {
    const docRef = doc(db, "categories", id);
    deleteDoc(docRef)
      .then(() => {
        handleSnackBarOpen();
        getCategoryData(dispatch, setCategoriesTemp);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openUpdateCategory = async (id) => {
    setIsExpanded(true);
    const docRef = doc(db, "categories", id);
    try {
      const doc = await getDoc(docRef);
      setIsEdit(true);
      setName(doc.data().name);
      setId(id);
    } catch (e) {
      console.error("Error getting cached document:", e);
    }
  };

  const saveCategory = async () => {
    setIsDisabled(true);
    var docData = {
      name: name,
      published_at: Timestamp.fromDate(new Date()),
    };
    await addDoc(collection(db, "categories"), docData).then(() => {
      getCategoryData(dispatch, setCategoriesTemp);
      handleSnackBarOpen();
      setIsDisabled(false);
      clearForm();
    });
  };

  const updateCategory = async () => {
    const docRef = doc(db, "categories", id);
    const data = {
      name: name,
    };
    updateDoc(docRef, data)
      .then(() => {
        clearForm();
        getCategoryData(dispatch, setCategoriesTemp);
        handleSnackBarOpen();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filterCategories = () => {
    const filteredCategories = [];
    var categoriesToFilter = [...categories];
    for (const category of categoriesToFilter) {
      if (category.name.toLowerCase().includes(search.toLowerCase())) {
        filteredCategories.push(category);
      }
    }
    setCategoriesTemp(filteredCategories);
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
    setId("");
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
        Kategorije
      </h2>
      <Accordion className="mt-[40px]" expanded={isExpanded}>
        <AccordionSummary
          expandIcon={<FontAwesomeIcon icon="fa-solid fa-angle-down" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p>Kategorija forma</p>
        </AccordionSummary>
        <AccordionDetails className="w-full">
          <div className="w-full">
            <Box component="form" noValidate autoComplete="off">
              <div className="flex flex-row justify-between gap-[20px] flex-wrap">
                <TextField
                  id="outlined-basic"
                  label="Ime kategorije"
                  variant="outlined"
                  className="flex-[45%]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Box>
            <div className="mt-[20px] flex flex-row gap-[10px]">
              <Button
                disabled={isDisabled}
                onClick={isEdit ? updateCategory : saveCategory}
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
          Prikaz kategorija
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
              {categoryColumns.map((column, index) => (
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
            {categoriesTemp.length > 0 &&
              categoriesTemp
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {categoryColumns.map((column, index) => {
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
                          <FontAwesomeIcon
                            className="text-[#334155] cursor-pointer"
                            icon="pen-to-square"
                            onClick={() => openUpdateCategory(row.id)}
                          />
                          <FontAwesomeIcon
                            className="text-[#334155] cursor-pointer"
                            icon="trash"
                            onClick={() => deleteCategory(row.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {categoriesTemp.length < 1 && !isJobLoading && (
        <Typography className="flex items-center justify-center w-[140px] rounded-[8px] mx-[auto!important] text-center my-[10px!important] px-[12px] py-[8px] bg-red-500 text-white">
          Nema rezultata.
        </Typography>
      )}
      {categoriesTemp.length < 1 && isJobLoading && (
        <FontAwesomeIcon
          icon="fa-solid fa-spinner"
          className="text-[30px] spin-anim flex items-center justify-center mx-auto text-red-500 py-[20px]"
        />
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={categoriesTemp.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
