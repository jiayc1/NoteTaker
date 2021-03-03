const util = require('util');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class NoteStore {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  all() {
    return this.read().then((data) => {
      let notes;

      try {
        notes = [].concat(JSON.parse(data));
      } catch (err) {
        notes = [];
      }

      return notes;
    });
  }
/*create notes*/

  create(note) {
    const { title, text } = note;

    const newNote = { title, text, id: uuidv4() };

// gets all notes, append the note that gets passed in, and saves and return new note
    return this.all()
      .then((notes) => [...notes, newNote]) 
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }
/* delete notes*/ 

  delete(id) {
    return this.all()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new NoteStore();
