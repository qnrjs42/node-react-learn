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