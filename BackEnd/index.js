// inbuilt package imports
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');

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
app.use(express.static('./ProfilePictures/Common'));

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

app.post('/getPostedJobs', (req, res) => {
  JobComponent.getPostedJobs(req, res, pool);
})

app.post('/createEvent', (req, res) => {
  EventComponent.createEvent(req, res, pool);
});

app.post('/listCompanyCreatedEvents', (req, res) => {
  EventComponent.listCompanyCreatedEvents(req, res, pool);
});

const companyProfilePictureStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './ProfilePictures/Company');
  },
  filename(req, file, cb) {
    cb(null, `company_${req.body.company_id}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
  },
});

const companyProfilePictureUpload = multer({ storage: companyProfilePictureStorage });

app.post('/updateCompanyProfile', companyProfilePictureUpload.single('file'), (req, res) => {
  ProfileComponent.companyUpdateProfile(req, res, pool);
});

app.post('/getCompanyDetails', (req, res) => {
  ProfileComponent.getCompanyProfile(req, res, pool);
});

const studentProfilePictureStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './ProfilePictures/Student');
  },
  filename(req, file, cb) {
    cb(null, `student_${req.body.student_id}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
  },
});

const studentProfilePictureUpload = multer({ storage: studentProfilePictureStorage });

app.post('/updateStudentProfile', studentProfilePictureUpload.single('file'), (req, res) => {
  ProfileComponent.studentUpdateProfile(req, res, pool);
});

app.post('/getStudentDetails', (req, res) => {
  ProfileComponent.getStudentProfile(req, res, pool);
});

app.post('/createEducation', (req, res) => {
  ProfileComponent.createEducation(req, res, pool);
});

app.post('/updateEducation', (req, res) => {
  ProfileComponent.updateEducation(req, res, pool);
});

app.post('/deleteEducation', (req, res) => {
  ProfileComponent.deleteEducation(req, res, pool);
});

app.post('/getStudentAllEducation', (req, res) => {
  ProfileComponent.getAllEducation(req, res, pool);
});

app.post('/createProfessionalExperience', (req, res) => {
  ProfileComponent.createProfessionalExperience(req, res, pool);
});

app.post('/updateProfessionalExperience', (req, res) => {
  ProfileComponent.updateProfessionalExperience(req, res, pool);
});

app.post('/deleteProfessionalExperience', (req, res) => {
  ProfileComponent.deleteProfessionalExperience(req, res, pool);
});

app.post('/getStudentAllProfessionalExperience', (req, res) => {
  ProfileComponent.getAllProfessionalExperience(req, res, pool);
});

const server = app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
