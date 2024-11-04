import express from 'express'
import cors from 'cors'
import { generateUploadURL } from './s3Url.js'

const app = express()

app.use(express.static('front'))
app.use(cors())

app.get('/s3Url', async (req, res) => {
    try {
        const url = await generateUploadURL()
        res.status(200).send({url})
    } catch (err) {
        console.log(err);
        return;
    }
})

app.listen(8080, () => console.log("listening on port 8080"))