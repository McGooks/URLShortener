import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import URLContext from "../../context/url/urlContext";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& > *": {
      fontSize: "40px",
      marginTop: theme.spacing(3),
    },
    minWidth: 600,
    fontColor: "Black",
  },
}));

const Search = () => {
  const classes = useStyles();
  const urlContext = useContext(URLContext);
  const { current, loading } = urlContext;

  useEffect(() => {
    if (current !== null) {
      setUrl(current);
    } else {
      setUrl({
        shortenedUrl: "",
      });
    }
  }, [urlContext, current]);

  const [url, setUrl] = useState({
    shortenedUrl: "",
  });

  return (
    <>
      {current !== null && !loading ? (
        <Typography variant="h3" className={classes.textField}>
          Your URL is: {url.shortenedUrl}
        </Typography>
      ) : (
        ""
      )}
    </>
  );
};

export default Search;
