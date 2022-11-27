import { read, write } from '../utils/model.js'

const GETPRODUCTS = (req, res) => {
    let subCategories = read('subCategories')
    let categories = read('categories')
    let products = read('products')
    let { categoryId, subCategoryId, model, price, productName, color } = req.query
    if (req.query) {
        let filteredProducts =  products.filter(item => {
            let subCategory = subCategoryId ? item.sub_category_id == subCategoryId : true
            let models = model ? item.model == model : true;
            let prices = price ? item.price == price : true;
            let productNames = productName ? item.product_name == productName : true;
            let colors = color ? item.color == color : true;
            
            return subCategory && models && prices && productNames && colors
        })
        
        if (filteredProducts.length) {
            return res.send(filteredProducts)
        }
        
    } else {
        res.send([])
    }
}

const GETPRODUCTSBYID = (req, res) => {
    let { id } = req.params
    let products = read('products')
    
    let product = products.find(item => item.product_id == id)
    
    res.send(product)
}

const POSTPRODUCTS = (req, res) => {
    let products = read('products')
    let { subCategoryId, model, productName, price, color } = req.body
    
    let newProduct = { product_id: products.at(-1)?.product_id + 1 || 1, sub_category_id: subCategoryId, model, color, price, product_name: productName }
    products.push(newProduct)
    write('products', products)
    res.status(201).json({ status: 201, message: 'product added', data: newProduct })
}

const DELETEPRODUCTS = (req, res) => {
    let { id } = req.params
    let products = read('products')
    let productIndex = products.findIndex(item => item.product_id == id)
    if (productIndex != -1) {
        let product = products.splice(productIndex, 1)
        write('products', products)
        return res.status(200).json( {status: 200, message: 'product deleted', data: product} )
    } else {
        return res.status(404).json( {status:400, message: 'product not found'} )
    }
}

const PUTPRODUCTS = (req, res) => {
    let { id } = req.params
    let { subCategoryId, productName, price, color, model } = req.body
    let products = read('products')
    let product = products.find(item => item.product_id == id)
    
    if (!product) {
        return res.status(404).json( {status:400, message: 'product not found'} )
    } else {
        product.product_name = productName || product.product_name
        product.sub_category_id = subCategoryId || product.sub_category_id
        product.price = price || product.price
        product.color = color || product.color
        product.model = model || product.model
        write('products', products)
        return res.status(200).json( {status: 200, message: 'product updated', data: product} )
    }
}

export {
    GETPRODUCTS,
    GETPRODUCTSBYID,
    POSTPRODUCTS,
    DELETEPRODUCTS,
    PUTPRODUCTS
}