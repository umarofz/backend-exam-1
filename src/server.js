import express from 'express'
import { GET, GETBYID, POST, DELETE, PUT } from './controllers/categories.controller.js';
import { DELETEPRODUCTS, GETPRODUCTS, GETPRODUCTSBYID, POSTPRODUCTS, PUTPRODUCTS } from './controllers/products.controller.js';
import { DELETESUBCATEGORIES, GETSUBCATEGORIES, GETSUBCATEGORIESBYID, POSTSUBCATEGORIES, PUTSUBCATEGORIES } from './controllers/subCategories.controller.js'
const app = express();
app.use( express.json() )
const PORT = process.env || 5000

app.get('/categories', GET)
app.get('/categories/:id', GETBYID)
app.post('/categories', POST)
app.put('/categories/:id', PUT)
app.delete('/categories/:id', DELETE)

app.get('/subcategories', GETSUBCATEGORIES)
app.get('/subcategories/:id', GETSUBCATEGORIESBYID)
app.post('/subcategories', POSTSUBCATEGORIES)
app.delete('/subcategories/:id', DELETESUBCATEGORIES)
app.put('/subcategories/:id', PUTSUBCATEGORIES)

app.get('/products', GETPRODUCTS)
app.get('/products/:id', GETPRODUCTSBYID)
app.post('/products', POSTPRODUCTS)
app.delete('/products/:id', DELETEPRODUCTS)
app.put('/products/:id', PUTPRODUCTS)


app.listen(PORT, () => console.log('server ready at *5000'))