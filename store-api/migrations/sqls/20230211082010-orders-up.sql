/* Replace with your SQL commands */
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  stutas BOOLEAN NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_orders_users
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);
