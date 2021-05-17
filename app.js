require('dotenv').config(); // 5.4k (gripped: 2.2k)
const express = require("express");
const path = require("path");
// const hbs = require("handlebars");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// var hbs = exphbs.create({ /* config */ });

const app = express();

const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, '/public')));

// Static Folder
// app.use(express.static(path.join(__dirname, "/public")));

// Body Parser MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "main-layout",
    layoutsDir: `${__dirname}/views/layouts/`,
  })
);
app.set("view engine", "hbs");


// Static Folder
// app.use(express.static(path.join(__dirname, "public")));

// template engine root
app.get("/", (req, res) => {
  res.render("index",{
    title:"Stride_es | Home"
  });
});

app.post("/index", (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "${{{req.body.email}}}", // sender address
    to:"bardeaditya55@gmail.com", // list of receivers
    // to:"sales@stride-es.com",
    subject: "AB", // Subject line
    text: "Hello From AB WEBDev", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", { msg: "Email has been sent" });
  });
});



app.get("/index", (req, res) => {
  res.render("index",{
    title: "Stride_es | Home",
  });
});
app.get("/about", (req, res) => {
  res.render("about",{
    title: "Stride_es | About",
  });
});
app.get("/contact", (req, res) => {
  res.render("contact" ,{
    title: "Stride_es | Contact-Us",
  });
});
app.get("/products", (req, res) => {
  res.render("products" ,{
    title: "Stride_es | Products",
  });
});

app.listen(port, () => {
  console.log(`Server is running on PORT :${port}`);
});
