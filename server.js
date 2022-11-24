let express = require('express')
let sqlite3 = require('sqlite3')
let bodyParser = require('body-parser')
const cors = require('cors')



let app = express()
let port = 3001

// this is backend for our blog

// read blog_database.db
let db = new sqlite3.Database('blog_database.db', (err) => {
    if (err) {
        console.error(err.message)
    }
    console.log('Connected to the blog_database.db database.')
    }
)

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.post('/signup', bodyParser.urlencoded({ extended: true }),(req, res) => {
    console.log(req.body)
    let username = req.body.username
    let password = req.body.password
    let conf_password = req.body.conf_password

    if(!req.body.username || !req.body.password || !req.body.conf_password){
        res.send('Please fill out all fields')
        return
    }

    if (password !== conf_password) {
        res.send('Passwords do not match')
        return
    }
    // if username is too short
    if (username.length < 8) {
        res.send('Username must be at least 8 characters long')
        return
    }

    // if password is too short
    if (password.length < 8) {
        res.send('Password must be at least 8 characters long')
        return
    }

    // if username is too long
    if (username.length > 20) {
        res.send('Username must be less than 20 characters long')
        return
    }

    // if username already exists
    db.get('SELECT * FROM users WHERE username = ?', [username
    ], (err, row) => {
        if (err) {
            console.error(err.message)
        }
        if (row) {
            res.send('Username already exists')
            return
        }
        // if username is available
        else {
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
                if (err) {
                    console.error(err.message)
                }
                res.send('Account created')
        })}
    })
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
}
)

