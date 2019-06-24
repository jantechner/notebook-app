import React from 'react'

import './BigNote.css'

function BigNote(props) {
    return (
        <div className="container h-100 py-3 px-0">
            <div className="row px-0 h-100">
                <div className="col h-100">
                    {props.note ? (
                        <div className="big-note">
                            <div className="card-body">
                                <h5 className="card-title">{props.note.title}</h5>
                                <p className="card-text">{props.note.text}</p>
                            </div>
                        </div>
                    ) :
                        <h5>You can create a new note by clicking the blue button on the left</h5>
                    }
                </div>
            </div>
        </div>
    )
}

export default BigNote