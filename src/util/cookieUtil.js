import { Cookies } from "react-cookie";
import { useSelector } from "react-redux";

const cookies = new Cookies()

export const setCookie = (cookieName, value, days) => {

  const expires = new Date()
  expires.setUTCDate(expires.getUTCDate() + days);

  cookies.set(cookieName, value, { path: "/", expires: expires })

}

export const getCookie = (cookieName) => {

  return cookies.get(cookieName) //문자열 반환

}

export const removeCookie = (cookieName, path = "/") => {

  cookies.remove(cookieName, { path: path })

}