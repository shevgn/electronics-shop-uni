import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "@/routes/users.route";
import productsRouter from "@/routes/products.route";
import ordersRouter from "@/routes/orders.route";
import brandsRouter from "@/routes/brands.route";
import categoriesRouter from "@/routes/categories.route";
import errorHandler from "@/middlewares/errorHandler.middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/brands", brandsRouter);
app.use("/categories", categoriesRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
