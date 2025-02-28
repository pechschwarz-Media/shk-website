import { AcfLink, Media } from "@/lib/types";
import Posts_2_Inner from "./inner";
import getLocationData from "@/lib/queries/locations/getLocationData";

type Content = {
  media: Media;
  text: string;
  buttons: {
    button_1: AcfLink;
    button_2: AcfLink;
  };
};

export default function Posts_2({ content, title }: { content: Content; title: string }) {
  return <Posts_2_Inner content={content} title={title} />;
}
