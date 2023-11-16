import { useGetPostById, useDeletePost } from "@/lib/react-query/query"
import { Link, useNavigate, useParams } from "react-router-dom"
import Loader from "./Loader"
import { multiFormatDateString } from "@/lib/utils"
import { Button } from "../ui/button"
import { useUserContext } from "@/Context/AuthContext"

const PostDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || "")
  const { user } = useUserContext();

  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = () => {
    const shouldDelete = window.confirm("Are you sure delete this post？");
    if (shouldDelete) {
      deletePost({ postId: id as string, imageId: post?.imageId });
      navigate(-1);
    }
  };

  return (
    <div className="post_details-container">
      {isPending ? <Loader /> : (
        <div className="post_details-card">
          <img 
            src={post?.imageUrl}
            alt="post"
            className="post_details-img"
          />

          <div className="post_details-info">
            <Link to={`/profile/${post?.creator.$id}`}>
              <img
                src={
                  post?.creator?.imageUrl ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt="creator"
                className="w-12 lg:h-12 rounded-full"
              />
            </Link>

            <div className="flex flex-col w-full">
              <p className="base-medium lg:body-bold">
                {post?.creator.name}
              </p>

              <div className="flex justify-between">
                <div className="flex flex-center gap-2 text-light-3 ">
                  <p className="subtle-semibold lg:small-regular ">
                    {multiFormatDateString(post?.$createdAt)}
                  </p>
                  •
                  <p className="subtle-semibold lg:small-regular">
                    {post?.location}
                  </p>
                </div>
                
                <div className="flex-center gap-4">
                  <Button
                    onClick={handleDeletePost}
                    variant="outline"
                    className={` hover:bg-red hover:text-white ${ user.id !== post?.creator.$id && "hidden" }`}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>


            
            <div className="small-medium lg:base-medium p-5 w-full h-full border rounded-lg">
              <p>{post?.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails