-- Reset all tables
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE ecommerce.customer;
TRUNCATE TABLE ecommerce.order;
TRUNCATE TABLE ecommerce.order_item;
TRUNCATE TABLE ecommerce.product;
SET FOREIGN_KEY_CHECKS = 1;


-- a) Insert a new customer into the Customers table

INSERT INTO ecommerce.customer (name, email, password, address) VALUES
('John Doe', 'johndoe@example.com', 'passwordJohnDoe123', 'Block 123, Pasir Ris Street 1, Singapore 98765');

INSERT INTO ecommerce.customer (name, email, password, address) VALUES
('Alice Smith', 'alice@example.com', '123AlicePassword', '1, Jalan Aspira 1, Taman Aspira, 12345, Iskandar Puteri, Johor, Malaysia'),
('Bob Johnson', 'bob@example.com', '1234567890', 'No 1, Kampung Maju, Seri Meranti, 45678, Batu Pahat, Johor, Malaysia'),
('Hassan', '', 'password1', '');

SELECT * FROM ecommerce.customer;


-- b) Update a customer's email based on their CustomerID

UPDATE ecommerce.customer
SET email = 'hassan@example.com'
WHERE customer_id = 4;

UPDATE ecommerce.customer
SET email = 'bob.1@example.com'
WHERE customer_id = 3;

SELECT * FROM ecommerce.customer;


-- c) Delete an order from the Orders table using OrderID

-- Insert sample products
INSERT INTO ecommerce.product (name, description, price, stock) VALUES
('Wireless Mouse', 'Ergonomic wireless mouse', 25.99, 50),
('Laptop Stand', 'Adjustable aluminum stand', 45.00, 30),
('USB-C Hub', 'Multi-port USB-C adapter', 39.99, 100);

-- Insert sample orders
INSERT INTO ecommerce.order (customer_id, status, total_amount) VALUES
(1, 'Shipped', 70.99),
(2, 'Pending', 84.99);

-- Insert sample order items
INSERT INTO ecommerce.order_item (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 25.99),
(1, 3, 1, 45.00),
(2, 2, 1, 45.00),
(2, 3, 1, 39.99);

SELECT * FROM ecommerce.order_item;
SELECT * FROM ecommerce.product;
SELECT * FROM ecommerce.order;

-- Delete order
DELETE FROM ecommerce.order
WHERE order_id = 2;

SELECT * FROM ecommerce.order;
