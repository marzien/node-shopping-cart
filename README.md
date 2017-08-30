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

Using Postman: 
POST `{{url}}/order?product=594666fdb58f233c5064a01e&quantity=1&user=5946d1212fbc446de82bd68b`

