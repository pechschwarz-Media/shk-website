// @ts-nocheck

import dynamic from "next/dynamic";
import { LocationData } from "./types";

const Components = {
  header_5: dynamic(() => import("@/components/custom/Header/5")),
  locations: dynamic(() => import("@/components/custom/Locations")),
  gallery_1: dynamic(() => import("@/components/custom/Gallery/1")),
  cta_51: dynamic(() => import("@/components/custom/CTA/51")),
  layout_478: dynamic(() => import("@/components/custom/Layout/478")),
  layout_396: dynamic(() => import("@/components/custom/Layout/396")),
  posts_1: dynamic(() => import("@/components/custom/Posts/1")),
  posts_2: dynamic(() => import("@/components/custom/Posts/2")),
  posts_3: dynamic(() => import("@/components/custom/Posts/3")),
  posts_4: dynamic(() => import("@/components/custom/Posts/4")),
  posts_5: dynamic(() => import("@/components/custom/Posts/5")),
  posts_6: dynamic(() => import("@/components/custom/Posts/6")),
  posts_7: dynamic(() => import("@/components/custom/Posts/7")),
  posts_8: dynamic(() => import("@/components/custom/Posts/8")),
};

export default function ComponentRenderer({
  content,
  locationData,
}: {
  content?: any;
  locationData?: LocationData;
}) {
  if (content) {
    return content?.map((component, index) => {
      const Component = Components[component?.acf_fc_layout];
      return <Component content={component} key={index} locationData={locationData} />;
    });
  }
}
