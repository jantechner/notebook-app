const express = require('express')
const fs = require('fs')
const path = require('path');

const rootDir = path.dirname(require.main.filename)
var router = express.Router()

router.get('/:user', (req, res) => {
    const user = req.params.user
    const filePath = rootDir + `/users_files/${user}.json`
    
    fs.readFile(filePath, (err, fileContentJSON) => {
        if (err) {
            console.log(`Cannot read user ${user} notes file`)
            res.statusMessage = "Cannot read user's notes file!"
            res.status(500).end()
            return
        }
        var fileContent = JSON.parse(fileContentJSON)
        res.send(fileContent.notes)
        console.log(`Sent notes to user ${user}`)
    })
})


router.post('/:user', (req, res) => {
    const user = req.params.user
    const text = req.body.text
    const title = req.body.title
    const filePath = rootDir + `/users_files/${user}.json`
    
    fs.readFile(filePath, (err, fileContentJSON) => {
        if (err) {
            console.log(`Cannot read user ${user} notes file`)
            res.statusMessage = "Cannot read user's notes file!"
            res.status(500).end()
        }

        var fileContent = JSON.parse(fileContentJSON)
        var newMaxIndex = fileContent.maxIndex + 1
        fileContent.maxIndex = newMaxIndex
        fileContent.notes.push(new Note(text, title, newMaxIndex))
        

        fs.writeFile(filePath, JSON.stringify(fileContent, null, 4), (err) => {
            if (err) {
                console.log(`Cannot save user ${user} new note`)
                res.statusMessage = "Cannot save new note!"
                res.status(500).end()
            }
            console.log(`User ${user} new note saved!`)
            res.status(201).end()
        })
    })
})

router.put('/:user', (req, res) => {
    const user = req.params.user
    const text = req.body.text
    const title = req.body.title
    const id = parseInt(req.body.id)

    let filePath = rootDir + `/users_files/${user}.json`
    
    fs.readFile(filePath, (err, fileContentJSON) => {
        if (err) {
            console.log(`Cannot read user ${user} notes file`)
            res.statusMessage = "Cannot read user's notes file!"
            res.status(500).end()
            return 
        }

        var fileContent = JSON.parse(fileContentJSON)
        var index = fileContent.notes.findIndex(note => note.id === id)
        if (index === -1) {
            console.log(`Cannot find note with given id`)
            res.statusMessage = "Cannot find note with given id!"
            res.status(500).end()
            return 
        }
        fileContent.notes[index].title = title
        fileContent.notes[index].text = text

        fs.writeFile(filePath, JSON.stringify(fileContent, null, 4), (err) => {
            if (err) {
                console.log(`Cannot edit user ${user} note!`)
                res.statusMessage = "Cannot edit note!"
                res.status(500).end()
            }
            console.log(`User ${user} note edited successfully!`)
            res.statusMessage = "Edited!"
            res.status(200).end()
        })
    })
})

router.delete('/:user/:id', (req, res) => {
    const user = req.params.user
    const id = parseInt(req.params.id)

    let filePath = rootDir + `/users_files/${user}.json`
    
    fs.readFile(filePath, (err, fileContentJSON) => {
        if (err) {
            console.log(`Cannot read user ${user} notes file`)
            res.statusMessage = "Cannot read user's notes file!"
            res.status(500).end()
            return 
        }

        var fileContent = JSON.parse(fileContentJSON)
        var index = fileContent.notes.findIndex(note => note.id === id)
        if (index === -1) {
            console.log(`Cannot find note with given id`)
            res.statusMessage = "Cannot find note with given id!"
            res.status(500).end()
            return 
        }
        fileContent.notes.splice(index, 1)

        fs.writeFile(filePath, JSON.stringify(fileContent, null, 4), (err) => {
            if (err) {
                console.log(`Cannot delete user ${user} note from file!`)
                res.statusMessage = "Cannot delete note!"
                res.status(500).end()
            }
            console.log(`User ${user} note deleted!`)
            res.statusMessage = "Deleted!"
            res.status(200).end()
        })
    })
})

class Note {
    constructor(text, title, index) {
        this.id = index
        this.title = title
        this.text = text
        this.timestamp = new Date(Date.now()).toUTCString()
        return this
    }
}

module.exports = router