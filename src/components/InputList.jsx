import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function InputList({addGoal}) {

    const[value, setValue] = useState("");

    const setGoal = (e) =>{
        setValue(e.target.value);
    }

    const clickHandler = () =>{
        addGoal(value);
        setValue("");
    }


  const theme = createTheme({
    palette: {
      primary: deepPurple, 
    },
  });
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <ThemeProvider theme={theme}>
          <TextField
            id="filled-basic"
            label="Goals"
            variant="filled"
            style={{ marginRight: "10px" }}
            onChange={setGoal}
            value={value}
          />
          <Button variant="contained" color="primary" onClick={clickHandler}>
            ADD
          </Button>
        </ThemeProvider>
      </div>
    </>
  );
}

export default InputList;
