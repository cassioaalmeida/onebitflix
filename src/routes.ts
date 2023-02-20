import express from 'express'
import { categoriesController } from './controllers/categoryController'

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

export { router }