import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://127.0.0.1:27017/mongo', {}, () => {
	console.log('connected to database')
})

mongoose.Promise = global.Promise
const db = mongoose.connection
const UserCollection = db.collection('users')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', async (req, res) => {
	res.send('Home page')
})

app.get('/count', async (req, res) => {
	const usersCount = await UserCollection.count()
	res.status(200).json({ count: usersCount })
})

app.get('/users/:userName', async (req, res) => {
	const user = await UserCollection.findOne({ name: req.params.userName })
	user ? res.status(200).json(user) : res.status(400).json({ error: 'User not found' })
})

app.post('/users', async (req, res) => {
	if (req.body?.name) {
		const repeatUser = await UserCollection.findOne({ name: req.body.name })
		if (!repeatUser) {
			await UserCollection.insertOne(req.body)
			const newUser = await UserCollection.findOne({ name: req.body.name })
			res.status(200).json({ ...newUser, status: 'Create success' })
		} else res.status(400).json({ error: 'User already exists' })
	} else res.status(400).json({ error: 'field "name" not found' })
})

app.delete('/users/:userName', async (req, res) => {
	const user = await UserCollection.findOne({ name: req.params?.userName })
	if (user) {
		UserCollection.deleteOne({ name: user.name })
		res.status(200).json({ status: `user "${user.name}" removed, user id: "${user._id}"` })
	} else res.status(400).json({ status: `user "${req.params.userName}" not found` })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

process.on('SIGINT', () => {
	db.close()
	process.exit()
})
