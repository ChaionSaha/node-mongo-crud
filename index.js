const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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
