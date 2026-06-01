import Cookies from "js-cookie";

const setToken = (token, expires_in) => {
    const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;
    if (!ACCESS_TOKEN_KEY) {
        throw new Error("NEXT_PUBLIC_AUTH_TOKEN_NAME is not defined");
    }
    // convert minutes to days
    const days = expires_in / (60 * 24)
    // Set the token in cookies
    Cookies.set(ACCESS_TOKEN_KEY, token, {
        expires: days || 7,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
}

export default setToken