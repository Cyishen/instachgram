import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Input } from "@/components/ui/input";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/query";
import { useState } from "react";

export type SearchResultProps = {
  isSearchFetching: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchedPosts: any;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {
  const [searchValue, setSearchValue] = useState('')
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(searchValue);

  const { data: posts} = useGetPosts()
  
  if (!posts)
  return (
    <div className="flex-center w-full h-full">
      <Loader />
    </div>
  );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts = !shouldShowSearchResults  
    posts.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-3 px-4 w-full rounded-lg">
          <img src="/assets/icons/search.svg" width={24} height={24} alt="search" />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults isSearchFetching={isSearchFetching} searchedPosts={searchedPosts} />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => {
            if (item && item.documents) {
              return <GridPostList key={`page-${index}`} posts={item.documents} />;
            }
            return null;
          })
        )}
      </div>
    </div>
  )
}

export default Explore