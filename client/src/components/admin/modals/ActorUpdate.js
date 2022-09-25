import React, { useState } from "react";
import { updateActor } from "../../../api/actor";
import { useNotification } from "../../../hooks";
import ModalContainer from "../../../modals/ModalContainer";
import ActorForm from "../../form/ActorForm";

const ActorUpdate = ({ onClose, onSuccess, initialValues }) => {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await updateActor(initialValues.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", "Actor successfully updated");
    onSuccess(actor);
    onClose();
  };
  return (
    <ModalContainer ignoreContainer>
      <ActorForm
        busy={busy}
        title="Update actor"
        btnTitle="Update"
        onSubmit={!busy ? handleSubmit : null}
        initialValues={initialValues}
      />
    </ModalContainer>
  );
};

export default ActorUpdate;
