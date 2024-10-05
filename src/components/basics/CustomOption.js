import React, { useState } from "react";
import styled from "styled-components";
import ArrowUp from "./../../assets/images/chevron-up.png";
import { globalColor } from "../../assets/variable/global";

const CustomSelect = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <CustomSelectWrapper className="custom-select">
      <div className="custom-select__header" onClick={toggleDropdown}>
        {selectedOption?.icon && (
          <img
            src={selectedOption?.icon || "default-icon-url"}
            alt={selectedOption?.label || "Default"}
            className="custom-select__icon"
          />
        )}
        <span>{selectedOption?.label || placeholder}</span>
        <span className="custom-select__arrow">
          {!isOpen ? (
            <img src={ArrowUp} className="arrow-up-img" alt="arrowUp" />
          ) : (
            <img src={ArrowUp} className="arrow-down-img" alt="ArrowDown" />
          )}
        </span>
      </div>
      {isOpen && (
        <ul className="custom-select__options">
          {options.map((option) => (
            <li
              key={option.value}
              className="custom-select__option"
              onClick={() => handleOptionClick(option)}
            >
              <img
                src={option.icon}
                alt={option.label}
                className="custom-select__option-icon"
              />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </CustomSelectWrapper>
  );
};
export default CustomSelect;

const CustomSelectWrapper = styled.div`
  /* CustomSelect.css */
  position: relative;
  width: 320px;
  font-family: Arial, sans-serif;
  .arrow-down-img {
    transform: rotate(180deg);
  }
  .custom-select__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid ${globalColor.gray_300};
    border-radius: 8px;
    cursor: pointer;
    background-color: white;
  }

  .custom-select__icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }

  .custom-select__arrow {
    margin-left: auto;
  }

  .custom-select__options {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    position: absolute;
    width: 100%;
    z-index: 10;
  }

  .custom-select__option {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .custom-select__option:hover {
    background-color: #f1f1f1;
  }

  .custom-select__option-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
`;
