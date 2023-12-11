import Loader from "@/components/ui/shared/Loader";
import PostCard from "@/components/ui/shared/PostCard";
import UserCard from "@/components/ui/shared/UserCard";
import { useGetCurrentUser, useGetRecentPosts, useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const {data:posts,isPending:isPostLoading,isError:isErrorPosts}=useGetRecentPosts();

  const {data:creators,isPending:isUserLoading,isError:isErrorCreators}=useGetUsers(10);

  const {data:currentUser} = useGetCurrentUser();

  const filteredCreators = creators?.documents.filter((creator) => creator.$id !== currentUser?.$id) || [];


  if (isErrorPosts || isErrorCreators) {
    return ( 
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ):(
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post:Models.Document)=>(
                <PostCard post={post} key={post.caption}/>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && ! creators? (
          <Loader />
        ):(
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {filteredCreators?.map((creator)=>(
              <li key={creator.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div> 
  )
}

export default Home  