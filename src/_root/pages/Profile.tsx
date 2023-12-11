import { Button } from "@/components/ui/button";
import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserbyId } from "@/lib/react-query/queriesAndMutations";
import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom"
import { LikedPosts } from "@/_root/pages";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const {id} = useParams();
  const {user} = useUserContext();
  const {pathname} = useLocation();
  const {data:currentUser} = useGetUserbyId(id||"");
  const isCurrentUserFollower = currentUser?.followers.includes(user.id || '');
  
  
  //console.log(currentUser);
  if(!currentUser) 
    return(
        <div className="flex-center w-full h-full"><Loader /></div>
      );


  return (
    <div className="profile-container">
      <div className="profile-inner_container items-center flex">
        <div className="flex flex-row  max-xl:items-center flex-1 gap-7 text-left">
          <img 
            src={currentUser.imageUrl || "assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={currentUser.followers.length} label="Followers" />
              <StatBlock value={currentUser.following.length} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>
          <div className="flex justify-center gap-4">
              <div className={`${user.id !== currentUser.$id && "hidden"}`}>
                <Link 
                  to={`/updateprofile/${currentUser.$id}`}
                  className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${user.id !== currentUser.$id && "hidden"}`}
                >
                  <img 
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={20}
                  height={20}
                  />
                  <p className="flex whitespace-nowrap small-medium"> Edit Profile</p>
                </Link>
              </div>
              <div className={`${user.id===id && "hidden"}`}>
                <Button type="button" className="shad-button_primary px-8" /*onClick={handlelick}*/>
                  {isCurrentUserFollower?"Following":"Follow"}
                </Button>
              </div>
          </div>
        </div>
      </div>
      {currentUser.$id===user.id && (
        <div className="flex max-w-5xl w-full">
          <Link 
          to={`/profile/${id}`}
          className={`profile-tab rounded-l-lg ${pathname===`/profile/${id}` && "!bg-dark-3"}`}
          >
            <img 
              src="/assets/icons/posts.svg"
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/likedposts`}
            className={`profile-tab rounded-r-lg ${pathname===`/profile/${id}/likedposts` && '!bg-dark-3'}`}
          >
            <img 
              src="/assets/icons/like.svg"
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )} 
      <Routes>
        <Route 
        index 
        element={<GridPostList posts={currentUser.posts} showUser={false}/>}
        />
        {currentUser.$id===user.id && (
          <Route path="/likedposts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  )
}

export default Profile