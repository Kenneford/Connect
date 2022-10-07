const express = require("express");
const router = express.Router();

const {
  year1990,
  year1991,
  year1992,
  year1993,
  year1994,
  year1995,
  year1996,
  year1997,
  year1998,
  year1999,
  year2000,
  year2001,
  year2002,
  year2003,
  year2004,
  year2005,
  year2006,
  year2007,
  year2008,
  year2009,
  year2010,
  year2011,
  year2012,
  year2013,
  year2014,
  year2015,
  year2016,
  year2017,
  year2018,
  year2019,
  year2020,
  year2021,
  year2022,
  year2023,
} = require("../controllers/rooms");

router.get("/2006", async (req, res) => {
  res.send(await year2006());
});

router.get("/2007", async (req, res) => {
  res.send(await year2007());
});

router.get("/2019", async (req, res) => {
  res.send(await year2019());
});

module.exports = router;
