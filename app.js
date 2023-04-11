const express = require('express')
const app = express()
const port = 8080
const ProductManager = require('./ProductManager')
const product = new ProductManager()
const fs = require('fs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/api/products', async (req,res)=>{

    try {
        const {limit} = req.query
        const products = await product.getProducts()
        if (!limit) {
            return res.send({
                status: 'success', products
            })
        }
        return res.status(200).send({
            status:'success', products: products.slice(0,limit)
        })
    }
    catch(err){
        console.log(err)
        return res.status(400).send({status:'error',error:'Error'

        })
    }
})

app.get('/api/products/:pid', async (req,res)=>{

    try {
        const {pid} = req.params
        const productFound = await product.getProductById(parseInt(pid))
        if (!productFound) {
            return res.status(400).send({
                status: 'error', error: 'Producto no encontrado'
            })
        }
        return res.status(200).send({
            status:'success', productFound
        })
    }
    catch(err){
        console.log(err)
        return res.status(400).send({status:'error',error:'Error'

        })
    }
})

app.post('/api/products', async (req,res)=>{

try {
    let product_add = req.body
    product_add.status = true;
    add_product = await product.addProduct(product_add)
}
catch(err){
    console.log(err)
    return res.status(400).send({status:'error',error:'Error'

    })
}
})


app.put('/api/products/:pid', async (req,res)=>{

    try {
    const {pid} = req.params
    const product_put = req.body
    const products = await product.getProducts()
    const index = products.findIndex(prod =>prod.id === (parseInt(pid)))
    console.log(index)
    if (index === -1) return res.status(400).send({status:'error',error:'El producto con el ID descrito no existe'})
    products[index] = {id: pid,...product_put}
    product.writeProducts(products)
    }
    catch(err){
        console.log(err)
        return res.status(400).send({status:'error',error:'Error'
    
        })
    }
    })

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})