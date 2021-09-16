import { useState, useEffect } from "react";
import "./Header.scss";
import axios from "axios";
import logo from "../../assets/images/logo.png";
import ScrollingMenu from "../ScrollingMenu/ScrollingMenu";
import qs from "qs";

const Header = ({ setSearch, setSearchValidated, search }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState(undefined);
  const [genre, setGenre] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/infos_list");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  /* Scrolling Menu */

  let filters = "";

  const dataDetails = (data) => {
    const options = [];
    data.forEach((elem) => {
      options.push({ name: elem.name, id: elem.id });
    });
    return options;
  };

  const handleChangeSearch = (filter) => {
    let newFilters = qs.parse(search, { ignoreQueryPrefix: true });
    const keysFilters = Object.keys(newFilters);
    const keysFilter = Object.keys(filter);
    keysFilter.forEach((elem, index) => {
      for (let i = 0; i < keysFilters.length; i++) {
        if (elem === keysFilters[i]) {
          delete newFilters[keysFilters[i]];
          newFilters[elem] = filter[elem];
        }
        if (i === keysFilters.length - 1 && elem !== keysFilters[i]) {
          newFilters[elem] = filter[elem];
        }
      }
    });
    return (filters = "?" + qs.stringify(newFilters));
  };

  /* Genres */

  const handleChangeGenre = (value) => {
    if (value === undefined) {
      setGenre(undefined);
      const genreChanged = { genres: undefined };
      filters = handleChangeSearch(genreChanged);
    } else {
      setGenre(value.name);
      const genreChanged = { genres: value.id };
      filters = handleChangeSearch(genreChanged);
    }
    setSearch(filters);
  };

  /* Platforms */

  const handleChangePlatforms = (value) => {
    if (value === undefined) {
      setPlatforms(undefined);
      const platformChanged = { genres: undefined };
      filters = handleChangeSearch(platformChanged);
    } else {
      setPlatforms(value.name);
      const platformChanged = { genres: value.id };
      filters = handleChangeSearch(platformChanged);
    }
    setSearch(filters);
  };

  /* search bar */
  const [inputValue, setInputValue] = useState("");

  const handleValidSearch = (event) => {
    const value = event.target.value;
    if (event.charCode === 13) {
      console.log("ou pas");
      if (!value) {
        console.log("no value");
        if (search) {
          let str = search;
          console.log("value in memory", search);
          if (search.indexOf("?search=") !== -1) {
            let newStr = str.slice(str.indexOf("&"));
            newStr = newStr.replace("&search_precise=true", "");
            setSearch(newStr);
            setSearchValidated(false);
            console.log("==>", newStr, str.indexOf("&"));
          } else {
            console.log("presque fini");
            const str = "&search_precise=true";
            const index1 = search.indexOf("&search");
            const index2 = search.indexOf(str);
            const newSearch =
              search.slice(0, index1) + search.slice(index2 + str.length);
            console.log(newSearch);
            setSearchValidated(false);
          }
        }
      } else {
        if (search) {
          setSearch(search + "&search=" + value + "&search_precise=true");
        } else {
          setSearch("?search=" + value + "&search_precise=true");
        }
        setSearchValidated(true);
      }
    } else {
      setInputValue(value);
    }
  };
  return (
    <header>
      <div className="container headerContent">
        <div className="headerTop">
          <div className="logo">
            <img className="logoTitle" src={logo} alt="logo ghost games" />
          </div>
          <div className="searchTopBar">
            <input
              value={inputValue}
              type="text"
              className="searchBar"
              onKeyPress={handleValidSearch}
              onChange={handleValidSearch}
            />
          </div>
        </div>
        {isLoading ? (
          <div>waiting data...</div>
        ) : (
          <div className="headerBottom">
            <ScrollingMenu
              value={platforms}
              placeholder="Select Platforms"
              options={dataDetails(data.platforms)}
              onChange={(elem) => handleChangePlatforms(elem)}
            />
            <ScrollingMenu
              value={genre}
              placeholder="Select Genre"
              onChange={(elem) => handleChangeGenre(elem)}
              options={dataDetails(data.genres)}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
