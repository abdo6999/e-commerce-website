/* Replace with your SQL commands */
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL,
  rating FLOAT,
  stock INT NOT NULL,
  brand VARCHAR(64),
  description TEXT NOT NULL,
  category VARCHAR(64) NOT NULL, 
  thumbnail VARCHAR(2048) NOT NULL,
  images VARCHAR(2048)[]
);