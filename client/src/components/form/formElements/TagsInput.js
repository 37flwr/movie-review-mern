import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagsInput = ({ tags, handleUpdate, handleDelete, id }) => {
  const [currentTag, setCurrentTag] = useState("");
  const input = useRef();
  const tagsInput = useRef();

  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setCurrentTag(value);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      handleUpdate(currentTag, id);
      setCurrentTag("");
    }
    if (key === "Backspace" && !currentTag.length) {
      handleDelete(tags.length - 1, id);
    }
  };

  const handleOnFocus = () => {
    tagsInput.current.classList.remove(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.add("dark:border-white", "border-primary");
  };

  const handleOnBlur = () => {
    tagsInput.current.classList.remove("dark:border-white", "border-primary");
    tagsInput.current.classList.add(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
  };

  useEffect(() => {
    input.current?.scrollIntoView(false);
  }, [currentTag]);

  return (
    <div
      ref={tagsInput}
      onKeyDown={handleKeyDown}
      className="flex items-center space-x-2 border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full dark:text-white overflow-auto custom-scroll-bar transition"
    >
      {tags.map((tagValue, idx) => (
        <Tag key={idx} handleTagDelete={() => handleDelete(idx, id)}>
          {tagValue}
        </Tag>
      ))}
      <input
        id={id}
        ref={input}
        className="h-full flex-grow bg-transparent outline-none dark:text-white"
        placeholder="Insert tags here..."
        value={currentTag}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </div>
  );
};

const Tag = ({ children, handleTagDelete }) => (
  <span className="flex items-center justify-around rounded text-sm dark:bg-white bg-primary dark:text-primary text-white h-[75%] whitespace-nowrap px-1">
    <span className="flex items-center h-full">{children}</span>
    <button type="button" onClick={handleTagDelete}>
      <AiOutlineClose size={12} />
    </button>
  </span>
);

export default TagsInput;
