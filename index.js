const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const app = express();

const db = require('./config/mongoose');
const Contact = require('./model/contact');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'))
app.use(express.static('assets'))
app.use(express.urlencoded());




app.get('/', function(req, res){

    Contact.find({}, function(err, contactlist){
        if(err){
            console.log('Error in fetching contacts form Db');
            return;
        }

        res.render('file',{
        title: "Contact List", 
        contact_list: contactlist
        });
    });
  
});

app.post('/contact-add', function(req, res){
   
    
    Contact.create({
        name : req.body.Name,
        phone : req.body.Phone
    }, function(err, newContact){
        if(err){
            console.log("Error in creating Contact in DB");
            return;
        }
        return res.redirect('back');
    });
})

app.get('/delete-contact/', function(req, res){
    //Get the id fom the query URL

    let id = req.query.id;
    //find the contact in the db using id and delete

   Contact.findByIdAndDelete(id, function(err){
       if(err){
           console.log("Error in deleting object from db");
           return;
       }

       return res.redirect('back');
   });

    
})
 
app.listen(3000, function(error){
    if(error){
        console.log("Server is Not Started");
    }
    console.log("Server is working Perfectly");
})