
export default function Title(props: React.PropsWithChildren) {

    return (
        <div className="title">
            <span className="line"></span>
            <h1 className="title-text">{props.children}</h1>
            <span className="line"></span>

        </div>
    )
}