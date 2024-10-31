import ArticleWrapper from "../components/ArticleWrapper";
import Title from "../components/headerTitle";
import useFetch, { endpoint } from "../components/useFetch";
import { useParams } from "react-router";

import Gallery from "../components/galley";

export default function About() {
    const { id } = useParams();
        
    const {data, isLoading, error }: {
        data: UserType,
        isLoading: boolean,
        error: string | null
    } = useFetch({
        method: "GET",
        url: `user/${id}`,
        headers: {},
        data: {},
    })


    
    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h1>Error occured..</h1>
    if(data)
    return (
        <ArticleWrapper class="about">
            
            <Title>{data?.name}</Title>

            <div className="about-wrapper">
                <div className="about-image-wrapper">
                    <img
                       src={`${endpoint + data.image_of_artist.slice(1)}`}
                       onError={(e) => {
                           (e.target as HTMLImageElement).src = `https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1`
                       }} 
                        alt={data.email}
                        loading="lazy"
                        className="photo-of-me" />

                </div>
                <a href={`mailto:${data.email}`}>Email me: {data.email}</a>
            </div>

            <div className="gallery-wrapper">
                <UserWork id={id} />
            </div>
        </ArticleWrapper>
    )
}


function UserWork(user: {
    id: string | undefined
}) {
    const {data, isLoading, error }: {
        data: ArtPieceType[],
        isLoading: boolean,
        error: string | null
    } = useFetch({
        method: "GET",
        url: `pieces/user/${user.id}`,
        headers: {},
        data: {},
    })

    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h1>Error occured..</h1>
    
    if(data?.length && !isLoading && !error)
    return <>
        {data?.length && <Gallery title="My work" data={data} />}
    </> 
    
}