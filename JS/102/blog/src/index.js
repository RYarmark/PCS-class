import './css/index.css';

// get dom elements
const homePageDiv = document.getElementById('homePage');
const postPage = document.getElementById('postPage');
const home = document.getElementById('home');
const error = document.getElementById('error');

// call homePage function to create homePage.
homePage();

// load data
// for each object in response, perform appropriate action to populate page with data. 
async function loadJson(url, action, div) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        data.forEach(d => action(d, div));
    }
    catch (e) {
        error.style.display = 'block';
    }
}

function homePage() {
    postPage.style.display = 'none';
    loadJson('https://jsonplaceholder.typicode.com/users', createBlog)
}

function createBlog(blog) {
    const data = [];
    data.push(blog.name);
    data.push(blog.website);
    data.push(blog.company.name);
    data.push(blog.company.catchPhrase);

    const div = dispalyData(homePageDiv, 'blog', data);
    div.addEventListener('click', () => showPosts(blog.id));
}

//empty page of old data.
//display postPage instead of homePage
//fetch and display posts
function showPosts(id) {
    document.getElementById('posts').replaceChildren();

    homePageDiv.style.display = "none";
    postPage.style.display = 'block';
    loadJson(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, createPost)
}

home.addEventListener('click', () => {
    postPage.style.display = 'none';
    homePageDiv.style.display = "grid";
})


function createPost(post) {
    const data = [];
    data.push(post.title);
    data.push(post.body);
    const div = dispalyData(posts, 'post', data);

    const button = document.createElement('button');
    button.innerText = 'show comments';

    const commentDiv = document.createElement('div')
    commentDiv.id = 'commentDiv';
    div.append(button, commentDiv);
    button.addEventListener('click', () => { displayComments(commentDiv, button, post.id); console.log(post.id) })
}


function displayComments(div, button, id) {
    if (button.innerText === "show comments") {
        button.innerText = 'hide comments';
        div.style.display = 'block';
        if (div.innerText === '') {
            loadJson(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, createComment, div);
        }
    }
    else {
        button.innerText = 'show comments';
        div.style.display = 'none';
    }
}
function createComment(comment, div) {
    const data = [];
    data.push(comment.name);
    data.push(comment.email);
    data.push(comment.body);
    dispalyData(div, 'comment', data);
}

//create div to hold data.
//for each piece of data, create element and set data as text 
// title(data[0])goes in h3 else us span
// append new element to parentElm and return the new div for further use.

function dispalyData(parentElem, id, data) {
    const div = document.createElement('div');
    div.id = id;
    data.forEach((data, i) => {
        let display;
        if (i === 0) {
            display = document.createElement('h3');
        }
        else {

            display = document.createElement('span');
        }
        display.innerText = data;
        div.append(display);
    })
    parentElem.append(div);
    return div;
}


