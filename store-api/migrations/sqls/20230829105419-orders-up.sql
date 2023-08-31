CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE orders (
  id UUID PRIMARY KEY,
  customer_id UUID
);



-- Create a foreign key for the one-to-many relationship with the order table
ALTER TABLE orders
ADD CONSTRAINT fk_users_orders
FOREIGN KEY (customer_id) REFERENCES customers(id)
ON DELETE CASCADE
ON UPDATE CASCADE;