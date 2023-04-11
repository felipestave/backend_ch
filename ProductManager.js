const fs = require('fs')
class ProductManager{
    constructor(){
        this.products = []
        this.path = './products.json'
    }

    async writeProducts(productosParsed){
        try{
        await fs.promises.writeFile(this.path,JSON.stringify(productosParsed),'utf-8')
        }
        catch(error){
        console.log(error)
    }
    }
   async getProducts (){
        try{
        let productos = await fs.promises.readFile(this.path,'utf-8')
        let prodParse= JSON.parse(productos)
        this.products = prodParse
        return this.products
        }
        catch (error){
            console.log(error)
        }
    }
    async addProduct (newProduct){
        if (!newProduct.title ||
            !newProduct.description ||
            !newProduct.price || 
            !newProduct.code || 
            !newProduct.stock ||
            !newProduct.category) return console.log('Campos faltantes')
            let product = this.products.some(prod => prod.code === newProduct.code)
            if (product) return console.log('El producto con el código '+newProduct.code +' ya existe')
            this.products.push({id: this.products.length + 1, ...newProduct})
            try{
                if (!product){
            await fs.promises.writeFile(this.path,JSON.stringify(this.products),'utf-8')
            console.log('Producto agregado')
            } 
            }
            catch (error){
            console.log(error)
            
            }
            
            
    }

    async getProductById(id){
        try{
        let productos = await fs.promises.readFile(this.path,'utf-8')
        let productosParsed= JSON.parse(productos)
        let product = productosParsed.find(prod => prod.id === id)
        if (!product) return console.log('No se encontró el producto')
        console.log(product)
        return product
        }
        catch(error){
            console.log(error)
        }
    }
    async updateProducById (idF,field,value){
        try{
        let productos = await fs.promises.readFile(this.path,'utf-8')
        let productosParsed= JSON.parse(productos)
        let objectFound = productosParsed.find(i => i.id === idF)
        objectFound[field]= value
        //console.log(objectFound)
        await fs.promises.writeFile(this.path,JSON.stringify(productosParsed),'utf-8')
}
       catch(error){
       console.log(error)
       }
}
async deleteById (idF){
    try{
    let productos = await fs.promises.readFile(this.path,'utf-8')
    let productosParsed= JSON.parse(productos)
    let productUpdate = productosParsed.filter(i => i.id !== idF)
    console.log(productUpdate)
    await fs.promises.writeFile(this.path,JSON.stringify(productUpdate),'utf-8')
}
   catch(error){
   console.log(error)
   }
}
}
    



function agregarProductos(){
product.addProduct({
title: 'producto prueba 1',
description: 'Este es un producto prueba 1',
price: "200",
thumbnail: 'Sin imagen',
code: 'abc1',
stock: 25
}),
product.addProduct({
    title: 'producto prueba 2',
    description: 'Este es un producto prueba 2',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc2',
    stock: 25
    }
    ),
    product.addProduct({
        title: 'producto prueba 3',
        description: 'Este es un producto prueba 3',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc3',
        stock: 25
        }
        ),
    product.addProduct({
        title: 'producto prueba 4',
        description: 'Este es un producto prueba 4',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc4',
        stock: 25
        }),
    product.addProduct({
            title: 'producto prueba 5',
            description: 'Este es un producto prueba 5',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc5',
            stock: 25
            }
    ),
    product.addProduct({
            title: 'producto prueba 6',
            description: 'Este es un producto prueba 7',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc6',
            stock: 25
            }
    ),
    product.addProduct({
            title: 'producto prueba 7',
            description: 'Este es un producto prueba 7',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc7',
            stock: 25
            }
    ),
    product.addProduct({
            title: 'producto prueba 8',
            description: 'Este es un producto prueba 8',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc8',
            stock: 25
            }
    ),
    product.addProduct({
            title: 'producto prueba 9',
            description: 'Este es un producto prueba 9',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc9',
            stock: 25
            }
    ),
    product.addProduct({
            title: 'producto prueba 10',
            description: 'Este es un producto prueba 10',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc10',
            stock: 25
            }
    )
    
}



// TESTING
const product = new ProductManager()
// // Primero Agregar productos
//agregarProductos()
// // Ver todos los productos
//product.getProducts()
// // Ver producto por ID
//product.getProductById(2)
// actualizar elemento por ID
//product.updateProducById(4,'title','modified')
// Borrar elemento por ID
//product.deleteById(4)

module.exports = ProductManager