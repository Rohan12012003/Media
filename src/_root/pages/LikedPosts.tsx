import GridPostList from "@/components/ui/shared/GridPostList";
import { useGetLikedPosts } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom"

const LikedPosts = () => {

  const {id} = useParams();
  const { data: likedPosts, isLoading } = useGetLikedPosts(id||"");
  console.log(likedPosts);
  return (
    <div>
      {likedPosts && !isLoading?<GridPostList posts={likedPosts} showUser={false} /> : (
        <h2>No liked Posts</h2>
      )}
    </div>
  )
}

export default LikedPosts 