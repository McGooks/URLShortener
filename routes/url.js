const express = require("express");
const config = require("config");
const DOMAIN = config.get("testURI");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { nanoid } = require("nanoid");
const UniResLo = require("../models/url");

//@route    POST /
//@desc     Add new ID to DB
//@access   Public
router.post(
  "/",
  [
    check("originalUrl", "Please enter a URL").not().isEmpty(),
    check("originalUrl", "Please enter a valid URL").isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false, disallow_auth: false }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: errors.array({ onlyFirstError: true })[0].msg });
    }
    const { originalUrl } = req.body;
    const URLCODE = nanoid(8);
    try {
      const newUrl = new UniResLo({
        originalUrl,
        shortenedUrl: DOMAIN + URLCODE,
        shortenedUrlCode: URLCODE,
      });
      const urls = await newUrl.save();
      res.status(200).json(urls);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

//@route    GET DOMAIN/nanoid
//@desc     Get URL
//@access   Public
router.get("/:id", async (req, res) => {
  const shortCode = req.params.id;
  try {
    const urls = await UniResLo.findOne({ shortenedUrlCode: shortCode });
    if (urls) {
      return res.redirect(urls.originalUrl);
    } else {
      return res.status(404).json("No Url found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
