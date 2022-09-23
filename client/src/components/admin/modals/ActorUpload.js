import React, { useState } from "react";
import { createActor } from "../../../api/actor";
import { useNotification } from "../../../hooks";
import ModalContainer from "../../../modals/ModalContainer";
import ActorForm from "../../form/ActorForm";

const ActorUpload = ({ onClose }) => {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error } = await createActor(data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", "New actor successfully created");
    onClose();
  };
  return (
    <ModalContainer ignoreContainer>
      <ActorForm
        busy={busy}
        title="Create new actor"
        btnTitle="Create"
        onSubmit={!busy ? handleSubmit : null}
      />
    </ModalContainer>
  );
};

export default ActorUpload;
