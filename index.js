const express = require('express');
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const { User } = require('./models/User');

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! ffff'))

app.post('/register', (req, res) => {
    // 회원 가입시 필요한 정보들을 client에서 가져오면
    // 그 정보들을 DB에 삽입

    const _user = new User(req.body);

    _user.save((err, userInfo) => {
        console.log(req.body);
        if(err) {
            console.error(err);
            return res.json({success: false, err})
        }

        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example App listening on port ${port}`))