import { useReactiveVar } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { darkModeVar, toggleDarkMode } from "../apollo";

const Icon = styled.span`
  color: ${(props) => props.theme.darkModeBtn};
`;

const DarkModeBtn = () => {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <Icon onClick={toggleDarkMode}>
      <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
    </Icon>
  );
};

export default DarkModeBtn;
