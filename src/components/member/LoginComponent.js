import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLoginThunk, requestLogin } from "../../reducers/loginSlice";


const initState = {
  email: "user00@aaa.com",
  pw: "1111"
}

const LoginComponent = () => {

  const loginState = useSelector(state => state.login)

  const [loginInfo, setLoginInfo] = useState({ ...initState })

  const dispatch = useDispatch()

  const errorMsg = loginState.errorMsg

  console.log("e: ", errorMsg)

  return (
    <div className="font-bold text-2xl text-yellow-300">
      <div className="text-3xl bg-red-500">
        {loginState.loading ? "로그인중..." : ""}
      </div>

      {errorMsg ? <div className="text-3xl bg-red-500">이메일과 패스워드를 다시 확인해 주세요.</div> : <></>}

      <div className="w-96 m-2 p-2 ">
        <label>Email : </label>
        <input className="ml-[11%] text-black bg-transparent backdrop-blur-md border-2 rounded-lg "
          type="text"
          name="email"
          value={loginInfo.email}
          onChange={() => { }}
        ></input>
      </div>
      <div className="w-96 m-2 p-2">
        <label>Password : </label>
        <input className="ml-[3%] text-black bg-transparent backdrop-blur-md border-2 rounded-lg"
          type="password"
          name="pw"
          value={loginInfo.pw}
          onChange={() => { }}
        ></input>
      </div>
      <div>
        <button className="text-3xl text-white m-2 p-2" 
        onClick={() => dispatch(postLoginThunk(loginInfo))}> Login </button>
      </div>
    </div>
  );
}

export default LoginComponent;