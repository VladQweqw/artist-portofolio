import { useNavigate } from "react-router"
import { useEffect } from "react"

export default function Page404() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')
    }, [])

    return <></>
}