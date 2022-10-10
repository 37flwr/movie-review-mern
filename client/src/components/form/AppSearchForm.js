import React, { startTransition, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AppSearchForm = ({ onSubmit, placeholder = "Search..." }) => {
  const [value, setValue] = useState("");

  return (
    <form className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={({ target }) =>
          startTransition(() => {
            setValue(target.value);
            onSubmit(target.value);
          })
        }
        className="outline-none border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white text-primary transition bg-transparent rounded text-lg p-1"
      />
      {value.length > 0 && (
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-2 dark:text-white text-secondary"
          onClick={() => {
            setValue("");
            onSubmit("");
          }}
        >
          <AiOutlineClose />
        </button>
      )}
    </form>
  );
};

export default AppSearchForm;
