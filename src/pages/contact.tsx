import ArticleWrapper from "../components/ArticleWrapper";
import Title from "../components/headerTitle";
export default function Contact() {

    return (
        <ArticleWrapper class="contact">
            <Title>Let's talk</Title>

            <form action="" className="form">
                <div className="input">
                    <label htmlFor="name">Your name</label>
                    <input
                        type="text"
                        id="name"
                        title="name"
                        className="input-field"
                        placeholder="Type here"

                    />
                </div>
                <div className="input">
                    <label htmlFor="email">Your email</label>
                    <input
                        type="email"
                        id="email"
                        title="email"
                        className="input-field"
                        placeholder="Type here"

                    />
                </div>
                <div className="input">
                    <label htmlFor="textarea">A small message</label>
                    <textarea
                        id="email"
                        title="email"
                        className="input-field textarea"
                        placeholder="Type here"

                    ></textarea>
                </div>

                <button
                    className="send-btn btn primary-btn"
                // onClick={send logic}
                >Send</button>
            </form>
        </ArticleWrapper>
    )
}