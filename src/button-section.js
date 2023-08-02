function ButtonSection(props) {
    return (
        <div className="buttonSection">
            <button id="create" className="manageButton" onClick={props.addNote}>+</button>
            <button id="save" className="manageButton" onClick={props.saveNotes}>S</button>
        </div>
        )
}
export default ButtonSection