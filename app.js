const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");
const _= require('lodash');

const app = express();
mongoose.connect("mongodb://localhost:27017/customereview", {useNewUrlParser: true,useUnifiedTopology:true});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const customerReview = {
  Name:String,
  designation:String,
  content:String
}

const Customer = mongoose.model("Customer",customerReview);


app.get('/',function(req,res){
  Customer.find({},function(err,customer){
    res.render("home", {

      customer:customer
      });
  })
})

app.get("/compose", function(req, res){

  res.render("compose");
});

app.post("/compose", function(req, res){
  const customer = new Customer({
    Name: req.body.Name,
    designation: req.body.designation,
    content:req.body.content
  });

  customer.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });

});
app.listen("3000",function(){
  console.log("Hey its working on port 3000");
})
