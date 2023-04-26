import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import {TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addNewRepo } from "../features/selectRepo";
import Button from "@mui/material/Button/Button";
import { colors } from "../utils/colors";
import { checkingRepoURL } from "../services/checkingRepoURL";

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: colors.MAIN_BACKGROUND
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50vw',
  },
  input: {
    width: '40vw',
  },
  button: {
    height: 40,
    width: '8vw'
  },
  inputForm: {
    height: 100,
    display: 'flex',
    alignItems: 'center',
  },
}))

type Props = {
  setErrorUrl: React.Dispatch<React.SetStateAction<string | null>>
};

export const SearchBar:React.FC<Props> = ({setErrorUrl}) => {
  const [query, setQuery] = useState('');
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const queryHandler = (event: any) => {
    setQuery(event.target.value);
  }

  const handlerSelectURL = () => {
    const response = checkingRepoURL(query);
    if (response.includes('ERROR:')) {
      setErrorUrl(response);

      return;
    }
    setErrorUrl(null);
    dispatch(addNewRepo(response));
  }

  return (
    <Box className={classes.container}>
      <form
        className={classes.inputForm}
        onSubmit={(event) => {
          event.preventDefault();
          handlerSelectURL();
        }} 
      >
        <Box className={classes.inputContainer}>
          <TextField
            className={classes.input}
            id="outlined-controlled"
            value={query}
            onSubmit={() => handlerSelectURL()}
            placeholder="Enter repo URL"
            onChange={queryHandler}
            InputProps={{
              style: { 
                height: 40,
                backgroundColor: colors.GREY_FOR_BUTTON,
                fontSize: 14,
                fontFamily: 'Roboto, sans-serif',
                color: colors.FONTS_COLOR,
                fontWeight: 500,
              },
            }}
          />
          <Button
            className={classes.button}
            variant="contained"
            type="submit"
          >
            Load Issues
          </Button>
        </Box>
      </form>
    </Box>
  )
}