import { useEffect, useRef } from "react";
import ArticleWrapper from "../components/ArticleWrapper";
import Title from "../components/headerTitle";
import useFetch from "../components/useFetch";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Login() {
    const form = useRef<null | HTMLFormElement>(null)
    const navigate = useNavigate()

    const { data, isLoading, error, getData } = useFetch("auth/login", {}, false)

    function setUserStatus() {
        if(data?.access_token) {
            sessionStorage.setItem('isUser', JSON.stringify(true))
            navigate('/')
        }else {
            sessionStorage.setItem('isUser', JSON.stringify(false))

        }
    }

    function loginHandler() {        
        const formData = new FormData()
        formData.append('password', form.current!.pwd.value)
        formData.append('email', form.current!.email.value)
        
        getData("auth/login", {
            method: "POST",
            body: formData,
        
            credentials: 'include',

        })

    }

    useEffect(() => {
        console.log(data, error);
        
        setUserStatus()
    }, [data, error])
    
    

   return(
    <ArticleWrapper class="admin">
        <form
        ref={form}
        action="" 
        className="admin-form form">
            <Title>Login</Title>
            
            <div className="input">
                <label htmlFor="email">Email</label>
                <input className="input-field" type="email" id="email" />
            </div>
            <div className="input">
                <label htmlFor="pwd">Password</label>
                <input className="input-field" type="password" id="pwd" />
            </div>

            {data?.message ? 
            <p className="danger">Invalid credentials</p>
            : ""}
            {error ? 
            <p className="danger">Unexpected error</p>
            : ""}
            <button 
                className="send-btn btn primary-btn"
                onClick={(e) => {
                    e.preventDefault()
                    loginHandler()
                }}
                >
                    {isLoading ? "Loggin in..." : "Login"}
                </button>
                <div className="switch">
                <p>Dont't have an account? <Link to='/signup'>register here</Link></p>
            </div>
        </form>
    </ArticleWrapper>
   )
}