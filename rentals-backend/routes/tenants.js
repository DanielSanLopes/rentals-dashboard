import express from "express";
import { getTenants, createTenant, updateTenant, deleteTenant } from "../Controllers/tenants.js";

const routes = express.Router();

routes.put("update/:id", updateTenant)

routes.delete("delete/:id", deleteTenant)

routes.get("/", getTenants)

routes.post("/", createTenant)





export default routes;
