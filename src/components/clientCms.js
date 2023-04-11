import { Box, TextField, Button } from "@material-ui/core";
import { useState } from "react";

export default function clientCms() {
  const [value, setValue] = useState("");
  const handleChange = () => {
    console.log("change");
  };
  return (
    <div>
      <h2 className="text-[32px] leading-[40px] text-[#334155] font-bold">
        Klijenti
      </h2>
      <div className="mt-[40px]">
        <Box component="form" noValidate autoComplete="off">
          <div className="flex flex-row justify-between gap-[20px] flex-wrap">
            <TextField
              id="outlined-basic"
              label="Ime kompanije"
              variant="outlined"
              className="flex-[45%]"
            />
            <TextField
              id="outlined-basic"
              label="URL slike"
              variant="outlined"
              className="flex-[45%]"
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
