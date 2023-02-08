import { Link } from "react-router-dom";
import pic from "./homeIcon.png"


export default function AddPost() {


    return (
        <>
            <Link to="/"><img src={pic} alt="Home" ></img><span>Home</span></Link>

            <form>
                <div>
                    <h4>Your Information</h4>
                    <label>Name</label>
                    <input></input>
                    <label>Website</label>
                    <input></input>
                    <label>Company Name</label>
                    <input></input>
                    <label>Company Catch Phrase</label>
                    <input></input>
                </div>
                <div>
                    <h4> Post</h4>
                    <label>Title</label>
                    <input></input>
                    <label >Body</label>
                    <textarea></textarea>
                </div>
                <Link to={"/"}>
                    <button type="submit">Submit</button>
                </Link>
            </form>
        </>
    )
}