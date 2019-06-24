import React, { Component } from 'react'
import Notes from './../Notes/Notes'
import BigNote from './../BigNote/BigNote'
import NewNoteForm from './../NewNoteForm/NewNoteForm'
import LogoutButton from './../LogoutButton/LogoutButton'
import ActionButtons from './../ActionButtons/ActionButtons'

import { Route } from 'react-router-dom'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.user = this.props.match.params.user

        this.state = {
            notes: [],
            bigNote: null
        }

        this.showNote = this.showNote.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
        this.fetchNotes = this.fetchNotes.bind(this)
    }

    fetchNotes() {
        fetch(`http://localhost:3030/api/notes/${this.user}`)
            .then(res => {
                console.log(res.status, res.statusText)
                return res.json()
            })
            .then(notes => {

                let bigNote = null
                if (!this.state.bigNote) {
                    bigNote = notes[0]
                } else {
                    var previousBigNote = notes.find(note => note.id === this.state.bigNote.id)
                    bigNote = previousBigNote ? previousBigNote : notes[notes.length - 1]
                }

                this.setState({
                    notes,
                    bigNote: bigNote,
                    notesFetched: true
                })
            })
    }

    componentDidMount() {
        this.fetchNotes()
    }


    showNote(id) {
        var selectedNote = this.state.notes.find(note => note.id === id)
        this.setState({
            bigNote: selectedNote,
            showNewNoteForm: false,
            editNote: false
        })
    }


    deleteNote() {
        fetch(`http://localhost:3030/api/notes/${this.user}/${this.state.bigNote.id}`, {
            method: 'DELETE'
        })
            .then(data => console.log(data.status, data.statusText))
            .then(() => this.fetchNotes())
    }


    render() {
        return (
            <div className="container p-5">

                <LogoutButton />

                <div className="row">

                    <div className="col-4 py-3">
                        <Notes notes={this.state.notes} showNote={this.showNote} />
                    </div>

                    <div className="col-8 py-3">
                        <Route
                            path={`${this.props.match.path}/new`}
                            render={prop => <NewNoteForm {...prop} note={null} fetch={this.fetchNotes} />}
                        />

                        <Route
                            path={`${this.props.match.path}/edit`}
                            render={prop => <NewNoteForm {...prop} note={this.state.bigNote} fetch={this.fetchNotes} />}
                        />

                        <Route
                            exact path={this.props.match.path}
                            render={() => <BigNote note={this.state.bigNote} /> }
                        />
                    </div>

                </div>

                <Route
                    exact path={this.props.match.path}
                    render={(prop) => <ActionButtons {...prop} delete={this.deleteNote} />}
                />

            </div>
        )
    }
}



export default Dashboard