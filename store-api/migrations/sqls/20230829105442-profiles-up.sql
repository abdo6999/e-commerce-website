CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE profiles (
    id UUID PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    gender VARCHAR(10),
    age INT,
    country VARCHAR(255),
    city VARCHAR(255),
    address TEXT,
    phone VARCHAR(20),
    date_of_birth DATE,
    post_code VARCHAR(5),
    profile_image VARCHAR(255),
    customer_id UUID
);




