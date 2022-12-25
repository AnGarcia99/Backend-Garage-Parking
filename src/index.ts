import express from 'express'
import cors from 'cors'
import parkingRouter from './routes/parkingRoutes'

const app = express()
app.use(cors())
app.use(express.json()) // middleware que transforma la req.body a un json

const PORT = 3000 | 3002

app.get('/ping', (_req, res) => {
  console.log('someone pinged here!!' + new Date().toLocaleDateString())
  res.send('pong')
})

app.use('/api/parkings', parkingRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
