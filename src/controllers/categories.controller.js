import { read, write } from '../utils/model.js'

const GET = (req, res) => {
    let categories = read('categories')
    let subCategories = read('subCategories')
    
    let newData = categories.map(item => {
        let data = subCategories.filter(item2 => item2.category_id == item.category_id)
        
        data = data.map(item3 => {
            return {
                subCategoryId: item3.sub_category_id,
                subCategoryName: item3.sub_category_name
            }
        })
        
        return {
            categoryId: item.category_id,
            categoryName: item.category_name,
            subCategories: data
        }
    })
    
    res.send(newData)
}

const GETBYID = (req, res) => {
    let categories = read('categories');
    let subCategories = read('subCategories')
    let { id } = req.params;
    
    let category = categories.find(category => category.category_id == id)
    subCategories = subCategories.filter(item => item.category_id == category.category_id)
    subCategories = subCategories.map(item => {
        return {
            subCategoryId: item.sub_category_id,
            subCategoryName: item.sub_category_name
        }
    })
    
    
    category = {
        categoryId: category.category_id,
        categoryName: category.category_name,
        subCategories: subCategories
    }
    
    res.send(category)
}

const POST = (req, res) => {
    let categories = read('categories')
    let { categoryName } = req.body;
    let newCategory = { category_id: categories.at(-1)?.category_id + 1 || 1, category_name: categoryName }
    categories.push(newCategory)
    write('categories', categories)
    res.status(201).json({ status: 201, message: 'category added', data: newCategory })
}

const DELETE = (req, res) => {
    let { id } = req.params
    let categories = read('categories')
    let categoryIndex = categories.findIndex(item => item.category_id == id)
    if (categoryIndex != -1) {
        let category = categories.splice(categoryIndex, 1)
        write('categories', categories)
        return res.status(200).json( {status: 200, message: 'category deleted', data: category} )
    } else {
        return res.status(404).json( {status:400, message: 'category not found'} )
    }
}

const PUT = (req, res) => {
    let { id } = req.params
    let { categoryName } = req.body
    let categories = read('categories')
    let category = categories.find(item => item.category_id == id)

    if (!category) {
        return res.status(404).json( {status:400, message: 'category not found'} )
    } else {
        category.category_name = categoryName || category.category_name
        write('categories', categories)
        return res.status(200).json( {status: 200, message: 'category updated', data: category} )
    }
}

export {
    GET,
    GETBYID,
    POST,
    DELETE,
    PUT
}