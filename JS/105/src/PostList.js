import useFetch from "./fetch"
import { Link, useParams } from "react-router-dom";
import Post from "./post";
import pic from "./homeIcon.png";
import { useState } from "react"


export default function Posts() {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    const [start, setStart] = useState(0);

    const postData = data.map((data, i) => <li key={data.id}> <Post data={data} /></li>);
    const currentPosts = postData.slice(start, start + 3);

    return (
        <>

            <Link to="/"><img src={pic} alt="Home" ></img><span>Home</span></Link>
            {error && <div>We encountered an error while loading data.</div>}
            {!error && loading && <div>Loading...</div>}
            {!loading && !error && data && <div>
                <ul>
                    {currentPosts}
                </ul>
                <button id='prev' className="active"
                    onClick={() => {if(start !== 0){
                         (setStart(start - 3));} }
                    }>Prev</button>
                <button id='next'
                    onClick={() => {if ((start + 3) < postData.length){ 
                        setStart(start + 3)}
                    }}>Next</button>

            </div>}

        </>
    )
}