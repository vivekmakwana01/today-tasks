import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signInWithGoogle: {
    marginBottom: theme.spacing(2),
  },
  alert: {
    width: "100%",
    marginTop: 16,
  },
  buttonSpinner: {
    color: "white",
  },
}));

export default function SignIn() {
  const { signInWithEmailAndPassword, signInWithPopup } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const [alert, setAlert] = useState({
    severity: "",
    content: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: false,
    password: false,
  });

  const changeInput = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    let error = false;
    let errorCopy = formError;
    Object.keys(formData).map((key) => {
      if (!formData[key]) {
        error = true;
        errorCopy = { ...errorCopy, [key]: true };
      } else {
        errorCopy = { ...errorCopy, [key]: false };
      }
      return true;
    });
    setFormError(errorCopy);
    if (!error) {
      setDisabled(true);
      setAlert({
        severity: "info",
        content: "Logging in...",
      });
      const res = await signInWithEmailAndPassword(formData);
      setDisabled(false);
      if (res.success) {
        setAlert({
          severity: "success",
          content: "Login success. Redirecting to Home page",
        });
        history.push("/");
      } else {
        setAlert({
          severity: "error",
          content: res.data.message,
        });
      }
    }
  };

  const handleLogin = async () => {
    setDisabled(true);
    setAlert({
      severity: "info",
      content: "Logging in...",
    });
    const res = await signInWithPopup();
    setDisabled(false);
    if (res.success) {
      setAlert({
        severity: "success",
        content: "Login success. Redirecting to Home page",
      });
      history.push("/");
    } else {
      if (res.data.code === "auth/popup-closed-by-user") {
        setAlert({
          severity: "error",
          content: "Login popup closed by user",
        });
      } else {
        setAlert({
          severity: "error",
          content: "Something went wrong!",
        });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {alert.severity && (
          <Alert severity={alert.severity} className={classes.alert}>
            {alert.content}
          </Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoFocus
            onChange={changeInput}
            error={formError.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={changeInput}
            error={formError.password}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
          >
            Sign In
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.signInWithGoogle}
            onClick={handleLogin}
            disabled={disabled}
          >
            Sign In with Google
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("signup");
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
