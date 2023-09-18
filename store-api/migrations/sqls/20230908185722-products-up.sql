CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  discount_percentage DECIMAL(5, 2),
  rating DECIMAL(3, 2),
  stock_quantity INT NOT NULL,
  brand VARCHAR(255),
  category VARCHAR(255),
  thumbnail VARCHAR(255) CHECK (thumbnail LIKE 'http%' OR thumbnail LIKE 'https%'),
  images TEXT[]
);
