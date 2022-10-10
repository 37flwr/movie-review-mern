import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSwr from "swr";
import { deleteActor, fetchActors, searchActor } from "../../../../api/actor";
import { useNotification } from "../../../../hooks";
import { getCurrentPage, getToken } from "../../../../utils/helper";
import Loading from "../../../fallback/Loading";
import AppSearchForm from "../../../form/AppSearchForm";
import NotFoundText from "../../../NotFoundText";
import ActorUpdate from "../../modals/ActorUpdate";
import ConfirmModal from "../../modals/ConfirmModal";
import Pagination from "../../navigation/Pagination";
import ActorProfile from "./ActorProfile";

const LIMIT = 20;

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [confirmBusy, setConfirmBusy] = useState(false);

  const navigate = useNavigate();
  const { updateNotification } = useNotification();

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

  const [modalType, setModalType] = useState("");
  const renderModal = (type) => {
    switch (type) {
      case "edit":
        return (
          <ActorUpdate
            onClose={hideUpdateModal}
            initialValues={selectedProfile}
            onSuccess={handleOnActorUpdate}
          />
        );
      case "confirm":
        return (
          <ConfirmModal
            subtitle="This action will remove this profile permanently"
            title="Are you sure?"
            busy={confirmBusy}
            onConfirm={handleOnConfirm}
            onCancel={hideConfirmModal}
          />
        );
      default:
        return null;
    }
  };

  const handleOnEdit = (profile) => {
    setSelectedProfile(profile);
    setModalType("edit");
  };
  const hideUpdateModal = () => {
    setSelectedProfile(null);
    setModalType("");
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
  const handleOnSearch = async (value) => {
    if (value) {
      const res = await searchActor(value);
      return setActors(res);
    }
    const { error, profiles } = await fetchActors(page, LIMIT);

    if (error) return updateNotification("error", error);
    setActors(profiles);
  };
  const handleOnDelete = async (profile) => {
    setSelectedProfile(profile);
    setModalType("confirm");
  };
  const handleOnConfirm = async () => {
    setConfirmBusy(true);
    const { error: deleteActorError, message } = await deleteActor(
      selectedProfile.id
    );

    if (deleteActorError) return updateNotification("error", deleteActorError);

    const { error: actorFetchError, profiles } = await fetchActors(page, LIMIT);

    if (actorFetchError) return updateNotification("error", actorFetchError);

    setActors(profiles);
    setModalType("");
    setConfirmBusy(false);
    updateNotification("success", message);
  };
  const hideConfirmModal = () => {
    setModalType("");
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
        <div className="flex justify-end mb-5">
          <AppSearchForm
            placeholder="Search actors..."
            onSubmit={handleOnSearch}
          />
        </div>
        {!actors.length ? (
          <NotFoundText />
        ) : (
          <>
            <div className="grid grid-cols-4 gap-5">
              <Suspense fallback={<Loading />}>
                {actors?.map((actor, idx) => (
                  <ActorProfile
                    actor={actor}
                    key={idx}
                    onEdit={() => handleOnEdit(actor)}
                    onDelete={() => handleOnDelete(actor)}
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
          </>
        )}
      </div>
      {renderModal(modalType)}
    </>
  );
};

export default Actors;
