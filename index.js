const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT; // 3000 is a fallback for local development
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const { mogoUrl } = require('./keys');

// Enable CORS for all routes
app.use(cors({
  origin: 'exp://192.168.1.7:8081',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));


app.options('*', cors()); // Enable preflight requests for all routes

app.use(bodyParser.json());
require('./models/userData');

const requireToken = require('./middleware/requireToken');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientData');
const zielenGameRoutes = require('./routes/zielenGame');
const zielenTrainingRoutes = require('./routes/zielenTraining');
const tippenGameRoutes = require('./routes/tippenData');
const gewindeDataRoutes = require('./routes/gewindeData');
const nachfahrenDataRoutes = require('./routes/nachfahrenData');
const turmeDataRoutes = require('./routes/turmeData');
const klotzeDataRoutes = require('./routes/klotzeData');
const umdrehenDataRoutes = require('./routes/umdrehenData');
const kreuzenDataRoutes = require('./routes/kreuzenData');


app.use(authRoutes);
app.use(patientRoutes);
app.use(zielenGameRoutes);
app.use(zielenTrainingRoutes);
app.use(tippenGameRoutes);
app.use(gewindeDataRoutes);
app.use(turmeDataRoutes);
app.use(nachfahrenDataRoutes);
app.use(klotzeDataRoutes);
app.use(umdrehenDataRoutes);
app.use(kreuzenDataRoutes);

mongoose.connect(mogoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log("Connected");
});

mongoose.connection.on('error', (err) => {
  console.log("Error", err);
});

app.get('/', requireToken, (req, res) => {
  res.send({ name: req.user.name, email: req.user.email, doctorId: req.user.doctorId });
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})
