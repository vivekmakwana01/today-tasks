import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import Masonry from "react-masonry-css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../hooks/useAuth";

const useStyles = makeStyles({
  svg: {
    width: 128,
    color: "#ddd",
  },
  no_notes: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  skeleton: {
    margin: 10,
  },
  container: {
    maxWidth: 1200,
    height: "calc(100vh - 112px)",
    overflow: "auto",
  },
});

export default function Notes() {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const deleteHandler = async (_id) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:8000/notes/${_id}`,
      });
      const newNotes = notes.filter((note) => note._id !== _id);
      setNotes(newNotes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: `http://localhost:8000/notes/${user.uid}`,
      }).then((res) => {
        setLoading(false);
        if (res.data.length !== 0) {
          setNotes(res.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [user.uid]);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container className={classes.container}>
      {loading ? (
        <Grid container spacing={5} justify="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton height={200} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton height={200} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton height={200} />
          </Grid>
        </Grid>
      ) : notes.length !== 0 ? (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((note) => (
            <div key={note._id}>
              <NoteCard note={note} deleteHandler={deleteHandler} />
            </div>
          ))}
        </Masonry>
      ) : (
        <div className={classes.no_notes}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classes.svg}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <Typography variant="h5" color="textSecondary">
            Notes you add appear here
          </Typography>
        </div>
      )}
    </Container>
  );
}
