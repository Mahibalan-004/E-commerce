// import path from 'path'
// import express from 'express'
// import dotenv from 'dotenv'
// import colors from 'colors'
// import morgan from 'morgan'
// import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// import connectDB from './config/db.js'
// import productRoutes from './routes/productRoutes.js'
// import userRoutes from './routes/userRoutes.js'
// import orderRoutes from './routes/orderRoutes.js'
// import uploadRoutes from './routes/uploadRoutes.js'
// import paymentRoutes from './routes/PaymentRoutes.js' // ✅ Use lowercase 'p'

// dotenv.config()
// console.log('Mongo URI:', process.env.MONGO_URI)

// connectDB()

// const app = express() // ✅ Move this above all app.use()

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

// app.use(express.json())

// // ✅ All routes after app is created
// app.use('/api/products', productRoutes)
// app.use('/api/users', userRoutes)
// app.use('/api/orders', orderRoutes)
// app.use('/api/upload', uploadRoutes)
// app.use('/api/payment', paymentRoutes) // ✅ fixed line (moved below)

// app.get('/api/config/paypal', (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// )

// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')))
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   )
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....')
//   })
// }

// app.use(notFound)
// app.use(errorHandler)

// const PORT = process.env.PORT || 5000

// app.listen(
//   PORT,
//   () => {
//     console.log(
//       `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
//     )
//   }
// )
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()

// Connect to MongoDB
await connectDB()

const importData = async () => {
  try {
    // Remove existing users
    await User.deleteMany()

    // Insert new users
    const createdUsers = await User.insertMany(users)

    console.log('✅ Users Imported Successfully!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`❌ Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

importData()
