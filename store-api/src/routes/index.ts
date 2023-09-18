import express from 'express'
import customerRoutes from './customer'
import productRoutes from './products'
import profileRouter from './profile'
import categoryRoutes from './category'

const apiRouters = express.Router()


apiRouters.use("/customers",customerRoutes)
apiRouters.use("/products",productRoutes)
apiRouters.use("/profiles",profileRouter)
apiRouters.use("/category",categoryRoutes)

export default apiRouters