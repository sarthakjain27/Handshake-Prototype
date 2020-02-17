// inbuilt package imports
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer  = require('multer')

const saltRounds = 10;

// my api package imports
const pool = require('./Database');
const Config = require('./config');
const Signup = require('./apis/signup');
const Login = require('./apis/login');
const JobComponent = require('./apis/jobComponent');
const EventComponent = require('./apis/eventComponent');
const ProfileComponent = require('./apis/profileComponent');


const app = express();
// setting view engine
app.set('view engine', 'ejs');
// use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use cookie parser to parse request headers
app.use(cookieParser());
// use session to store user data between HTTP requests
app.use(session({
  secret: 'sarthak_handshake_secure_string',
  resave: false,
  saveUninitialized: true,
}));
app.use(cors({ origin: `${Config.applicationAddress}:${Config.applicationPort}`, credentials: true }));
app.use(express.static('./ProfilePictures/Company'));
app.use(express.static('./ProfilePictures/Student'));

app.post('/signup', (req, res) => {
  Signup.signup(req, res, bcrypt, saltRounds, pool);
});

app.post('/login', (req, res) => {
  Login.login(req, res, bcrypt, pool);
});

app.post('/createJobPost', (req, res) => {
  JobComponent.createJobPost(req, res, pool);
});

app.post('/listCompanyPostedJobs', (req, res) => {
  JobComponent.listCompanyPostedJobs(req, res, pool);
});

app.post('/createEvent', (req, res) => {
  EventComponent.createEvent(req, res, pool);
});

app.post('/listCompanyCreatedEvents', (req, res) => {
  EventComponent.listCompanyCreatedEvents(req, res, pool);
});

const companyProfilePictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './ProfilePictures/Company')
  },
  filename: function (req, file, cb) {
    cb(null, 'company_' + req.body.company_id+'.'+file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});

var companyProfilePictureUpload = multer({ storage: companyProfilePictureStorage });

app.post('/updateCompanyProfile',companyProfilePictureUpload.single('file'),(req, res) => {
  ProfileComponent.companyUpdateProfile(req, res, pool);
});

app.post('/getCompanyDetails', (req, res) => {
  ProfileComponent.getCompanyProfile(req, res, pool);
})

const server = app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
