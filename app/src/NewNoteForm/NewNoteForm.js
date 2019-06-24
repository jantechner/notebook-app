import React, { Component } from 'react'
import './NewNoteForm.css'

class NewNoteForm extends Component {
    constructor(props) {
        super(props)

        this.edit = this.props.note ? true : false
        this.user = this.props.match.params.user

        this.state = {
            text: this.props.note ? this.props.note.text : '',
            title: this.props.note ? this.props.note.title : ''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    newNoteRequest() {
        fetch(`http://localhost:3030/api/notes/${this.user}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `text=${this.state.text}&title=${this.state.title}`
        })
            .then(data => console.log(data.status, data.statusText))
            .then(() => {
                this.props.fetch()
                this.props.history.goBack()
            })
    }

    editNoteRequest() {
        fetch(`http://localhost:3030/api/notes/${this.user}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `text=${this.state.text}&title=${this.state.title}&id=${this.props.note.id}`
        })
            .then(data => console.log(data.status, data.statusText))
            .then(() => {
                this.props.fetch()
                this.props.history.goBack()
            })
    }
    

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault()
    
        if (this.edit) {
            this.editNoteRequest()
        } else {
            this.newNoteRequest()
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container form-cont d-flex flex-column p-0">
                    <div className="row py-3">
                        <div className="col">
                            <input name="title" className="form-control" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange}/>
                        </div>
                    </div>

                    <div className="row flex-fill">
                        <div className="col">
                            <textarea name="text" className="form-control h-100" placeholder="Note content" value={this.state.text} onChange={this.handleTextChange}> </textarea>
                        </div>
                    </div>
                    
                    <div className="row justify-content-between p-3">
                        <button type="button" className="col-4 btn btn-danger" onClick={() => this.props.history.goBack()}> Cancel </button> 
                        <button type="submit" className="col-7 btn btn-success"> Submit </button>                        
                    </div>
                </div>
            </form>
        )
    }
}

export default NewNoteForm