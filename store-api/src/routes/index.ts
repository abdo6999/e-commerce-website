import express from 'express'
import userRoutes from './customer'

const apiRouters = express.Router()


apiRouters.use("/customers",userRoutes)

export default apiRouters