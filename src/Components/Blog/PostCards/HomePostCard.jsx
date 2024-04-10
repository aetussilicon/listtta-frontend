import { useState } from "react";
import "../../../Styles/Components/Blog/PostCards/HomePostCard.css"
import { useEffect } from "react";

export default function HomePostCard() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch("http://localhost:8080/blog/get/all");
                const data = await response.json();
                console.log(data);

                data.sort((a, b) =>  b.postsId - a.postsId);

                setPosts(data.slice(0,3));
                console.log(setPosts);
            } catch (error) {
                console.error(error); 
            }
        }
        
        fetchPosts();
    }, [])

    return(
        <div className="home-blog-card-area">
            <div className="home-blog-card">
                <div className="home-blog-card-banner">
                    <img src="Assets/imgs/cards/post-card-placeholder.png" alt="" />
                </div>
                <div className="home-blog-post-info">
                    <h3>Title</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <a href="">Veja Mais +</a>
                </div>
            </div>
        </div>
    );
}