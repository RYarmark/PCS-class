import { useState } from "react";
import Comments from "./Comments";

export default function Post(props) {
    const { data } = props;
    const { id, title, body } = data;
    const [showComments, setShowComments] = useState(false);
    return (
        <>
            <div id='post'>
                <h3>{title}</h3>
                <span>{body}</span>
                <div id="comments">

                    {showComments && <Comments id={id} />}
                    <button id={id} onClick={() => setShowComments(!showComments)
                    }>{showComments ? 'hide comments' : 'show comments'}</button>
                </div>
            </div>

        </>
    )
}