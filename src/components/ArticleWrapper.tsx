
export default function ArticleWrapper(props: {
    children: React.ReactNode,
    class: string
}) {

    return (
        <article className={`article ${props.class}`}>
            {props.children}
        </article>
    )
}