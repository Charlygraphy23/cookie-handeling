const express = require('express');
const fs = require('fs');
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express();

// cookie parser to get the cookie from req
app.use(cookieParser())
const port = 3000

app.get('/', (req, res) => {
    // Render html file
    const htmlFile = fs.readFileSync(path.resolve("./index.html"), 'utf8');
    return res.send(htmlFile)

})


app.post('/login', (req, res) => {
    // After login set the cookie in local browser
     res.cookie("imageCookie" , "abcd" , {
        maxAge : 1000  * 60 * 60 * 1, // 1 hr
        sameSite: "lax", // strict | none | lax (default)
        secure : true // this is required when using sameSite: "none"
    })

    return res.send("Done")
})

app.get('/img', (req, res) => {

    // is the cookie present then only show the content!
    if(req.cookies?.imageCookie){
        return res.send(fs.readFileSync('./photo.webp'))
    }
    return res.status(403).send()
})


// Initializing server 
app.listen(port || 3000 , () => {
    console.log('listening on port' , port)
})