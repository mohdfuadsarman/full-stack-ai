-- Reset all tables
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE ecommerce.customer;
TRUNCATE TABLE ecommerce.order;
TRUNCATE TABLE ecommerce.order_item;
TRUNCATE TABLE ecommerce.product;
SET FOREIGN_KEY_CHECKS = 1;


-- Data preparation

-- Insert customers
INSERT INTO ecommerce.customer (name, email, password, address) VALUES
('Alice Green', 'alice@example.com', 'alice123', '10 Oak Rd'),
('Bob Blue', 'bob@example.com', 'bob123', '20 Pine St');

-- Insert products
INSERT INTO ecommerce.product (name, description, price, stock) VALUES
('Wireless Mouse', 'Ergonomic wireless mouse', 25.99, 100),
('Mechanical Keyboard', 'RGB keyboard', 99.99, 50),
('Noise-Cancelling Headphones', 'Over-ear headphones', 149.99, 60),
('USB-C Hub', 'Multi-port USB-C hub', 39.99, 200);

-- Insert orders (include orders in June 2024)
INSERT INTO ecommerce.order (customer_id, order_date, status, total_amount) VALUES
(1, '2024-06-15 10:30:00', 'Shipped', 265.96),
(2, '2024-06-22 14:00:00', 'Completed', 149.99),
(1, '2024-05-20 09:00:00', 'Completed', 99.99),
(2, '2024-07-05 13:00:00', 'Shipped', 45.00);

-- Insert order items (linked to above orders)
INSERT INTO ecommerce.order_item (order_id, product_id, quantity, unit_price) VALUES
(1, 4, 3, 39.99),
(1, 2, 2, 99.99),
(2, 3, 1, 149.99),
(3, 2, 1, 99.99),
(4, 1, 1, 25.99);



/*
Retrieve Information Using Joins 
a) Using the tables Products, Orders, and OrderDetails, write an SQL query.
b) The query should retrieve information on products ordered in June 2024.
c) The result should display: 

ProductName: The name of the product. 
QuantityOrdered: The quantity of each product in the order. 
OrderDate: The date the order was placed. */

SELECT 
    p.name AS ProductName,
    oi.quantity AS QuantityOrdered,
    o.order_date AS OrderDate
FROM 
    ecommerce.order_item oi
JOIN 
    ecommerce.order o ON oi.order_id = o.order_id
JOIN 
    ecommerce.product p ON oi.product_id = p.product_id
WHERE 
    o.order_date >= '2024-06-01'
    AND o.order_date < '2024-07-01';
