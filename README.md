# Products

List all products
GET `path/products`

Get product by id
GET `path/products/:id`

Add new product
POST `path/products`

Update product
PUT `path/products/:id`

Remove product
DELETE `path/products/:id`

# Users

List all users
GET `path/users`

Add new user
POST `path/users`

Update user
PUT `path/users/:id`

Remove user
DELETE `path/users/:id`

# Order

Get all orders
GET `path/orders`

Make order:
POST `/path/order?product=prId&quantity=1&user=userId`

Sample POST request: 
`http://localhost:3000/order?product=59a011bef36d281bbd02a88d&quantity=2&user=59a01041f36d281bbd02a7ed`

