# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### root

- (/) will get all route

#### Products

- GET (/get-products) will retarn all products

- GET (/show-product/:id) will retarn product if id is exist

- POST (/create-product) [token required] will create product if enter valid body and retarn the new product data

- PATCH (/update-product/:id) [token required] will update product if id is exist and retarn the updated data

- DELETE (/delete-product/:id) [token required] will delete product if id is exist and retarn the delete product data

#### Users

- GET (/get-users) [token required] will get all users

- GET (/show-user/:id) [token required] retarn user if id is exist and

- POST (/create-user) will create user if you enter valid body retarn the new user data

- POST (/refresh-token) [token required] will make new access token and retarn it

- PATCH (/update-user/:id) [token required] will update user if id is exist retarn the updated data

- DELETE (/delete-user/:id) [token required] will delete user if id is exist and retarn the delete user data

- POST (/authenticate-user) will retarn access token and refreshtoken

#### Orders

- GET (/get-orders) will get all orders

- GET (/show-order/:id) retarn order if user_id is exist and

- POST (/create-order) [token required] will create order if you enter valid body retarn the new order data

- POST (/add-product/:id) [token required] will add product to cart if id is exist

- PATCH (/update-order/:id) [token required] will update order if id is exist retarn the updated data

- DELETE (/delete-order/:id) [token required] will delete order if id is exist

### status 401

all route that need authenticatToken and you unauthenticated

### status 404

if route not exist

## Data Shapes

#### Product

- id: number
- title: string
- price: number
- rating: number
- stock: number
- brand: string
- description: string
- category: string
- thumbnail: string
- images: string[]

#### users

- id: number
- firstName: string
- lastName: string
- password: string
- email: string
- gender: string
- username: string

#### users

- id: number
- user_id: number
- stutas: boolean

#### cart

- id
- order_id
- product_id
- quantity
