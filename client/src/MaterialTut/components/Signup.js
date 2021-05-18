import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: "100%",
    marginTop: 16,
  },
}));

export default function SignUp() {
  const { createUserWithEmailAndPassword } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const [alert, setAlert] = useState({
    severity: "",
    content: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const changeInput = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
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
        content: "Signing up...",
      });
      const res = await createUserWithEmailAndPassword(formData);
      setDisabled(false);
      if (res.success) {
        setAlert({
          severity: "success",
          content: "Sign up success. Redirecting to Home page",
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {alert.severity && (
          <Alert severity={alert.severity} className={classes.alert}>
            {alert.content}
          </Alert>
        )}
        <form className={classes.form} onSubmit={handleSignUp} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                autoFocus
                onChange={changeInput}
                error={formError.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={changeInput}
                error={formError.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                onChange={changeInput}
                error={formError.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={changeInput}
                error={formError.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/signin");
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
