import L from "leaflet";

export const genIcon = (iconPath: string) => {
  return L.icon({
    iconUrl: iconPath,
    iconSize: [35, 35],
  });
};
