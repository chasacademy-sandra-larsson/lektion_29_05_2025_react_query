import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

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

async function createPost(post: Omit<Post, "id">) {
    try {
        const result = await fetch("http://localhost:3000/posts", {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                'Content-Type': "application/json"
            }
        });

        if(!result.ok) {
            throw new Error("Error in createPost");
        }
        const data = await result.json();
        return data;

    } catch(error) {

        console.error("error i createPost", error)
    }

}


function PostListWithMutation() {

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
        // staleTime: 1000 * 60 * 5, // Hur länge data anses vara färskt. Default 5 min
        // refetchOnWindowFocus: true, // Default true
        // refetchInterval: 1000 * 60 * 10, // Hur ofta data ska hämtas. Default är false
    });

    console.log(data);

    const { mutate } = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            // Talar om för React Query att data (posts) behöver uppdateras 
            queryClient.invalidateQueries({queryKey: ["posts"]})
        }
    })


    const posts: Post[] = data?.result || [];

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

   return (
    <>
       <h1>Posts</h1>
       <button onClick={() => {
        console.log("Creating post..")
        mutate({
            title: "New Post 29 april",
            content: "New post",
            authorId: 1
        })
    
       }}>Create Post</button>
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

export default PostListWithMutation