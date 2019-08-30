const AssistantV1 = require('ibm-watson/assistant/v1');
var express = require('express');
const path = require('path');
var bodyParser  = require('body-parser');

var app = express();
app.use(bodyParser.json());

const service = new AssistantV1({
    version: "2019-02-28",
    iam_apikey: "WL52KYzL6sCjLHhwIf3Jj2sYXRlRAbAvnNTNqByeYE1A",
    url: "https://gateway.watsonplatform.net/assistant/api/"
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/message', function(req, res){
    params = {
        workspace_id: 'f32c3653-9b64-43ed-88f9-bc31a98e8878',
        input: {'text': ""}
    }

    service.message(params).then(answer=>{
        res.send(answer)
    })
    .catch(err => console.log(err))
});

app.post('/message', function(req, res){
    params = {
        workspace_id: 'f32c3653-9b64-43ed-88f9-bc31a98e8878',
        input: {'text': req.body.text},
        context: req.body.context
    }

    service.message(params).then(answer=>{
        res.json(answer)
    })
    .catch(err => console.log(err))
});

var port = process.env.PORT || 3000

app.listen(port, function(){
    console.log("Server running!")
})