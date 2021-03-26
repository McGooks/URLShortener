import React from "react";
import Search from "../../components/layouts/Search";
import ShortURL from "../../components/layouts/ShortURL";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    minHeight: "600px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container align="center" spacing={3}>
        <Grid item xs={12}>
          <Search />
          <ShortURL />
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
