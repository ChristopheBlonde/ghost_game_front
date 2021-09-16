import { useState, useEffect } from "react";
import "./Home.scss";
import axios from "axios";
import GameCard from "../../components/GameCard/GameCard";

const Home = ({ searchValidated, search, setSearchValidated }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search) {
          const response = await axios.get(
            `http://localhost:5000/home${search}`
          );
          console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        } else {
          const response = await axios.get(`http://localhost:5000/home`);
          console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, setSearchValidated]);

  return isLoading ? (
    <div>
      <span>Chargement en cours..</span>
    </div>
  ) : (
    <div className="home">
      <div className="container">
        {searchValidated ? (
          <h1 className="alertSearch">
            <span className="alertSpan">{data.count}</span>
            {` Résultats pour la recherche de `}
            <span className="alertSpan">{data.searchFor}</span>
          </h1>
        ) : null}
        <div className="cardContainer">
          {data.results.map((elem) => {
            return <GameCard key={elem.id} data={elem} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
