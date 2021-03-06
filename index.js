const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qw2tv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {
    try {
        await client.connect()

        const billCollection = client.db("power-hack").collection("billing-list")


        app.get('/billing-list', async (req, res) => {
            const query = {}
            const cursor = billCollection.find(query)
            const items = await cursor.toArray()
            res.send(items)
        })

        app.post('/add-billing', async (req, res) => {
            const bill = req.body;
            const result = await billCollection.insertOne(bill);
            res.send({ success: true, result })
        });

    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('server started')
})


app.listen(port, () => {
    console.log(`server running on ${port}`)
})
