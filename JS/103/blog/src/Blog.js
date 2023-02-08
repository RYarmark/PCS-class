import { Link } from "react-router-dom";

export default function Blog(props) {
    const { data } = props;
    const { id, name, website, company } = data
    return (
        <>
            <Link to={`posts/${id}`}>
                <div id='blog'>
                    <h3>{name}</h3>
                    <span>{website}</span>
                    <span>{company.name}</span>
                    <span>{company.catchPhrase}</span>
                </div>
            </Link>
        </>
    )
}