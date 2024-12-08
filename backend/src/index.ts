import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "@/routes/users.route";
import productsRouter from "@/routes/products.route";
import cartsRouter from "@/routes/carts.route";
import ordersRouter from "@/routes/orders.route";
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

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
