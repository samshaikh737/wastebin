const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//db
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/wastebin", {})
  .then(() => {
    console.log("DB is connected");
  })
  .catch((e) => console.log(`DB is not connected ${e.message}`));

//db
const Document = require("./models/Documents");

app.get("/", (req, res) => {
  const code = `Welcome to WasteBin Clone made by sameer shaikh

Use the commands in the top right corner
to create a new file to share with other.`;

  res.render("display-code", { code });
});


app.get("/new", (req, res) => {
  res.render("new", {});
});

app.post("/save", async (req, res) => {
    const value = req.body.value;
  try {
    const document = await new Document({value}).save();
    res.redirect(`/${document._id}`)
  } catch (error) {
      res.render("new",{ value })
  }
});

app.get("/:id",async (req,res)=>{
    try {
        const document = await Document.findById(req.params.id);
        res.render("display-code",{ code : document.value , id : req.params.id })
    } catch (error) {
        res.redirect("/new")
    }
});

app.get("/:id/duplicate",async (req,res)=>{
    try {
        const document = await Document.findById(req.params.id);
        res.render("new",{ value : document.value  })
    } catch (error) {
        res.redirect("/new")
    }
})

app.listen(port, () => {
  console.log(`Server is listing on PORT : ${port}`);
});
