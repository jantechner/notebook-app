import React from 'react'

import './Notes.css'

function Notes(props) {
    const notes = props.notes.length ? props.notes.map((note, index) => {
        return (
            <div key={note.id} className='note my-3' onClick={() => props.showNote(note.id)}>
                <div className='timestamp'> {note.timestamp} </div>
                <div className='title'> {note.title} </div>
            </div>
        ) 
    }) : null

    return (
        <div>
            {props.notes.length ? notes : <h5>You have no notes yet</h5>}
        </div>
    )
}

export default Notes