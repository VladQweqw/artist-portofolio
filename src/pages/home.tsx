import Quote from "../components/quote"
import Navbar from "../components/navbar"
import Gallery from "../components/galley"

import useFetch from "../components/useFetch"
import { useEffect } from "react"

export default function Home() {

   const { data, isLoading, error } = useFetch({
      method: "GET",
      url: "pieces",
      data: {},
      headers: {}
   })

   useEffect(() => {
      // console.log(data,);

   }, [data, error])


   return (<>
      <Quote />
      <Navbar />
      {isLoading ? <p>Loading...</p> : ""}
      {error ? <p>Error ocucred...</p> : ""}
      {data?.length ? <Gallery data={data} /> : ""}
     
   </>)
}