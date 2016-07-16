var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var addQuestion = require('./addQuestions');
var insQ = require('./addQuestions');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var questprovider = new qProvider('localhost',27017);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Trivia
app.get('/', function(req, res){
  addQuestion.findAll(function(error, emps){
    res.render('index', {
      title: 'QuestDB',
    });
  });
});

app.get('/questions/new', function(req, res) {
  res.render('latestQA', {
    title: 'New Question'
  });
});

//save new employee
app.post('/questions/new',function(req,res){
    console.log("KAMLESH" +req.param('QuestionText'));
  questprovider.Save({
    Description: req.param('QuestionText'),
    Weightage:   req.param('AnswerWeightage'),
    Category:    req.param('QuestionCategory'),
    QuestionType: req.param('QuestionType'),
    QuestionMIMEType: req.param('QuestionMIMEType'),
    QuestionClassification: req.param('QuestionClassification'),
    QuestionScope: req.param('QuestionScope'),
    QuestionActivationStatus:req.param('QuestionActivationStatus'),
    Option1:     req.param('QuestionOption1'),
    Option2:     req.param('QuestionOption2'),
    Option3:     req.param('QuestionOption3'),
    Option4:     req.param('QuestionOption4'),
    AnswerText: req.param('AnswerText'),
    FileAttached:req.param('fileAttach')
  });
});


app.listen(7000);
module.exports = app;





