const selectUser = document.getElementById('selectuser');
const userImage = document.getElementById('userImage');
const profileName = document.getElementById('profileName');
const username = document.getElementById('username');
const userWeb = document.getElementById('userWeb');
const userBio = document.getElementById('bio');
const userLocation = document.getElementById('exactLocation');
const userPosts = document.getElementById('userPosts');
const singlePost = document.getElementById('singlePost');

async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        users.forEach((user,index)=>{
            let option = document.createElement('option');
            option.value = user.id;
            option.innerHTML = user.name;
            selectUser.appendChild(option);
        })
        return users;
}
async function getProfile(userId) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);
    const profile = await response.json();

    userImage.src = 'https://sb.kaleidousercontent.com/67418/1672x1018/6463a5af0d/screenshot-2022-05-24-at-15-22-28.png';
    profileName.innerHTML = profile.name;
    username.innerHTML = profile.username;
    userWeb.innerHTML = profile.website;
    userWeb.href = "https://" + profile.website;
    userBio.innerHTML = profile.company.catchPhrase;
    userLocation.innerHTML = profile.address.city;

    return profile;
}

async function getUser(user_id) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/' + user_id);
    const theUser = await response.json();
    return theUser.name;
}

async function updateProfile(data) {
    const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    const profile = await response.json();
    return profile;
}

async function deleteProfile() {
    const response = await fetch('/api/profile', {
        method: 'DELETE',
    });
    const profile = await response.json();
    return profile;
}

async function getPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    let posts = await response.json();
    const comments = document.getElementById('comments');
    const userName = await getUser(userId);

    if (comments.length == undefined) {
        getPostComments(posts[0].id, 1);
    }

    userPosts.innerHTML = '';
    posts.forEach((post, index) => {
        userPosts.innerHTML += `
        <div class="singlePost" onclick="UserProfile.getPostComments(${post.id}, ${index+1})">
                  
        <div class="post-image">
            <img src="https://sb.kaleidousercontent.com/67418/1672x1018/6463a5af0d/screenshot-2022-05-24-at-15-22-28.png" alt="" width="100px" >
        </div>
        
      
        <div class="postBody">
            <div class="title">
                <h3>${userName}
                <span>
                    <img src="/assets/images/icons/003-verified.png"/>
                    <img src="/assets/images/icons/twitter.png"/>
                </span>
                </h3>
            </div>
            <div class="post-body">
                <p>${post.body}</p>
            </div>
            <hr>
            <div class="post-stats">
                <div class="post-comments">
                    <img src="/assets/images/icons/001-comment.png" alt="" width="20px">
                    <span>0</span>
                </div>
                <div class="post-retweets">
                    <img src="/assets/images/icons/004-repost.png" alt="" width="20px">
                    <span>0</span>
                </div>
                <div class="post-likes">
                    <img src="/assets/images/icons/006-heart-1.png" alt="" width="20px">
                    <span>0</span>
                </div>
            </div>
        </div>

        
     
    </div>
        `;
    });

    return posts;
}

async function createPost(data) {
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    const post = await response.json();
    return post;
}

async function getPostComments(post_id, index) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post_id}`);
    const comments = await response.json();
    const commentList = document.getElementById('comments');
    const postNumber = document.getElementById('postNumber');
    postNumber.innerHTML = `Post ${index}`;
    commentList.innerHTML = '';

    comments.forEach((item, index) => {
        commentList.innerHTML += `
           

            <div class="singleComment">
                    <div class="comment-image">
                        <img src="https://sb.kaleidousercontent.com/67418/1672x1018/6463a5af0d/screenshot-2022-05-24-at-15-22-28.png" alt="" width="100px" >
                    </div>

                    <div class="comment-body">
                        <div class="commentName" id="commentName">
                            <p><b>${item.name}</b>
                            <span>
                                <img src="/assets/images/icons/003-verified.png"/>
                                <img src="/assets/images/icons/twitter.png"/>
                            </span>
                            </p>
                        </div>
                        <div class="commentBody" id="commentBody">
                            <p>${item.body}</p>
                        </div>
                        <hr>
                        <div class="post-stats">
                            <div class="post-comments">
                                <img src="/assets/images/icons/001-comment.png" alt="" width="20px">
                                <span>0</span>
                            </div>
                            <div class="post-retweets">
                                <img src="/assets/images/icons/004-repost.png" alt="" width="20px">
                                <span>0</span>
                            </div>
                            <div class="post-likes">
                                <img src="/assets/images/icons/006-heart-1.png" alt="" width="20px">
                                <span>0</span>
                            </div>
                        </div>
                    </div>

                     
                </div>
        `;
    });

    return comments;
}

getUsers();

// Event listeners
try {
    selectUser.addEventListener('change', (e) => {
        getProfile(e.target.value);
        getPosts(e.target.value);
    });
} catch (err) {
    console.log(err);
}

try {
    window.addEventListener('load', () => {
        getProfile(1);
        getPosts(1);
    });
} catch (err) {
    console.log(err);
}
