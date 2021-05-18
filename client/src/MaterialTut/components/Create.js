import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { KeyboardArrowRight } from "@material-ui/icons";
import { useHistory } from "react-router";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Alert from "@material-ui/lab/Alert";

let url = "";
if (process.env.NODE_ENV === "production") {
  url = "https://today-tasks-1412.herokuapp.com/";
} else {
  url = "http://localhost:8000/";
}

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  spinner: {
    marginRight: 10,
  },
});

export default function Create() {
  const history = useHistory();

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    severity: "",
    content: "",
  });

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }

    if (title && details) {
      try {
        setLoading(true);
        setAlert({
          severity: "info",
          content: "Creating a note...",
        });
        const res = await axios.post(`${url}notes`, {
          title: title,
          details: details,
          category: category,
          uid: user.uid,
        });
        if (res.data.success) {
          setAlert({
            severity: "success",
            content: "New note created.",
          });
          history.push("/");
        } else {
          setAlert({
            severity: "error",
            content: "Something went wrong!",
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>
      {alert.severity && (
        <Alert severity={alert.severity}>{alert.content}</Alert>
      )}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          error={titleError}
          required
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          multiline
          rows="4"
          error={detailsError}
          required
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          className={classes.btn}
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<KeyboardArrowRight />}
          disabled={loading ? true : null}
        >
          {loading && (
            <CircularProgress
              color="inherit"
              size={20}
              className={classes.spinner}
            />
          )}
          Submit
        </Button>
      </form>
    </Container>
  );
}
