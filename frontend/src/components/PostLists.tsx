import { useQuery } from "@tanstack/react-query"

type Post = {
    id: number,
    title: string,
    content: string,
    authorId: number
}

async function fetchPosts() {

    const result = await fetch("http://localhost:3000/posts");
    if(!result.ok) {
        throw new Error("Failed to fetch posts")
    }
    const data = await result.json();
    return data;

}

// Komponentet ansvarig för att fetcha och hantera fetchning med React Query
function PostList() {

    const { data, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
        staleTime: 1000 * 60 * 5, // Hur länge data anses vara färskt. Default 5 min
        refetchOnWindowFocus: true // Default true
    });

    console.log(data);

    const posts: Post[] = data?.result || [];

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

   return (
    <>
       <h1>Posts</h1>
       <ul>
       {posts.map((post: Post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
       </ul>
    </>
   )

}

export default PostList