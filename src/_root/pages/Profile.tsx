import Loader from "@/components/shared/Loader";
import { useGetUserById } from "@/lib/react-query/query";
import { Route, Routes, useParams } from "react-router-dom";
import GridPostList from "@/components/shared/GridPostList";


interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { data: currentUser } = useGetUserById(id || "");


  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <img src={currentUser.imageUrl} alt="user" className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"/>

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
              <StatBlock value={100} label="Followers" />
              <StatBlock value={100} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
        </div>

        <Routes>
          <Route index element={<GridPostList posts={currentUser.posts} showUser={false} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Profile