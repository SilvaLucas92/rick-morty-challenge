import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import "./Modal.scss";
import { useFilters } from "../../context/FiltersContext";
import type { Filters } from "../../types/filters";
import { Button } from "../Button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setPage: (page: number) => void;
}

const status = ["Alive", "Dead", "Unknown"];
const species = [
  "Human",
  "Alien",
  "Humanoid",
  "Poopybutthole",
  "Mythological",
  "Unknown",
  "Animal",
  "Disease",
  "Robot",
  "Cronenberg",
  "Planet",
];

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, setPage }) => {
  if (!isOpen) return null;

  const { filters, setFilters } = useFilters();
  const [values, setValues] = useState<Omit<Filters, "name">>({
    status: filters.status,
    species: filters.species,
  });

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, ...values }));
    setPage(1);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Filters</h2>
          <button className="modal-close" onClick={onClose}>
            <HiX />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label htmlFor="status-filter" className="modal-form-label">
              Status
            </label>
            <select
              id="status-filter"
              className="modal-form-select"
              name="status"
              onChange={handleChange}
              value={values.status}
            >
              <option value="">Select a status</option>
              {status.map((value) => (
                <option value={value} key={value}>{value}</option>
              ))}
            </select>
          </div>

          <div className="modal-form-group">
            <label htmlFor="species-filter" className="modal-form-label">
              Species
            </label>
            <select
              id="species-filter"
              className="modal-form-select"
              name="species"
              onChange={handleChange}
              value={values.species}
            >
              <option value="">Select a specie</option>
              {species.map((value) => (
                <option value={value} key={value}>{value}</option>
              ))}
            </select>
          </div>

          <Button type="submit">Save</Button>
        </form>
      </div>
    </div>
  );
};
