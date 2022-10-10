import React from "react";

const Selector = ({ name, value, onChange, options }) => {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={({ target }) => onChange(name, target.value)}
      className="border-2 bg-white dark:bg-primary dark:border-dark-subtle border-light-subtle p-1 pr-10 dark:focus:border-white focus:border-primary outline-none transition rounded bg-transparent text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-primary"
    >
      {options.map(({ value, title }, idx) => (
        <option key={idx} value={value}>
          {title}
        </option>
      ))}
    </select>
  );
};

export default Selector;
