const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//GET a single candidate query
router.get('/candidate/:id',  (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//API to update parties
router.put('/candidate/:id', (req, res) => {
  const errors = inputCheck(req.body, 'party_id');
    if (errors) {
      res.status(400).json({ error: errors});
      return;
    }
    
  const sql = `UPDATE candidates SET party_id = ?
                WHERE id= ?`;
  const params = [req.body.party_id, req.params.id];
  
  db.query(sql, params, (err, result) => {
    if(err) {
      res.status(400).json({ error: err.message});
      //check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});


//query database to test connection and get all candidates
router.get('/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name
      AS party_name
      FROM candidates
      LEFT JOIN parties
      ON candidates.party_id = parties_id
      WHERE candidates.id = ?`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//DELETE a candidate
router.delete('/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });


//Create a Candidate
router.post('/candidate', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }

    //Add the new candidate that was created
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected, party_id)
  VALUES (?,?,?,?)`;
const params = [body.first_name, body.last_name, body.industry_connected, body.party_id];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
  });
});

});

module.exports = router;