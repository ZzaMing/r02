import axios from "axios"
import { getCookie, setCookie } from "./cookieUtil"

const jwtAxios = axios.create()

const beforeReq = (config) => {

  console.log("beforeRequest-----------------")

  const { accessToken } = getCookie("login")

  if (!accessToken) {
    // return Promise.reject("NO ACCESS TOKEN")
    throw new Error("NO ACCESS TOEKN !")
  }

  config.headers.Authorization = `Bearer ${accessToken}`

  return config

}

const requestFail = (err) => {

  console.log("request fail-------------")

  return Promise.reject(err)

}

const beforeRes = async (res) => {

  console.log("2xx Response------------", res.config)

  if (res.data.error === "Expired") {

    console.log("AccessToken has expired !")

    const newAccessToken = await refreshJWT()

    const originalRequest = res.config

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

    return await axios(originalRequest)

  }

  return res
}

const refreshJWT = async () => {

  const cookieValue = getCookie("login")

  const { accessToken, refreshToken } = cookieValue

  const header = {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  }

  const res = await axios.get(`http://localhost:8080/api/member/refresh?refreshToken=${refreshToken}`, header)

  console.log("===refresh===", res.data)

  cookieValue.accessToken = res.data.accessToken
  cookieValue.refreshToken = res.data.refreshToken

  setCookie("login", JSON.stringify(cookieValue), 1)

  return res.data.accessToken

}

const responseFail = (err) => {

  console.log("response fail --------------")

  return Promise.reject(err)

}

jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios;

