const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://theatre:sriram@ds161931.mlab.com:61931/theatre');

var seatModel = mongoose.model('seatSchema',{
    id: Number,
    reserved: Boolean
});




var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());



//
// for(i=1;i<=40;i++){
//     var seatData = new seatModel({
//         id: i,
//         reserved: false
//     })
//
//     seatData.save().then(function (doc) {
//         console.log(doc);
//     }, function (e) {
//         console.log(e)
//     });
// }

app.get('/data',function (req,res) {
    seatModel.find().then(function (doc) {
        res.json(doc.sort(function(a, b){return a.id-b.id}));
    }, function (e) {
        console.log(e);
    });
});

app.put('/booked/:id', function (req,res) {
    var id =req.params.id;
    seatModel.findById(id,function (err,docs) {
        if (err) {
            res.status(500).send(err);
        } else {
            docs.reserved = true;
            docs.save(function (err) {
                if(err){
                    console.log('error');
                }
                else{
                    console.log('success');
                }
            })
        }
    })

});




app.listen(port);
