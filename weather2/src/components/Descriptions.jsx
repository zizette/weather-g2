import React from "react";
import "./descriptions.css";

//import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
//import { BiHappy } from "react-icons/bi";
//import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

const Descriptions = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  const cards = [

    {
      id: 1,
      //icon: <MdCompress />,
      title: "Feels Like",
      data: weather.feels_like,
      unit: "ºC",
    },
    {
      id: 2,
      //icon: <MdOutlineWaterDrop />,
      title: "Max",
      data: weather.temp_max,
      unit: "ºC",
    },
    {
      id: 3,
      // icon: <FaWind />,
      title: "wind speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
  ];
  return (
    <div className="section section__descriptions">
      {cards.map(({ id, icon, title, data, unit }) => (
        <div key={id} className="card">
          <div className="description__card-icon">
            {icon}
            <small>{title}</small>
          </div>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default Descriptions;
