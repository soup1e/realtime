const SUPABASE_URL = 'https://wfgopjemhbfmrkqjlhys.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZ29wamVtaGJmbXJrcWpsaHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU1MTM4MTAsImV4cCI6MTk4MTA4OTgxMH0.vjv1ue7eCOxWRa4pN13Xdu9XY0QloztQZpqjsut2YXs';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function addPost(post) {
    return await client.from('posts').insert(post).single();
}

export async function getPosts() {
    return await client.from('posts').select('*');
}

export async function getPost(id) {
    return await client
        .from('posts')
        .select(`*, comments(*)`)
        .eq('id', id)
        .order('created_at', { foreignTable: 'comments', ascending: false })
        .single();
}

export async function createComment(comment) {
    return client.from('comments').insert(comment).single();
}

export async function addProfile(profile) {
    return await client.from('users').upsert(profile).single();
}

export function onComment(postId, handleComment) {
    client.from(`comments:post_id=eq.${postId}`).on('INSERT', handleComment).subscribe();
}

export async function getComment(id) {
    return await client
        .from('comments')
        .select(
            `*,
        user:users(
            id,
            username
        )
        `
        )
        .eq('id', id)
        .single();
}
