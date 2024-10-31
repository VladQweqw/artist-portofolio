import { useEffect } from "react"
import Title from "./headerTitle"
import useFetch, { endpoint } from "./useFetch"
import { useNavigate } from "react-router"

export default function Gallery(props: {
    data: ArtPieceType[],
    title: string,
    isAuthor: boolean,
} | null) {
    const navigate = useNavigate()

    const { data, isLoading, error, call }: {
        data: UserType,
        isLoading: boolean,
        error: string | null
    } = useFetch()

    function removePiece(id: string) {

        call({
            method: "DELETE",
            url: `pieces/${id}`,
            headers: {},
            props: {},
        })
    }

    useEffect(() => {
        if (data) {
            window.location.reload()
        }

    }, [data, error])

    return (
        <article className="gallery article">
            {props?.title ? <Title>{props?.title}</Title> : ""}
            {isLoading ? <p>Loading...</p> : ""}
            {error ? <p>An errro occured</p> : ""}

            <div className="grid-images">
                {
                    props?.data.length && props?.data?.map((image: ArtPieceType, index: number) => {
                        let classes = ""
                        if (image.width > 500 && image.height > 500) {
                            classes += "vh-span"
                        } else if (image.width > 500) {
                            classes += "h-span"
                        } else if (image.height > 500) {
                            classes += "v-span"
                        }
                        return <div className={`grid-image ${classes}`}>
                            <img
                                key={index}
                                src={`${endpoint + image.image_url.slice(1)}`}
                                alt={image.title}
                                loading="lazy"
                                onClick={() => {
                                    navigate(`/pieces/${image._id}`)
                                }}
                                className="image" />

                            <span
                                onClick={() => {
                                    navigate(`/users/${image.user_id._id}`)
                                }}
                                className="user">
                                <div className="image-wrapper">
                                    <img
                                        src={`${endpoint + image.user_id.image_of_artist.slice(1)}`}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1`
                                        }}
                                        alt={image.user_id.email} />
                                </div>
                                <span className="user-details">
                                    <h4 className="user-name">{image.user_id.name}</h4>
                                </span>
                            </span>

                            {props.isAuthor ?

                                <span
                                    onClick={() => {
                                        removePiece(image._id)
                                    }}
                                    className="delete-piece">
                                    <i className="fa-solid fa-trash-can"></i>
                                </span> : ""}
                        </div>
                    })
                }
            </div>
        </article>
    )
}