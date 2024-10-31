import ArticleWrapper from "../components/ArticleWrapper";
import Title from "../components/headerTitle";
import useFetch, { endpoint } from "../components/useFetch";
import { useParams } from "react-router";

export default function PiecePage() {
    const { id } = useParams();
        
    const {data, isLoading, error }: {
        data: ArtPieceType,
        isLoading: boolean,
        error: string | null
    } = useFetch({
        method: "GET",
        url: `pieces/${id}`,
        headers: {},
        data: {},
    })

    console.log(data);
    
    
    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h1>Error occured..</h1>
    if(data)
    return (
        <ArticleWrapper class="artPiecePage">
            <Title>{data?.title}</Title>
            <div className="image-wrapper">
                <img
                        src={endpoint + data?.image_url.slice(1)}
                        alt={data?.title}
                        loading="lazy"
                        className="individual-image" />
            </div>

           <UserDetails data={data.user_id} />
        </ArticleWrapper>
    )
}

function UserDetails(user: {
    data: UserType
}) {
    return(
        <>
            <Title>About the Author</Title>

            <div className="about-wrapper">
                <div className="about-image-wrapper">
                    <img
                        src={`${endpoint + user.data.image_of_artist.slice(1)}`} 
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1`
                        }} 
                        alt={user.data.email}
                        loading="lazy"
                        className="photo-of-me" />

                </div>
                <a href={`mailto:${user.data.email}`}>Email me: {user.data.email}</a>
            </div>
        
        </>
    )
}