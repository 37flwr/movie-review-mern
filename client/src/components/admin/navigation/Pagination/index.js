import classNames from "classnames";
import React from "react";
import Button from "./Button";

const Pagination = ({
  prevDisabled,
  prevOnClick,
  nextDisabled,
  nextOnClick,
  customClassName,
}) => (
  <div
    className={classNames(
      "flex justify-end items-center space-x-3",
      customClassName
    )}
  >
    <Button disabled={prevDisabled} onClick={prevOnClick}>
      Prev
    </Button>
    <Button disabled={nextDisabled} onClick={nextOnClick}>
      Next
    </Button>
  </div>
);

export default Pagination;
