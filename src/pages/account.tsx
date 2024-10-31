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

                <div className="add-content-wrapper">
                    <AddContent user={data} />
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

function AddContent(props: {
    user: UserType
}) {
    const form = useRef<HTMLFormElement | null>(null)
    const imgEl = useRef<HTMLImageElement | null>(null)

    const { data, isLoading, error, call }: {
        data: UserType,
        isLoading: boolean,
        error: string | null
    } = useFetch()

    function createPiece() {

        const formData = new FormData()

        formData.append('title', form.current!.name.title || "Untitled")
        formData.append('image_url', form.current!.image_url.files[0])
        formData.append('user_id', props.user._id)

        call({
            method: "POST",
            url: `pieces`,
            headers: {},
            data: formData,
        })
    }

    useEffect(() => {
        if (data) {
            alert("Image uploaded")
        }
    }, [data])

    return <>
        <Title>Add a new post</Title>


        <form
            ref={form}
            action=""
            className="form">
            <div className="image-wrapper">
                <div className="img">
                    <img
                        src="https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
                        ref={imgEl}
                        alt="to-upload"
                    />
                </div>
                <input
                    onChange={(e) => {
                        const target = (e.target as HTMLInputElement)
                        const file = target.files ? target.files[0] : null;

                        if (file) {
                            const reader = new FileReader();

                            reader.onload = (e: ProgressEvent<FileReader>) => {
                                if (e.target) {
                                    imgEl.current!.src = e.target.result as string;
                                }
                            };

                            reader.readAsDataURL(file);
                        }
                    }}

                    type="file"
                    name="update-image"
                    id="image_url" />
            </div>

            <div className="update-name input">
                <input
                    type="text"
                    id="title"
                    placeholder="Title of the creation"
                    className="input-field" />
            </div>

            {isLoading ? <p>Loading...</p> :
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        createPiece()
                    }}
                    className="btn">Post it!</button>}
            {error ? "An error occured" : ""}

        </form>
    </>
}