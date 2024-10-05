const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const pool = require('../modules/pool.js');
// const express = require('express');
// const router = express.Router();
// const pool = require('../modules/pool.js');

// PUT /gallery/like/:id
router.put('/like/:id', (req, res) => {
  console.log('PUT /api/like/:id received a request');

  const sqlText = `
    UPDATE "gallery"
	    SET "likes" = "likes" + 1
	    WHERE "id" = $1;
  `;

  const sqlValues = [req.params.id];

  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('Database error in PUT /api/gallery/:id', dbErr);
      res.sendStatus(500);
    })
});

// GET /gallery
router.get('/', (req, res) => {
  console.log('GET /api/gallery received a request');

  const sqlText = `
    SELECT * FROM "gallery"
      ORDER BY "id";
  `;

  pool.query(sqlText)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('Database error in GET /api/gallery: ', dbErr);
      res.sendStatus(500);
    })

});

module.exports = router;
