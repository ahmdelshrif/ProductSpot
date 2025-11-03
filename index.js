path = require(`path`);

const cors = require("cors");

//تشغيل ال express
const express = require("express");
const app = express();
// استعداء ملف ال config
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
// الاتصال بال db
const morgan = require("morgan");
const db = require("./config/dbconnection");
// التعامل مع الاخطاء
const ApiError = require(`./utils/apierror`);
const globalerror = require(`./Medileware/globelerror`);

// middelware
const { mountrouter } = require(`./router/mounter`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, `uploads`)));

app.use(
  cors({
    origin: "http://localhost:3001", // السماح للـ frontend فقط
    credentials: true,
  })
);

// ربط ال db
db();

// التعامل مع middelware
mountrouter(app);

app.use((req, res, next) => {
  next(new ApiError(`Cannot find ${req.originalUrl} on this server!`, 400));
});

// مسك الاخطاء في middelware
app.use(globalerror);

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`APP Running ON PORT ${port} `);
});

//مسك الاخطاء الناتجه من ال catch
process.on(`unhandledRejection`, (err) => {
  console.error(`unhandledRejection ${err}`);
  server.close(() => {
    console.error(`shudown ....`);
    process.exit(1);
  });
});
