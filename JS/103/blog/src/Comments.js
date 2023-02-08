import useFetch from './fetch'


export default function Comments(props) {
    const { id } = props;
    console.log('in comments')
    const { data: comment, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/comments?postId=${id} `)

    return (
        <>
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            {!loading && !error && comment && <div>
                <ul>{comment.map(comment =>
                    <li key={comment.id}>
                        <div id='comment'>
                            <h3>{comment.name}</h3>
                            <span>{comment.email}</span>
                            <span>{comment.body}</span>
                        </div>
                    </li>
                )}
                </ul></div>}
        </>
    )
}







