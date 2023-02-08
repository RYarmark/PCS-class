import useFetch from './fetch'
import Blog from './Blog'
import { Link } from 'react-router-dom'
export default function Home() {
    const { data: blogs, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users')

    function populateData(blog) {
        return <li key={blog.id}> <Blog data={blog} />
        </li>
    }

    return (
        <>
            <Link to="/addPost" id='addPostLink'><h4>Add Post</h4></Link>

            {error && <div>We encountered an error while loading data.</div>}
            {!error && loading && <div>Loading...</div>}
            {!loading && !error && blogs && <div >
                <ul id="homePage">{blogs.map(blog =>
                    populateData(blog)
                )}
                </ul></div>}
        </>
    )

}