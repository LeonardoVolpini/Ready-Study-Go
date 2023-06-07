'use strict';

const express = require('express');
const dao = require('./DAO');
// const cors = require('cors');
const morgan = require('morgan'); // logging middleware
const { json } = require('express');

// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(express.json());
app.use(morgan('dev'));
// const corsOptions = {
//   origin: 'https://7836-37-119-136-92.eu.ngrok.io:3000',
//   credentials: true,
// };
// app.use(cors(corsOptions));

/*** APIs ***/

/////////
//USERS//
/////////
app.get('/api/user/:id', (req, res) => {
  dao.getUserById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch((err) => {
      res.status(500).json({ error: `Database error while retrieving user with id ${req.params.id}.` }).end()
    });
});

app.post('/api/login', (req, res) => {
  dao.getUser(req.body.username, req.body.password)
    .then(user => res.status(200).json(user))
    .catch((err) => {
      res.status(500).json({ error: `Database error while authenticate user with username ${req.body.username}.` }).end()
    });
});

/////////
//SESSIONS//
/////////
app.get('/api/session/:userId', (req, res) => {
  dao.getSessionsByUserId(req.params.userId)
    .then(sessions => res.status(200).json(sessions))
    .catch((err) => {
      res.status(500).json({ error: `Database error while retrieving sessions for user  ${req.params.userId}.` }).end()
    });
});

app.get('/api/session/:id/date/:date', (req, res) => {
  dao.getSessionsByUserIdAndDate(req.params.id, req.params.date)
    .then(sessions => res.status(200).json(sessions))
    .catch((err) => {
      res.status(500).json({ error: `Database error while retrieving sessions by userId ${req.params.userId} and date ${req.params.date}.` }).end()
    });
});

app.get('/api/sessions/:Id', (req, res) => {
  dao.getSessionById(req.params.Id)
    .then(session => res.status(200).json(session))
    .catch((err) => {
      res.status(500).json({ error: `Database error while retrieving session by Id ${req.params.Id}.` }).end()
    });
});

app.delete('/api/session/:id',
  async (req, res) => {
    try {
      await dao.deleteSession(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(503).json({ error: `Database error during the deletion of session ${req.params.id}.` });
    }
  }
);

app.put('/api/session',
  async (req, res) => {
    try {
      await dao.updateSession(req.body.session);
      res.status(200).json("Session updated with success!").end();
    } catch (err) {
      res.status(503).json({ error: `Database error during the update session ${req.body.session}.` });
    }
  });

  app.post('/api/session',
  async (req, res) => {
    try {
      await dao.createSession(req.body.session);
      res.status(201).json("Session saved with success!").end();
    } catch (err) {
      res.status(503).json({ error: `Database error during the create session.` });
    }
  });


  /////////
//PLANS//
/////////
app.get('/api/plan/:userId', (req, res) => {
  dao.getPlansByUserId(req.params.userId)
    .then(plans => res.status(200).json(plans))
    .catch((err) => {
      res.status(500).json({ error: `Database error while retrieving plans for user  ${req.params.userId}.` }).end()
    });
});

app.get('/api/plans/:id', (req, res) => {
  dao.getPlanById(req.params.id)
    .then(plan => res.status(200).json(plan))
    .catch((err) => {
      res.status(500).json({ error: `Database error while retrieving plans for id ${req.params.id}.` }).end()
    });
});

app.get('/api/default-plan', (req, res) => {
  dao.getDefaultPlans()
    .then(plans => res.status(200).json(plans))
    .catch((err) => {
      res.status(500).json({ error: `Database error while retrieving default plans.` }).end()
    });
});

app.delete('/api/plan/:id',
  async (req, res) => {
    try {
      await dao.deletePlan(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(503).json({ error: `Database error during the deletion of plan ${req.params.id}.` });
    }
  }
);

app.put('/api/plan',
  async (req, res) => {
    try {
      const id = await dao.updatePlan(req.body.plan);
      res.status(200).json(id);
    } catch (err) {
      res.status(503).json({ error: `Database error during the update plan ${req.body.plan.id}.` });
    }
  });

  app.post('/api/plan',
  async (req, res) => {
    try {
      const id = await dao.createPlan(req.body.plan);
      res.status(201).json(id);
    } catch (err) {
      res.status(503).json({ error: `Database error during the plan creation` });
    }
  });

  app.put('/api/song',
  async (req, res) => {
    try {
      await dao.updateSong(req.body.song);
      res.status(200).json("Song updated with success!").end();
    } catch (err) {
      res.status(503).json({ error: `Database error during the supdate of song ${req.body.song}.` });
    }
  });

// Activate the server
app.listen(port, () => {
  console.log(`react-score-server listening at http://localhost:${port}`);
});