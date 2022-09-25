import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSwr from "swr";
import { getCurrentPage, getToken } from "../../../../utils/helper";
import Loading from "../../../fallback/Loading";
import ActorUpdate from "../../modals/ActorUpdate";
import Pagination from "../../navigation/Pagination";
import ActorProfile from "./ActorProfile";

const LIMIT = 20;

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const navigate = useNavigate();

  const page = getCurrentPage();
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

  const handleOnEdit = (profile) => {
    setSelectedProfile(profile);
    setShowModal(true);
  };
  const hideUpdateModal = () => {
    setSelectedProfile(null);
    setShowModal(false);
  };

  const handleOnActorUpdate = (profile) => {
    const updatedActors = actors.map((actor) => {
      if (profile.id === actor.id) {
        return profile;
      }
      return actor;
    });
    setActors([...updatedActors]);
  };

  useEffect(() => {
    if (data?.data?.profiles?.length < LIMIT) {
      setReachedToEnd(true);
    }
    setActors([...data.data.profiles]);
  }, [data]);

  return (
    <>
      <div className="p-5">
        <div className="grid grid-cols-4 gap-5">
          <Suspense fallback={<Loading />}>
            {actors.map((actor, idx) => (
              <ActorProfile
                actor={actor}
                key={idx}
                onEdit={() => handleOnEdit(actor)}
              />
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
      {showModal && (
        <ActorUpdate
          onClose={hideUpdateModal}
          initialValues={selectedProfile}
          onSuccess={handleOnActorUpdate}
        />
      )}
    </>
  );
};

export default Actors;
