var express = require('express');
var app = express();
var fs = require('fs');

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var hTml =  fs.readFileSync('index.html').toString();
var dateObj = {};

function convertDate(daTe){
    var date = new Date(daTe);
    var naturalDate = months[date.getMonth()] + ' ' + date.getDate().toString() + ', ' + date.getFullYear().toString();
    var unixDate = Date.parse(date);
    dateObj["unix"] = unixDate;
    dateObj["natural"] = naturalDate;
}

app.get('/:date', function(req, res){
    if(Boolean(parseInt(req.params.date))){
        if(Boolean(Date(parseInt(req.params.date)))){
            convertDate(parseInt(req.params.date));
        }
    }
    if(Boolean(Date.parse(req.params.date))){
        convertDate(req.params.date);
    }
        
    res.send(hTml + '\n' + '<h1 class="date">' + JSON.stringify(dateObj)) + '</h1>';
});

app.get('*', function(req, res){
    res.send(hTml);
});

app.listen(3000, function(){
    console.log('Timestamp app listening on port 3000!');
})
