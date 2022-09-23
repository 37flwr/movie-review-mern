import classNames from "classnames";
import React, { startTransition, useEffect, useRef, useState } from "react";
import { searchActor } from "../../../api/actor";
import { commonFormInputClasses } from "../../../utils/theme";

const LiveSearch = ({ handleUpdate, id, value }) => {
  const [displayResults, setDisplayResults] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const [results, setResults] = useState([]);

  // const results = [
  //   {
  //     id: "1",
  //     avatar:
  //       "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
  //     name: "John Doe",
  //   },
  //   {
  //     id: "2",
  //     avatar:
  //       "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
  //     name: "Chandri Anggara",
  //   },
  //   {
  //     id: "3",
  //     avatar:
  //       "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
  //     name: "Amin RK",
  //   },
  //   {
  //     id: "4",
  //     avatar:
  //       "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
  //     name: "Edward Howell",
  //   },
  //   {
  //     id: "5",
  //     avatar:
  //       "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
  //     name: "Amin RK",
  //   },
  //   {
  //     id: "6",
  //     avatar:
  //       "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
  //     name: "Edward Howell",
  //   },
  // ];

  const handleSelection = (item) => {
    if (item) {
      handleUpdate(item, id);
      setDisplayResults(false);
    }
    setFocusedIdx(-1);
  };

  const handleOnFocus = () => {
    if (results.length) setDisplayResults(true);
  };

  const handleOnBlur = () => {
    setDisplayResults(false);
    setFocusedIdx(-1);
  };

  const handleKeyDown = ({ key }) => {
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
    if (!keys.includes(key)) return;

    // Move selection up and down
    if (key === "ArrowDown") {
      setFocusedIdx((currIdx) => (currIdx + 1) % results.length);
    }
    if (key === "ArrowUp") {
      setFocusedIdx(
        (currIdx) => (currIdx + results.length - 1) % results.length
      );
    }
    if (key === "Escape") {
      setDisplayResults(false);
    }
    if (key === "Enter") {
      handleSelection(results[focusedIdx]);
    }
  };

  const handleChange = async (e) => {
    setDefaultValue(e.target.value);
  };

  const handleSearch = async (e) => {
    const searchResult = await searchActor(e?.target?.value);
    setResults([...searchResult]);
    setDisplayResults(true);
  };

  useEffect(() => {
    if (value) setDefaultValue(value);
  }, [value]);

  return (
    <div className="relative">
      <input
        type="text"
        value={defaultValue}
        className={classNames("rounded border-2 p-1", commonFormInputClasses)}
        placeholder="Search profile..."
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        onChange={(e) =>
          startTransition(() => {
            handleSearch(e);
            handleChange(e);
          })
        }
      />
      {displayResults && (
        <SearchResult
          onSelect={handleSelection}
          focusedIdx={focusedIdx}
          setFocusedIdx={setFocusedIdx}
          results={results}
        />
      )}
    </div>
  );
};

const SearchResult = ({
  results = [],
  focusedIdx,
  setFocusedIdx,
  onSelect,
}) => {
  const resultContainer = useRef();

  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behaviour: "smooth",
      block: "nearest",
    });
  }, [focusedIdx]);

  return (
    <div className="absolute z-50 right-0 top-9 left-0 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 mt-1 overflow-auto custom-scroll-bar">
      {results.map((result, idx) => {
        const { id, name, avatar } = result;
        return (
          <div
            onMouseEnter={() => setFocusedIdx(idx)}
            onMouseDown={() => onSelect(result)}
            ref={idx === focusedIdx ? resultContainer : null}
            key={id}
            className={classNames(
              "cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition flex space-x-2",
              focusedIdx === idx && "dark:bg-dark-subtle bg-light-subtle"
            )}
          >
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded object-cover"
            />
            <p className="dark:text-white text-primary font-semibold">{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LiveSearch;
