import {useState, useEffect} from 'react';

import './styles.css';
import ButtonSection from './button-section';
import NoteSection from './note-section';
import {readNotes, recordNotes} from './data-exchange';

function AlwaysNotes() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
      readNotes().then(result => setNotes(result))

      document.addEventListener("click", (event) => {
        if (event.defaultPrevented) return
        const oldFocused = document.getElementsByName("focused")[0]
        if (oldFocused && ((event.target.className != "noteBlock") || (event.target.parentElement.className != "noteBlock"))) {
            oldFocused.style["max-width"] = ""
            oldFocused.getElementsByTagName('textarea')[0].style.height = 'auto'
            oldFocused.removeAttribute("name")
        }
      })
    }, [])

    function addNote() {
      let modNotes = {...notes}

      const index = Date.now()
      modNotes[index] = {}
      modNotes[index].date = index
      modNotes[index].header = "Введите заголовок"
      modNotes[index].text = "Введите текст"
      modNotes[index].change = index

      setNotes(modNotes)
    }

    function saveNotes() {
      recordNotes(notes)
    }

    function deleteNote(index) {
      let modNotes = {...notes}
      delete modNotes[index]
      setNotes(modNotes)
    }

    function inputElement(index, elem, data) {
      let modNotes = {...notes}
      modNotes[index][elem] = data
      setNotes(modNotes)
    }
  
    return (
      <div>
        <ButtonSection addNote={addNote} saveNotes={saveNotes}/>
        <NoteSection notes={notes} deleteNote={deleteNote} inputElement={inputElement}/>
      </div>
    )
  }

  export default AlwaysNotes