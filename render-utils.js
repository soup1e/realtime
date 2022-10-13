export function renderPost(post) {
    const li = document.createElement('li');
    li.classList.add('post');

    const a = document.createElement('a');
    a.href = `/thread/?id=${post.id}`;

    const h1 = document.createElement('h1');
    h1.textContent = post.title;

    const h2 = document.createElement('h2');
    h2.textContent = post.user.username;

    const p = document.createElement('p');
    p.textContent = post.text;

    a.append(h2, h1, p);
    li.append(a);

    return li;
}

export function renderComment(comment) {
    const li = document.createElement('li');

    const p = document.createElement('p');
    p.textContent = comment.text;

    li.append(p);

    return li;
}
