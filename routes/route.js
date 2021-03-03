const router = require('express').Router();
const noteStore = require('../db/noteStore');
const path = require('path');


/*API Routes*/
router.get('/api/notes', (req, res) => {
    noteStore
    .all()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/api/notes', (req, res) => {
    noteStore
    .create(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

router.delete('/api/notes/:id', (req, res) => {
    noteStore
    .delete(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

/*Html Routes*/
  
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

router.get('/*', (req, res) => {
    console.log(__dirname)

    res.sendFile(path.join(__dirname, '../public/index.html'));

  });
  

  
module.exports = router;


