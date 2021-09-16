import "./ScrollingMenu.scss";
import { useEffect, useState, useRef } from "react";

const ScrollingMenu = ({
  value,
  options,
  placeholder = "Select",
  onChange,
}) => {
  const scrollRef = useRef();

  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = (event) => {
    if (scrollRef.current.contains(event.target)) {
      return;
    }
    setOpenMenu(false);
  };

  const handleChange = (selectedValue) => {
    onChange(selectedValue);
    setOpenMenu(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="scrollingMenuContainer" ref={scrollRef}>
      <button
        className="scrollMenuToggler"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {value || placeholder}
      </button>
      {openMenu && (
        <ul className="scrollingMenu">
          <li className="scrollingItem" onClick={() => handleChange(undefined)}>
            All
          </li>
          {options.map((elem, index) => (
            <li
              key={index}
              className="scrollingItem"
              onClick={() => handleChange(elem)}
            >
              {elem.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScrollingMenu;
