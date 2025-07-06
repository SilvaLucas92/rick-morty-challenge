import React from "react";
import { Container } from "../../components/Container/Container";
import "./NotFound.scss";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const NotFound: React.FC = () => {
  return (
    <Container>
      <section className="not-found-content">
        <h1>Oops! </h1>
        <p>We couldn t find the page you are looking for!</p>

        <Link to="/" className="return-home">
          <FaArrowLeft /> Return to home
        </Link>
      </section>
    </Container>
  );
};

