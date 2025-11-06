-- Reset all tables
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE ecommerce.customer;
TRUNCATE TABLE ecommerce.order;
TRUNCATE TABLE ecommerce.order_item;
TRUNCATE TABLE ecommerce.product;
SET FOREIGN_KEY_CHECKS = 1;


-- Data preparation

-- Insert sample customers
INSERT INTO ecommerce.customer (name, email, password, address) VALUES
('Alice Smith', 'alice@example.com', 'alice123', '123 Bendemeer Singapore'),
('Bob Johnson', 'bob@example.com', 'bob123', '456 Kuantan, Pahang, Malaysia'),
('Charlie Davis', 'charlie@example.com', 'charlie123', '789 Kampung Sardon, Kedah, Malaysia'),
('Dana White', 'dana@example.com', 'dana123', '321 Orchard Road, Singapore'),
('Evan Stone', 'evan@example.com', 'evan123', '654 Johor Bahru, Johor, Malaysia');

-- Insert sample products
INSERT INTO ecommerce.product (name, description, price, stock) VALUES
('Wireless Mouse', 'Ergonomic wireless mouse', 25.99, 100),
('Laptop Stand', 'Aluminum adjustable stand', 45.00, 80),
('USB-C Hub', 'Multiport adapter', 39.99, 200),
('Mechanical Keyboard', 'RGB mechanical keyboard', 99.99, 50),
('Noise-Cancelling Headphones', 'Over-ear headphones', 149.99, 60);

-- Insert orders (before, during, after 2024)
INSERT INTO ecommerce.order (customer_id, order_date, status, total_amount) VALUES
(1, '2022-03-15 11:30:00', 'Completed', 300.00),
(2, '2023-07-22 09:00:00', 'Shipped', 650.00),
(3, '2023-12-31 23:59:59', 'Pending', 700.00),
(4, '2024-01-05 10:15:00', 'Shipped', 550.00),
(5, '2024-01-12 14:00:00', 'Pending', 499.99),
(1, '2024-01-25 09:30:00', 'Completed', 1000.00),
(2, '2024-03-08 17:45:00', 'Cancelled', 800.00),
(3, '2024-07-14 08:00:00', 'Completed', 320.00),
(4, '2024-12-20 13:30:00', 'Shipped', 560.00),
(5, '2025-02-02 11:00:00', 'Shipped', 750.00),
(1, '2026-06-18 20:10:00', 'Pending', 400.00);

-- Insert matching OrderItems (assume pricing matches Products table)
INSERT INTO ecommerce.order_item (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 2, 25.99),
(1, 3, 2, 39.99),
(2, 4, 5, 99.99),
(2, 2, 2, 45.00),
(3, 5, 4, 149.99),
(4, 2, 5, 45.00),
(4, 4, 2, 99.99),
(4, 1, 5, 25.99),
(5, 3, 3, 39.99),
(6, 5, 4, 149.99),
(6, 2, 2, 45.00),
(7, 4, 8, 99.99),
(8, 1, 10, 25.99),
(9, 3, 4, 39.99),
(10, 5, 5, 149.99),
(11, 2, 2, 45.00);

SELECT * FROM ecommerce.customer;
SELECT * FROM ecommerce.order_item;
SELECT * FROM ecommerce.product;
SELECT * FROM ecommerce.order;


-- a) Orders were placed in January 2024.

SELECT order_id, order_date, total_amount
FROM ecommerce.order
WHERE order_date >= '2024-01-01'
  AND order_date < '2024-02-01';


-- b) The order total exceeds $500.

SELECT order_id, order_date, total_amount
FROM ecommerce.order
WHERE total_amount > 500;


-- c) Your query should only include columns for OrderID, OrderDate, and TotalAmount in the result.

SELECT order_id, order_date, total_amount
FROM ecommerce.order
WHERE order_date >= '2024-01-01'
  AND order_date < '2024-02-01'
  AND total_amount > 500;