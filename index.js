const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0'; 
const { mogoUrl } = require('./keys')


require('./models/userData');

const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')
const patientRoutes = require('./routes/patientData')
const zielenGameRoutes = require('./routes/zielenGame')
const zielenTrainingRoutes = require('./routes/zielenTraining')
const tippenGameRoutes = require('./routes/tippenData')
const gewindeDataRoutes = require('./routes/gewindeData')
const nachfahrenDataRoutes = require('./routes/nachfahrenData')
const turmeDataRoutes = require('./routes/turmeData')
const klotzeDataRoutes = require('./routes/klotzeData')
const umdrehenDataRoutes = require('./routes/umdrehenData')

app.use(bodyParser.json())
app.use(authRoutes)
app.use(patientRoutes)
app.use(zielenGameRoutes)
app.use(zielenTrainingRoutes)
app.use(tippenGameRoutes)
app.use(gewindeDataRoutes)
app.use(turmeDataRoutes)
app.use(nachfahrenDataRoutes)
app.use(klotzeDataRoutes)
app.use(umdrehenDataRoutes)


mongoose.connect(mogoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("Connected")
})
mongoose.connection.on('error', (err) => {
    console.log("Error", err)
})

app.get('/', requireToken, (req, res) => {
    res.send({ email: req.user.email, doctorId: req.user.doctorId })
})
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});