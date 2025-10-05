import React from "react";

interface SocialLinksPickerProps {
  links: {
    label: string;
    url: string;
    icon: string;
  }[];
}

const SocialLinksPicker = ({ links }: SocialLinksPickerProps) => {
  console.log(links);
  return <div>{JSON.stringify(links, null, 2)}</div>;
};

export default SocialLinksPicker;
