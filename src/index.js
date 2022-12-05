import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

import { register } from './controllers/auth.js'
import authRoutes from './routes/auth.js'
import { applyCommonMiddlewares } from './middleware/common.js'

// Configurations
dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = process.env.PORT || 6001

// middlewares
applyCommonMiddlewares(app)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

// Routes with files
app.post('/auth/register', upload.single('picture'), register)

// Routes
app.use('/auth', authRoutes)

// Mongoose setup
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server on port ${PORT}`))
  })
  .catch((error) => console.log(`ERROR: ${error}`))
