
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID
);

-- Create a foreign key for the one-to-many relationship with the invoice table
ALTER TABLE invoices
ADD CONSTRAINT fk_users_invoices
FOREIGN KEY (customer_id) REFERENCES customers(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

