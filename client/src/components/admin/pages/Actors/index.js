import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSwr from "swr";
import { getToken } from "../../../../utils/helper";
import Loading from "../../../fallback/Loading";
import Pagination from "../../navigation/Pagination";
import ActorProfile from "./ActorProfile";

const LIMIT = 20;

const Actors = () => {
  const [profiles, setProfiles] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const navigate = useNavigate();

  const page = parseInt(new URL(document.location).searchParams.get("page"));
  const token = getToken();

  const { data } = useSwr([
    `http://localhost:8080/api/actor/actors?pageNumber=${page}&limit=${LIMIT}`,
    {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  ]);

  useEffect(() => {
    if (data?.data?.profiles?.length < LIMIT) {
      setReachedToEnd(true);
    }
    setProfiles([...data.data.profiles]);
  }, [data]);

  return (
    <div className="p-5">
      <div className="grid grid-cols-4 gap-5">
        <Suspense fallback={<Loading />}>
          {profiles.map((profile, idx) => (
            <ActorProfile profile={profile} key={idx} />
          ))}
        </Suspense>
      </div>
      <Pagination
        prevDisabled={page === 1}
        prevOnClick={() => {
          if (page > 1) {
            setReachedToEnd(false);
            navigate(`${window.location.pathname}?page=${page - 1}`);
          }
        }}
        nextDisabled={reachedToEnd}
        nextOnClick={() => {
          if (!reachedToEnd) {
            navigate(`${window.location.pathname}?page=${page + 1}`);
          }
        }}
        customClassName="mt-5"
      />
    </div>
  );
};

export default Actors;
