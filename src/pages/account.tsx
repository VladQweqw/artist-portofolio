import ArticleWrapper from "../components/ArticleWrapper";
import Title from "../components/headerTitle";
import useFetch, { endpoint } from "../components/useFetch";

import Gallery from "../components/galley";
import { useEffect, useRef } from "react";

export default function Account() {
    const token = JSON.parse(sessionStorage.getItem('token') || '')
    const image_ref = useRef<null | HTMLImageElement>(null)
    const { data, isLoading, error }: {
        data: UserType,
        isLoading: boolean,
        error: string | null
    } = useFetch({
        method: "GET",
        url: `user/jwt`,
        headers: {
            withCredentials: true,
            'Authorization': `Bearer ${token}`,
        },
        data: {},
    })

    if (isLoading) return <h1>Loading...</h1>
    if (error) return <h1>Error occured..</h1>

    if (data)
        return (
            <ArticleWrapper class="account">

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
                            ref={image_ref}
                            className="photo-of-me" />

                    </div>
                    {image_ref.current ? <UserUpdate imgRef={image_ref.current} user={data} /> : ''}

                    <a href={`mailto:${data.email}`}>Email me: {data.email}</a>
                </div>

                <div className="gallery-wrapper">
                    <UserWork id={data._id} />
                </div>
            </ArticleWrapper>
        )
}


function UserWork(user: {
    id: string | undefined
}) {
    const { data, isLoading, error }: {
        data: ArtPieceType[],
        isLoading: boolean,
        error: string | null
    } = useFetch({
        method: "GET",
        url: `pieces/user/${user.id}`,
        headers: {},
        data: {},
    })

    if (isLoading) return <h1>Loading...</h1>
    if (error) return <h1>Error occured..</h1>
    console.log(data);

    if (data?.length && !isLoading && !error)
        return <>
            {data?.length && <Gallery isAuthor={true} title="My work" data={data} />}
        </>

}

function UserUpdate(props: {
    imgRef: HTMLImageElement | null,
    user: UserType
}) {

    const form = useRef<HTMLFormElement | null>(null)

    const { data, isLoading, error, call }: {
        data: UserType,
        isLoading: boolean,
        error: string | null
    } = useFetch()

    function updateUser() {

        const formData = new FormData()
        
        formData.append('name', form.current!.name.value || props.user.name)
        formData.append('image_of_artist', form.current!.image_of_artist.files[0] || props.user.image_of_artist)
        
        call({
            method: "PUT",
            url: `user/${props.user._id}`,
            headers: {},
            data: formData,
        })
    }

    useEffect(() => {
        console.log(data, error);

    }, [data])


    return (<>
        <div className="updates">

            <form action="" 
            ref={form}>
                <input 
                    onChange={(e) => {
                        const target = (e.target as HTMLInputElement)
                        const file = target.files ? target.files[0] : null;

                        const imgEl = props.imgRef
                        console.log(imgEl);
                        
                        if (file) {
                            const reader = new FileReader();

                            reader.onload = (e: ProgressEvent<FileReader>) => {
                                if (e.target) {
                                    imgEl!.src = e.target.result as string;
                                }
                            };

                            reader.readAsDataURL(file);
                        }
                    }}

                    type="file" 
                    name="update-image"
                     id="image_of_artist" />

                <div className="update-name input">
                    <input
                        type="text" 
                        id="name"
                        defaultValue={props.user.name} 
                        placeholder="Update name" 
                        className="input-field" />
                </div>
            </form>

            {isLoading ? <p>Loading...</p> :
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        updateUser()
                    }}
                    className="btn">Save changes</button>}
            {error ? "An error occured" : ""}
        </div>

    </>)
}