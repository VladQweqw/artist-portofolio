import { useEffect, useRef } from "react";
import ArticleWrapper from "../components/ArticleWrapper";
import Title from "../components/headerTitle";
import useFetch from "../components/useFetch";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
export default function Signup() {

    const form = useRef<null | HTMLFormElement>(null)
    const navigate = useNavigate()

    const { data, isLoading, error, call } = useFetch()

    function signupHandler() {        
        const formData = new FormData()
        formData.append('password', form.current!.pwd.value)
        formData.append('email', form.current!.email.value)
        formData.append('name', form.current!.username.value)
        formData.append('image_of_artist', "noimage")
        
        call({
            method: "POST",
            data: formData,
            url: "auth/register",
           headers: {
            credentials: 'include',
           }
        })
        
    }

    useEffect(() => {
        console.log(data, error);
        
        if(data) {
            navigate('/login')
        }

    }, [data, error])
    

   return(
    <ArticleWrapper class="admin">
        <form ref={form} action="" className="admin-form form">
            <Title>Sign up</Title>
            
            <div className="input">
                <label htmlFor="email">Username</label>
                <input className="input-field" type="text" id="username" />
            </div>
            <div className="input">
                <label htmlFor="email">Email</label>
                <input className="input-field" type="email" id="email" />
            </div>
            <div className="input">
                <label htmlFor="pwd">Password</label>
                <input className="input-field" type="password" id="pwd" />
            </div>

            {isLoading ?
            <button 
            className="send-btn btn primary-btn"
            >Loading...</button>
            :
            <button 
                className="send-btn btn primary-btn"
                onClick={(e) => {
                    e.preventDefault()
                    signupHandler()
                }}
                >Sign up</button>
            }
            
            <div className="switch">
                <p>Already have an account? <Link to='/login'>login in here</Link></p>
            </div>
        </form>
    </ArticleWrapper>
   )
}