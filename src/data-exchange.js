const serverUrl = new URL('http://' + window.location.hostname + ':4000')
const notesUrl = new URL('/notes', serverUrl)
const deletedNotesUrl = new URL('/deletedNotes', serverUrl)

async function readNotes() {
    const response = await fetch(notesUrl)
    if (response.ok) {
        return await response.json()
    } else {
        alert("Ошибка HTTP: " + response.status)
    }
}

async function recordNotes(notes) {
    await fetch(notesUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(notes)
    })
}

async function readDeletedNotes() {
    const response = await fetch(deletedNotesUrl)
    if (response.ok) {
        return await response.json()
    } else {
        alert("Ошибка HTTP: " + response.status)
    }
}

async function recordDeletedNotes(notes) {
    await fetch(deletedNotesUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(notes)
    })
}

async function deleteTrash() {
    await fetch(deletedNotesUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: '{}'
    })
}
export {readNotes, recordNotes, readDeletedNotes, recordDeletedNotes, deleteTrash}