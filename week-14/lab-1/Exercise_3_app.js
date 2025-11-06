const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())



const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/products.db')



app.get('/product', function (req, res) {

    db.all('SELECT * FROM products ORDER BY product_id ASC', (err, rows) => {

        res.status(200).json(rows)
    })
});



app.get('/product/:product_id', function (req, res) {

    db.get('SELECT * FROM products WHERE product_id = ?', [req.params.product_id], (err, row) => {
        if (err || !row) {
            res.status(404).send('Product not found');
            return;
        }

        res.status(200).json(row);
    });
});



app.put('/product', function (req, res) {
    
    db.run(`INSERT INTO products (sku_code, product_name, product_description, brand, model, category, quantity_on_hand, unit_price) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [req.body.sku_code,
        req.body.product_name,
        req.body.product_description,
        req.body.brand,
        req.body.model,
        req.body.category,
        req.body.quantity_on_hand,
        req.body.unit_price], function (err) {
            if (err || this.changes === 0) {                
                res.status(409).send('Error creating new product');
                return;
            }
                    
            res.status(200).send('Product created with new Product ID: ' + this.lastID);
        });
});



app.post('/product/:product_id', function (req, res) {
    db.run(`UPDATE products SET sku_code = ?, product_name = ?, product_description = ?, brand = ?, model = ?, category = ?, quantity_on_hand = ?, unit_price = ? WHERE product_id = ?`,
        [req.body.sku_code,
        req.body.product_name,
        req.body.product_description,
        req.body.brand,
        req.body.model,
        req.body.category,
        req.body.quantity_on_hand,
        req.body.unit_price,
        req.params.product_id], function (err) {
            if (err || this.changes === 0) {    
                res.status(400).send('Error updating product');
                return;
            }
            
            res.status(200).send('Product updated successfully');
        });
});



app.delete('/product/:product_id', function (req, res) {

    db.run('DELETE FROM products WHERE product_id = ?', [req.params.product_id], function (err) {
        if (err || this.changes === 0) {            
            res.status(400).send('Error deleting product');
            return;
        }
        
        res.status(200).send('Product deleted successfully');
    });
});



app.listen(port, function () {
    console.log(`Express app listening on port ${port}!`);
});
