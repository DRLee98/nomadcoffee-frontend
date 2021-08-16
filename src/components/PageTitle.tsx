import React from "react";
import { Helmet } from "react-helmet-async";
import { siteName } from "../constants";

interface IPageTitleProp {
  title: string;
}

const PageTitle: React.FC<IPageTitleProp> = ({ title }) => {
  return (
    <Helmet>
      <title>
        {title} | {siteName}
      </title>
    </Helmet>
  );
};

export default PageTitle;
