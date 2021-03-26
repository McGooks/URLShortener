import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import URLContext from "../../context/url/urlContext";

const Divert = (props) => {
  const { id } = useParams();
  const urlContext = useContext(URLContext);
  const {getOriginalUrl } = urlContext;

  useEffect(() => {
    getOriginalUrl(id);
  }, []);

  return (
    <>
      <p>Thank you for using SURL, redirecting you to your website</p>
    </>
  );
};

export default Divert;
