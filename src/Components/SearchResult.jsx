import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchReasults();
  }, [searchQuery]);

  const fetchSearchReasults = () => {
    setLoading(true);
    FetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setResult(res?.contents);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        {result?.map((item) => {
          if (item?.type !== "video") return false;
          let video = item?.video;
          return <SearchResultVideoCard key={video?.videoId} video={video} />;
        })}
      </div>
    </div>
  );
};

export default SearchResult;
