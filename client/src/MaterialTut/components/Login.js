import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/useAuth";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  const { signInWithPopup } = useAuth();

  const handleLogin = async () => {
    setDisabled(true);
    const res = await signInWithPopup();
    if (res) {
      console.log("true");
      setDisabled(false);
      history.push("/");
    }
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={handleLogin} disabled={disabled}>
        Log In with Google
      </Button>
    </div>
  );
};

export default Login;
