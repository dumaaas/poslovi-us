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
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function clientCms() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");
  const [id, setId] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const clients = useSelector((state) => state.clients);
  const [isExpanded, setIsExpanded] = useState(false);
  const [clientsTemp, setClientsTemp] = useState([]);
  const [search, setSearch] = useState("");
  const isJobLoading = useSelector((state) => state.isJobLoading);

  useEffect(() => {
    if (!clients.length) {
      getClientData();
    } else {
      setClientsTemp(clients);
    }
  }, []);

  useEffect(() => {
    filterClients();
  }, [search]);

  const getClientData = async () => {
    dispatch({ type: "SET_IS_JOB_LOADING", payload: true });
    const querySnapshot = await getDocs(collection(db, "clients"));
    var tempData = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tempData.push({
        id: doc.id,
        name: doc.data().title,
        url: doc.data().url,
        link: doc.data().link,
        published_at: doc.data().published_at,
      });
    });
    dispatch({ type: "SET_IS_JOB_LOADING", payload: false });
    dispatch({ type: "SET_CLIENTS", payload: tempData });
    setClientsTemp(tempData);
  };

  const deleteClient = (id) => {
    const docRef = doc(db, "clients", id);

    deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
        handleSnackBarOpen();
        getClientData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openUpdateClient = async (id) => {
    setIsExpanded(true);
    const docRef = doc(db, "clients", id);
    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      const doc = await getDoc(docRef);
      setIsEdit(true);
      setName(doc.data().title);
      setUrl(doc.data().url);
      setLink(doc.data().link);
      setId(id);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };

  const updateClient = async () => {
    const docRef = doc(db, "clients", id);
    const data = {
      title: name,
      link: link,
      url: url,
    };
    updateDoc(docRef, data)
      .then((docRef) => {
        clearForm();
        getClientData();
        handleSnackBarOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterClients = () => {
    const filteredClients = [];
    var clientsToFilter = [...clients];
    for (const client of clientsToFilter) {
      if (client.name.toLowerCase().includes(search.toLowerCase())) {
        filteredClients.push(client);
      }
    }
    setClientsTemp(filteredClients);
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
    setUrl("");
    setLink("");
    setId("");
    setIsEdit(false);
    setIsExpanded(false);
  };

  const saveClient = async () => {
    setIsDisabled(true);
    var docData = {
      title: name,
      url: url,
      link: link,
      published_at: Timestamp.fromDate(new Date()),
    };
    await addDoc(collection(db, "clients"), docData).then(() => {
      getClientData();
      handleSnackBarOpen();
      setIsDisabled(false);
      clearForm();
    });
  };

  const columns = [
    { id: "name", label: "Ime", minWidth: 170 },
    { id: "url", label: "Logo", minWidth: 100 },
    {
      id: "link",
      label: "Link",
      minWidth: 170,
    },
    {
      id: "published_at",
      label: "Datum objavljivanja",
      minWidth: 100,
      format: "date",
    },
  ];

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
      <Accordion className="mt-[40px]" expanded={isExpanded}>
        <AccordionSummary
          expandIcon={<FontAwesomeIcon icon="fa-solid fa-angle-down" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p>Klijent forma</p>
        </AccordionSummary>
        <AccordionDetails className="w-full">
          <div className="w-full">
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
                <TextField
                  id="outlined-basic"
                  label="Link"
                  variant="outlined"
                  className="flex-[45%]"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </Box>
            <div className="mt-[20px] flex flex-row gap-[10px]">
              <Button
                disabled={isDisabled}
                onClick={isEdit ? updateClient : saveClient}
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
          Prikaz klijenata
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
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientsTemp.length > 0 &&
              clientsTemp
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column, index) => {
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
                            onClick={() => openUpdateClient(row.id)}
                          />
                          <FontAwesomeIcon
                            className="text-[#334155] cursor-pointer"
                            icon="trash"
                            onClick={() => deleteClient(row.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {clientsTemp.length < 1 && !isJobLoading && (
        <Typography className="flex items-center justify-center w-[140px] rounded-[8px] mx-[auto!important] text-center my-[10px!important] px-[12px] py-[8px] bg-red-500 text-white">
          Nema rezultata.
        </Typography>
      )}
      {clientsTemp.length < 1 && isJobLoading && (
        <FontAwesomeIcon
          icon="fa-solid fa-spinner"
          className="text-[30px] spin-anim flex items-center justify-center mx-auto text-red-500 py-[20px]"
        />
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={clientsTemp.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
