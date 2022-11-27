import { read, write } from '../utils/model.js'

const GETSUBCATEGORIES = (req, res) => {
    let subCategories = read('subCategories')
    let products = read('products')
    
    let newData = subCategories.map(item => {
        let data = products.filter(item2 => item2.sub_category_id == item.sub_category_id)
        
        data = data.map(item3 => {
            return {
                product_id: item3.product_id,
                model: item3.model,
                productName: item3.product_name,
                color: item3.color,
                price: item3.price
            }
        })
        
        return {
            subCategoryId: item.sub_category_id,
            subCategoryName: item.sub_category_name,
            products: data
        }
    })
    
    res.send(newData)
}

const GETSUBCATEGORIESBYID = (req, res) => {
    let products = read('products');
    let subCategories = read('subCategories')
    let { id } = req.params;
    
    let subCategory = subCategories.find(subCategory => subCategory.sub_category_id == id)
    products = products.filter(item => item.sub_category_id == subCategory.sub_category_id)
    products = products.map(item => {
        return {
            product_id: item.product_id,
            model: item.model,
            productName: item.product_name,
            color: item.color,
            price: item.price
        }
    })
    
    
    subCategory = {
        subCategoryId: subCategory.sub_category_id,
        subCategoryName: subCategory.sub_category_name,
        products: products
    }
    
    res.send(subCategory)
}

const POSTSUBCATEGORIES = (req, res) => {
    let subCategories = read('subCategories')
    let { categoryId, subCategoryName } = req.body;
    let newSubCategory = { sub_category_id: subCategories.at(-1)?.sub_category_id + 1 || 1, category_id: categoryId, sub_category_name: subCategoryName }
    subCategories.push(newSubCategory)
    write('subCategories', subCategories)
    res.status(201).json({ status: 201, message: 'category added', data: newSubCategory })
}

const DELETESUBCATEGORIES = (req, res) => {
    let { id } = req.params
    let subCategories = read('subCategories')
    let subCategoryIndex = subCategories.findIndex(item => item.sub_category_id == id)
    if (subCategoryIndex != -1) {
        let subCategory = subCategories.splice(subCategoryIndex, 1)
        write('subCategories', subCategories)
        return res.status(200).json( {status: 200, message: 'subCategory deleted', data: subCategory} )
    } else {
        return res.status(404).json( {status:400, message: 'subCategory not found'} )
    }
}

const PUTSUBCATEGORIES = (req, res) => {
    let { id } = req.params
    let { subCategoryName } = req.body
    let subCategories = read('subCategories')
    let subCategory = subCategories.find(item => item.sub_category_id == id)

    if (!subCategory) {
        return res.status(404).json( {status:400, message: 'subCategory not found'} )
    } else {
        subCategory.sub_category_name = subCategoryName || subCategory.sub_category_name
        write('subCategories', subCategories)
        return res.status(200).json( {status: 200, message: 'subCategory updated', data: subCategory} )
    }
}

export {
    GETSUBCATEGORIES,
    GETSUBCATEGORIESBYID,
    POSTSUBCATEGORIES,
    DELETESUBCATEGORIES,
    PUTSUBCATEGORIES
}