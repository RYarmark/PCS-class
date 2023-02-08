import useFetch from "./fetch"
import { Link, useParams } from "react-router-dom";
import Post from "./post";
import pic from "./homeIcon.png"

export default function Posts(props) {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    //        <img src="./homeIcon.png" alt = "Home" onClick={<Link to={"/"}/>}>Home</img>
    return (
        <>
      

        <Link to="/"><img src={pic} alt = "Home" ></img><span>Home</span></Link>
            {error && <div>We encountered an error while loading data.</div>}
            {!error && loading && <div>Loading...</div>}
            {!loading && !error && data && <div>
                <ul>{data.map(data => <li key={data.id}> <Post data={data} />
                </li>)}
                </ul></div>}
        </>
    )
}