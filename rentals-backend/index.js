import express from "express"
import cors from "cors"
import routes from "./routes/tenants.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", routes)

app.listen(8800)