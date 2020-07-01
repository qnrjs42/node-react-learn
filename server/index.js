const express = require('express');
const app = express()

const bodyParser = require('body-parser');
const cors = require('cors');
const cors_origin = ['http://localhost:3000'];
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: cors_origin, // 허락하고자 하는 요청 주소

    credentials: true // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
  })
);

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! ffff'))

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요~");
})

app.post('/api/users/register', (req, res) => {
    // 회원 가입시 필요한 정보들을 client에서 가져오면
    // 그 정보들을 DB에 삽입

    const _user = new User(req.body);

    _user.save((err, userInfo) => {
        if(err) {
            return res.json({success: false, err})
        }

        return res.status(200).json({
            success: true
        })
    })
})

app.post("/api/users/login", (req, res) => {
  // 요청된 이메일을 DB에서 찾음
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      });
    }

    // 요청된 이메일이 DB에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        });

      // 비밀번호까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // token을 저장
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      })
    })
  })
})
// role 1 = 어드민      role 2 = 특정 부서 어드민
// role 0 = 일반 유저   role 0이 아니면 관리자
app.get("/api/users/auth", auth, (req, res) => {
    // 여기 까지 미들웨어 통과해 왔다는 얘기는 Authentication이 True라는 뜻
    res.status(200).json({
        _id: req.user.id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    
    User.findOneAndUpdate({ _id:req.user._id }, 
        { token: "" },
        (err, user) => {
            if(err) return res.json({ success: false, err });

            return res.status(200).send({
              success: true  
            })
        }
        )
})

const port = 5000;

app.listen(port, () => console.log(`Example App listening on port ${port}`))