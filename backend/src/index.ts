import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "@/routes/users.route";
import productsRouter from "@/routes/products.route";
import errorHandler from "@/middlewares/errorHandler.middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
