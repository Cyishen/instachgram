import { useGetPostById } from "@/lib/react-query/query"
import { Link, useParams } from "react-router-dom"
import Loader from "./Loader"
import { multiFormatDateString } from "@/lib/utils"

const PostDetails = () => {

  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || "")
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

            <div className="flex flex-col">
              <p className="base-medium lg:body-bold">
                {post?.creator.name}
              </p>
              <div className="flex-center gap-2 text-light-3">
                <p className="subtle-semibold lg:small-regular ">
                  {multiFormatDateString(post?.$createdAt)}
                </p>
                •
                <p className="subtle-semibold lg:small-regular">
                  {post?.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails