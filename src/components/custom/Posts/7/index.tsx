import Button from "@/components/static/Button";
import Section from "@/components/static/Section";
import { LocationData } from "@/lib/types";

export default function Posts_7({
  locationData,
}: {
  locationData: {
    title: { rendered: string };
    acf: {
      abhol_open: Record<string, string>;
      street: string;
      number: number;
      zip: number;
      city: string;
      phone: string;
      lat: string;
      lng: string;
    };
  };
}) {
  const openingHours = locationData?.acf?.abhol_open;

  const formatTime = (time: any) => {
    if (!time || time.trim() === "null") return "Geschlossen";
    const cleanTime = time.trim().padStart(4, "0");
    return `${cleanTime.slice(0, 2)}:${cleanTime.slice(2)} Uhr`;
  };

  const days = [
    { key: "mo", label: "Montag" },
    { key: "di", label: "Dienstag" },
    { key: "mi", label: "Mittwoch" },
    { key: "do", label: "Donnerstag" },
    { key: "fr", label: "Freitag" },
    { key: "sa", label: "Samstag" },
    { key: "so", label: "Sonntag" },
  ];

  return (
    <Section dataComponent="Posts_7">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?q=${locationData?.acf?.lat},${locationData?.acf?.lng}`}
              width="600"
              height="450"
              loading="lazy"
            ></iframe>
          </div>
          <div>
            <h3 className="text-h3 mb-4">{locationData?.title?.rendered}</h3>
            <p>{locationData?.acf?.street + locationData?.acf?.number}</p>
            <p>{locationData?.acf?.zip + locationData?.acf?.city}</p>
            <Button
              as="link"
              link={{
                url: "tel:" + locationData?.acf?.phone,
                title: locationData?.acf?.phone,
                target: "_self",
              }}
              className="my-4"
            >
              {locationData?.acf?.phone}
            </Button>
            <h4 className="text-h4">Öffungszeiten</h4>
            <table className="w-full mt-4 lg:mt-8">
              <tbody className="border-2 border-tabelle-border">
                {days.map(({ key, label }, index) => (
                  <tr
                    key={key}
                    className={`border-2 border-tabelle-border ${
                      index % 2 === 0 ? "bg-transparent" : "bg-tabelle-background"
                    }`}
                  >
                    <td className="p-2 border-r-2 border-tabelle-border">{label}</td>
                    <td className="p-2">
                      {openingHours[`abhol_open_${key}_start`] &&
                      openingHours[`abhol_open_${key}_end`]
                        ? `${formatTime(openingHours[`abhol_open_${key}_start`])} - ${formatTime(
                            openingHours[`abhol_open_${key}_end`]
                          )}`
                        : "Geschlossen"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Section>
  );
}
