import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

const SliderContainer = styled.div<SliderContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: ${(prop) => prop.height}px;
  & + & {
    margin-top: 10px;
  }
`;

const SliderBox = styled.div<SliderBoxProps>`
  overflow-x: hidden;
  position: absolute;
  left: 0;
  right: 0;
  margin: ${(prop) => (prop.margin ? "0 2.5em" : "0")};
  transition: all 0.3s ease;
  isolation: isolate;
`;

const SliderList = styled.ul<SliderListProps>`
  display: flex;
  width: max-content;
  transform: translateX(${(prop) => (prop.scroll > 0 ? 0 : prop.scroll)}px);
  transition: all 0.5s ease;
`;

export const NextBtn = styled.span`
  color: ${(prop) => prop.theme.accent};
  font-size: 30px;
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  padding: 0 5px 0 10px;
  border-radius: 999px;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${(prop) => prop.theme.hoverColor};
  }
`;

export const PrevBtn = styled.span`
  color: ${(prop) => prop.theme.accent};
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  padding: 0 10px 0 5px;
  border-radius: 999px;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${(prop) => prop.theme.hoverColor};
  }
`;

interface SliderContainerProps {
  height: number;
}

interface SliderBoxProps {
  margin: boolean;
}

interface SliderListProps {
  scroll: number;
}

interface SliderProps {
  slideWidth: number;
}

export const Slider: React.FC<SliderProps> = ({ slideWidth, children }) => {
  const [scroll, setScroll] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [blockWidth, setBlockWidth] = useState<number>(0);
  const [listWidth, setListWidth] = useState<number>(0);

  const nextBtn = () => {
    setScroll((prev) => (prev -= slideWidth));
  };

  const prevBtn = () => {
    setScroll((prev) => (prev += slideWidth));
  };

  return (
    <SliderContainer height={height}>
      {listWidth > blockWidth && scroll < 0 && (
        <PrevBtn onClick={prevBtn}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </PrevBtn>
      )}
      <SliderBox
        ref={(ref) => {
          if (ref) {
            setBlockWidth(ref?.clientWidth);
            setHeight(ref?.clientHeight);
          }
        }}
        margin={listWidth > blockWidth}
      >
        <SliderList
          ref={(ref) => ref && setListWidth(ref?.clientWidth)}
          scroll={scroll}
        >
          {children}
        </SliderList>
      </SliderBox>
      {listWidth > blockWidth && scroll * -1 + blockWidth < listWidth && (
        <NextBtn onClick={nextBtn}>
          <FontAwesomeIcon icon={faCaretRight} />
        </NextBtn>
      )}
    </SliderContainer>
  );
};
