export function renderPost(post) {
    const li = document.createElement('li');
    li.classList.add('post');

    const a = document.createElement('a');
    a.href = `/thread/?id=${post.id}`;

    const h1 = document.createElement('h1');
    h1.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.text;

    a.append(h1, p);
    li.append(a);

    return li;
}

export function renderComment(comment, userId) {
    const li = document.createElement('li');
    if (comment.user_id === userId) {
        li.classList.add('self');
    }
    li.textContent = comment.text;
    return li;
}
