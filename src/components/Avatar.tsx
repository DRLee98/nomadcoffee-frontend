import React from "react";
import { Circle, Image } from "./shared";

interface IAvatar {
  url?: string | null;
  sizes?: string;
}

const Avatar = ({ url, sizes }: IAvatar) =>
  url ? <Image src={url} sizes={sizes} /> : <Circle sizes={sizes} />;

export default Avatar;
