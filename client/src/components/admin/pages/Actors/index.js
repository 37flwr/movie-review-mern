import React from "react";
import ActorProfile from "./ActorProfile";

const Actors = () => {
  return (
    <div className="grid grid-cols-4 gap-3 my-5">
      <ActorProfile
        profile={{
          name: "John Doe",
          avatar:
            "https://images.unsplash.com/photo-1663711905018-527724559da2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          about:
            "asdasd asdasdh asd asdgahjdsglkj fsdfghlsdfjg sdfgljsdg sdfgjhsdfjg sdfglk sdg",
        }}
      />
    </div>
  );
};

export default Actors;
