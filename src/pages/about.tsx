import ArticleWrapper from "../components/ArticleWrapper";
import Title from "../components/headerTitle";
export default function About() {

    return (
        <ArticleWrapper class="about">
            <Title>Me & Myself</Title>

            <div className="about-wrapper">
                <div className="about-image-wrapper">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1677171381965-21f49e739991?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Mario etc"
                        loading="lazy"
                        className="photo-of-me" />
                </div>
                <div className="description">
                    <p>I'm Mario, a digital artist who loves bringing creative ideas to life through digital tools like Photoshop, Procreate, and Blender.</p>
                    <p>My work spans from detailed illustrations to bold concept art and immersive 3D designs. I enjoy experimenting with styles and themes, blending realism with imagination to create something uniquely personal.</p>
                    <p>For me, digital art is all about pushing creative boundaries and expressing my vision in new and exciting ways.</p>
                </div>
            </div>
        </ArticleWrapper>
    )
}