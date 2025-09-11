import express from 'express'


import {getGenres,getProducts} from '../controllers/productsControllers.js'




export const productsRouter = express.Router()

productsRouter.get("/products",getProducts)
productsRouter.get("/products/genres",getGenres)
