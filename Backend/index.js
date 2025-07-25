import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import router from "./routes/routes.js";
import cors from 'cors';


const app = express();
// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
    cors({
        origin: "http://localhost:5174",  // your frontend URL
        credentials: true,                // allow cookies/credentials
    })
);

app.use('/api',router)

app.use(errorMiddleware);
// Routers

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port  http://localhost:${process.env.PORT}`);
    await connectDB();
}
);