import express from "express";
import { adminJs, adminJsRouter } from "./adminjs";
import { sequelize } from "./database";
import { router } from './routes'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(router)
app.use(adminJs.options.rootPath, adminJsRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  await sequelize.authenticate().then(() => {
    console.log('DB connection successful')
  })
  console.log(`Server started at port ${PORT}`)
})