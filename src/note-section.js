function NoteBlock(props) {
    function deleteNote() {
        props.deleteNote(props.date)
    }
    function inputHeader(event) {
        props.inputElement(props.date, "header", event.currentTarget.value)
        props.inputElement(props.date, "change", Date.now())
    }
    function inputText(event) {
        event.currentTarget.style.height = 'auto'
        event.currentTarget.style.height = event.currentTarget.scrollHeight + 'px'
        props.inputElement(props.date, "text", event.currentTarget.value)
        props.inputElement(props.date, "change", Date.now())
    }

    function focusedStatus(event) {
        const oldFocused = document.getElementsByName("focused")[0]
            if (oldFocused) {
                oldFocused.style["max-width"] = ""
                oldFocused.getElementsByTagName('textarea')[0].style.height = 'auto'
                oldFocused.removeAttribute("name")
            }

            const noteText = event.currentTarget.getElementsByTagName('textarea')[0]
            event.currentTarget.setAttribute("name", "focused")
            event.currentTarget.style["max-width"] = "100%"
            noteText.style.height = noteText.scrollHeight + 'px'

            event.preventDefault()
    }

    function formatDate(date) {
        const formattedDate = new Date (date)

        let dayOfMonth = formattedDate.getDate()
        let month = formattedDate.getMonth()
        const year = formattedDate.getFullYear()
        let hour = formattedDate.getHours()
        let minutes = formattedDate.getMinutes()

        month = month < 10 ? '0' + month : month
        dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth
        hour = hour < 10 ? '0' + hour : hour
        minutes = minutes < 10 ? '0' + minutes : minutes

        return  dayOfMonth + "." + month + "." + year + " " + hour + ":" + minutes
    }
    return (
        <div className="noteBlock" onClick={focusedStatus}>
            <input type="textbox" defaultValue={props.header} onInput={inputHeader}></input>
            <textarea defaultValue={props.text} onInput={inputText}></textarea>
            <button className="cross" onClick={deleteNote}>[x]</button>
            <textarea readOnly value={"Создано:" + formatDate(props.date)} ></textarea>
            <textarea readOnly value={"Изменено:" + formatDate(props.change)} ></textarea>
        </div>
    )
}

function NoteSection(props) {
    function prepareNotes() {
        const arrNotes = Object.values(props.notes).sort((a, b) => b.date - a.date)
        return (
            arrNotes.map((elem) => <NoteBlock key={elem.date} date={elem.date} header={elem.header} text={elem.text} change={elem.change} deleteNote={props.deleteNote} inputElement={props.inputElement}/>)
        )

    }
    return (
        <div className="noteSection">
            {prepareNotes()}
        </div>
        )
}

export default NoteSection