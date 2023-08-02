function NoteBlock(props) {
    function deleteNote() {
        props.deleteNote(props.date)
    }
    function inputHeader(event) {
        props.inputElement(props.date, "header", event.currentTarget.value)
    }
    function inputText(event) {
        event.currentTarget.style.height = 'auto'
        event.currentTarget.style.height = event.currentTarget.scrollHeight + 'px'
        props.inputElement(props.date, "text", event.currentTarget.value)
    }

    return (
        <div className="noteBlock">
            <input type="textbox" defaultValue={props.header} onInput={inputHeader}></input>
            <textarea defaultValue={props.text} onInput={inputText}></textarea>
            <button className="cross" onClick={deleteNote}>[x]</button>
        </div>
    )
}

function NoteSection(props) {
    function prepareNotes() {
        const arrNotes = Object.values(props.notes).sort((a, b) => b.date - a.date)
        return (
            arrNotes.map((elem) => <NoteBlock key={elem.date} date={elem.date} header={elem.header} text={elem.text} deleteNote={props.deleteNote} inputElement={props.inputElement}/>)
        )

    }
    return (
        <div className="noteSection">
            {prepareNotes()}
        </div>
        )
}

export default NoteSection