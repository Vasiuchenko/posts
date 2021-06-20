window.onload = () => {
    let select = document.getElementById('selector'),
        button = document.getElementById('button'),
        content = document.getElementById('content'),
        template = '';
    
    for(let i = 6; i<=100;i++){
        let option = document.createElement('option');

        option.innerText = i;
        select.appendChild(option);
    }
    button.addEventListener('click', e => {
        asyncShowPost(select.value).then(userPost => {
            let post = new Post(userPost);

            content.appendChild(post.createPost());
        });
    })

}

// https://jsonplaceholder.typicode.com/posts/1
// https://jsonplaceholder.typicode.com/posts/1/comments
// https://jsonplaceholder.typicode.com/users

async function asyncShowPost(num) {
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${num}`);
    let answer = await res.json();
    let userLink = await fetch(`https://jsonplaceholder.typicode.com/users/${answer.userId}`);
    let user = await userLink.json();
    let userPost = Object.assign({}, answer, user)

    return userPost;
}

function Post(data) {
    this.data = data;

    this.createPost = function () {
        let post = document.createElement('div'),
            text = document.createElement('div'),
            title = document.createElement('h3'),
            body = document.createElement('p');
        
        post.setAttribute('class', 'post');
        title.innerText = this.data.title;
        body.innerText = this.data.body;
        text.appendChild(title);
        text.appendChild(body);
        post.appendChild(text);
        post.appendChild(this.createUser());
        return post;
    }

    this.createUser = function () {
        let user = document.createElement('div'),
            author = document.createElement('p'),
            link = document.createElement('a'),
            email = document.createElement('p'),
            company = document.createElement('p');
        
        user.setAttribute('class', 'post__user');
        author.innerText = `Author: ${this.data.name}`;
        email.innerText = 'Email:';
        link.setAttribute('href', `${this.data.email}`);
        link.innerText = this.data.email;
        company.innerText = `Company: ${this.data.company.name}`

        email.appendChild(link);
        user.appendChild(author);
        user.appendChild(email);
        user.appendChild(company);

        return user;
    }
}
