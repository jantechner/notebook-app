const express = require('express')
const fs = require('fs')
const path = require('path');
const rootDir = path.dirname(require.main.filename)

var router = express.Router()

router.put('/:user', (req, res) => {
    const user = req.params.user
    const path = `./users_files/${user}.json`
    const filePath = rootDir + `/users_files/${user}.json`

    fs.access(filePath, fs.F_OK, (err) => {
        if (err) {

            console.log(`File for user ${user} does not exist!`)

            let initialContent = {
                maxIndex: 1,
                notes: [
                    {
                        id: 1,
                        title: "Initial note",
                        text: "Here is the sample content of the note",
                        timestamp: new Date(Date.now()).toUTCString()
                    }]
            }

            fs.writeFile(filePath, JSON.stringify(initialContent), (err) => {

                if (err) {
                    response.statusMessage = "Cannot create user file!"
                    response.status(500).end()
                    return
                }

                res.statusMessage = "New user's file created!"
                res.status(201).end()

                console.log(`File for user ${user} created!`)
            })
            return 
        }

        console.log(`File for user ${user} exists!`)

        res.statusMessage = "User's file exists in the database!"
        res.status(200).end()

    })
})


module.exports = router