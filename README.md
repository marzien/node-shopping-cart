# Products

List all products
GET `path/products`

Get product by id
GET `path/product/:id`

Add new product
POST `path/product`

Update product
PUT `path/product/:id`

Remove product
DELETE `path/product/:id`

# Users

List all users
GET `path/users`

Add new user
POST `path/user`

Update user
PUT `path/user/:id`

Remove user
DELETE `path/user/:id`

# Order

Get all orders
GET `path/orders`

Make order:
POST `/path/order?product=prId&quantity=1&user=userId`

Sample POST request: 
`http://localhost:3000/order?product=59a011bef36d281bbd02a88d&quantity=2&user=59a01041f36d281bbd02a7ed`

