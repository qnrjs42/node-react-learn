react만 기록

client 폴더 - npx create-react-app .

-------------------------------------------------------------------------------------------------

_actions, _reducers : Redux를 위한 폴더

components/views : Page들을 넣음

components/views/Scetions : 이 안에는 해당페이지에 관련된 css파일인, components들을 넣는다

App.js : Routing 관련 일을 처리

Config.js : 환경 변수같은 것들을 정하는 곳

hoc : Higher Order Component 약자로 여러 군데에서 쓰일 수 있는 것들을
utils 이곳에 넣어둬서 어디서든 쓸 수 있게 해줌

-------------------------------------------------------------------------------------------------
VS Code Extentions

ES7 React/Redux/GraphQL/React-Native snippets
dsznajder

rfce ->
--------------------------
import React from "react";

function RegisterPage() {
    return (
        <div>
            
        </div>
    )
}

export default RegisterPage
--------------------------

rcc ->
--------------------------
import React, { Component } from 'react'

export default class RegisterPage extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
--------------------------

-------------------------------------------------------------------------------------------------

CORS 오류

1. 프록시로 해결
https://create-react-app.dev/docs/proxying-api-requests-in-development/

client : npm i http-proxy-middleware

2. cors 모듈로 해결

https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/lecture/37084?tab=question&q=36026

server : npm i cors

-------------------------------------------------------------------------------------------------
Concurrently를 이용해서 프론트, 백 서버 한 번에 켜기

server : npm i concurrently

server/package.json
"dev": "concurrently \"npm run backend\" \"npm run start --prefix client\"",

-------------------------------------------------------------------------------------------------
Antd CSS Framwork

https://ant.design/

npm i antd

-------------------------------------------------------------------------------------------------
Redux

Redux는 그냥 Vuex랑 비슷

client : npm i redux react-redux redux-promise redux-thunk

-------------------------------------------------------------------------------------------------
React Hooks

기존엔 class componet로 코드 짜면 길어지는데

React Hooks을 쓰면 코드가 짧아진다

-------------------------------------------------------------------------------------------------
Redux를 사용한 로그인 순서 // 회원가입도 비슷

1. LoginPage/LoginPage.js        / Dispatch
2. _actions/user_action.js       / Action
3. _reducers/user_reducer.js     / Reducer
4.  LoginPage/LoginPage.js       / Dispatch / response.payload.loginSuccess

LoginPage.js 파일에서 dispatch(loginUser(body))의 loginUser와
user_action.js 파일의 export function loginUser(dataSubmit) loginUser 이름이 같아야 한다

-------------------------------------------------------------------------------------------------
로그아웃 순서

1. LandingPage/LandingPage.js   / 로그아웃 버튼
2. server/index.js              / app.get('/api/users/logout', auth, (req, res)
3.  LoginPage/LoginPage.js      / 로그인 페이지

-------------------------------------------------------------------------------------------------
HOC
