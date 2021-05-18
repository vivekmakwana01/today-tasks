import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { blue, green, pink, yellow } from "@material-ui/core/colors";
import { DeleteOutlined } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  // test: {
  //   border: (note) => {
  //     if (note.category === "work") {
  //       return "1px solid red";
  //     }
  //   },
  // },
  avatar: {
    backgroundColor: (note) => {
      if (note.category === "work") {
        return yellow[700];
      } else if (note.category === "money") {
        return green[500];
      } else if (note.category === "todos") {
        return pink[500];
      } else {
        return blue[500];
      }
    },
  },
});

export default function NoteCard({ note, deleteHandler }) {
  const classes = useStyles(note);
  return (
    <div>
      <Card className={classes.test}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => deleteHandler(note._id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
