// @ts-nocheck

import dynamic from "next/dynamic";
import { LocationData } from "./types";
import CTA_51_2 from "@/components/custom/CTA/51_2";

const Components = {
  header_5: dynamic(() => import("@/components/custom/Header/5")),
  locations: dynamic(() => import("@/components/custom/Locations")),
  gallery_1: dynamic(() => import("@/components/custom/Gallery/1")),
  cta_51: dynamic(() => import("@/components/custom/CTA/51")),
  layout_478: dynamic(() => import("@/components/custom/Layout/478")),
  layout_396: dynamic(() => import("@/components/custom/Layout/396")),
  layout_36: dynamic(() => import("@/components/custom/Layout/36")),
  logo_3: dynamic(() => import("@/components/custom/Logo/3")),
  layout_228: dynamic(() => import("@/components/custom/Layout/228")),
  layout_223: dynamic(() => import("@/components/custom/Layout/223")),
  gallery_20: dynamic(() => import("@/components/custom/Gallery/20")),
  cta_51_2: dynamic(() => import("@/components/custom/CTA/51_2")),
  cta_51_3: dynamic(() => import("@/components/custom/CTA/51_3")),
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
