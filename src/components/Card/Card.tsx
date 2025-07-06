import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Card.scss";
import type { Character } from "../../types/character";
import { Badge } from "../Badge/Badge";

interface CardProps {
  isFavorite: boolean;
  toggleFavorite: (character: Character) => void;
  character: Character;
}

export const Card: React.FC<CardProps> = ({
  isFavorite,
  toggleFavorite,
  character,
}) => {
  const { name, image, status, species, location } = character;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(character);
  };

  return (
    <article className="card">
      <Link to={`/character/${character.id}`} className="card-link">
        <div className="card-image">
          <img src={image} alt={name} />
        </div>
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">{name}</h3>
            <Badge
              color={
                status === "Alive"
                  ? "green"
                  : status === "Dead"
                  ? "red"
                  : "gray"
              }
            >
              {status.toLowerCase()}
            </Badge>
          </div>
          <div className="card-info">
            <div className="info-item">
              <span className="info-label">Species</span>
              <span className="info-value">{species}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">{location.name}</span>
            </div>
          </div>
        </div>
      </Link>
      <div
        className={`heart-icon ${isFavorite ? "favorite" : ""}`}
        onClick={handleHeartClick}
      >
        <FaHeart />
      </div>
    </article>
  );
};
