const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

//username: chaion
//password: nXnGENyRgs4aDwI8

const uri =
	'mongodb+srv://chaion:nXnGENyRgs4aDwI8@cluster0.xrot4dj.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	try {
		await client.connect();
		const userCollection = client.db('foodExpress').collection('users');

		app.get('/users', async (req, res) => {
			const query = {};
			const cursor = userCollection.find(query);
			const users = await cursor.toArray();
			res.send(users);
		});

		app.get('/user/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const user = await userCollection.findOne(query);
			res.send(user);
		});

		app.get('/userDelete/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const user = await userCollection.deleteOne(query);

			res.send(user);
		});

		app.put('/user/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const updateDoc = req.body;
			const user = await userCollection.replaceOne(query, updateDoc);
			res.send(user);
		});

		app.post('/user', async (req, res) => {
			const result = await userCollection.insertOne(req.body);
			res.send(result);
		});
	} finally {
		// await client.close();
	}
}

run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('Express is running');
});

app.listen(port, () => {
	console.log(`server is running at port ${port}`);
});
