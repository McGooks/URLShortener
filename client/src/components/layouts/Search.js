import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Box } from "@material-ui/core";
import URLContext from "../../context/url/urlContext";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& > *": {
      fontSize: "40px",
      margin: theme.spacing(1),
    },
    minWidth: 600,
  },
  textFieldButton: {
    "& > *": {
      fontSize: "20px",
    },
    margin: theme.spacing(1),
  },
}));

const Search = () => {
  const classes = useStyles();
  const urlContext = useContext(URLContext);
  const {
    urls,
    current,
    error,
    getShortUrl,
    addUrl,
    setCurrent,
    clearCurrent,
    clearUrls,
  } = urlContext;

  useEffect(() => {
    if (urls === null) {
      getShortUrl();
    } else {
      setCurrent(urls);
    }
    if (error) {
      setIsError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls]);

  const [urlString, setUrlString] = useState({
    originalUrl: "",
    shortenedUrl: "",
    shortenedUrlCode: "",
  });

  const [isDisabled, setIsDisabled] = useState({
    SurlThisButton: true,
  });

  const [isError, setIsError] = useState(false);

  const onClick = () => {
    addUrl(urlString);
  };

  const onClickReset = () => {
    clearCurrent();
    setUrlString({ originalUrl: "", shortenedUrl: "", shortenedUrlCode: "" });
    setIsDisabled({
      SurlThisButton: true,
    });
    clearUrls();
  };

  const onChange = (e) => {
    e.preventDefault();
    setUrlString({
      ...urlString,
      [e.target.name]: e.target.value,
    });
    setIsDisabled({
      SurlThisButton: false,
    });
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            error={isError}
            id="outlined-basic"
            label="Enter a URL"
            name="originalUrl"
            variant="outlined"
            value={urlString.originalUrl}
            className={classes.textField}
            onChange={(e) => onChange(e)}
            helperText={error}
          />
        </Box>
        <Button
          disabled={isDisabled.SurlThisButton}
          className={classes.textFieldButton}
          variant="contained"
          id="SurlThisButton"
          color="secondary"
          onClick={onClick}
        >
          SURL this
        </Button>
        <Button
          disabled={isDisabled.SurlThisButton}
          className={classes.textFieldButton}
          variant="contained"
          color="secondary"
          onClick={onClickReset}
        >
          Reset
        </Button>
      </form>
    </>
  );
};

export default Search;
