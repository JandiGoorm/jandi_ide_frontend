export const getMedalColor = (level: number): string => {
  switch (level) {
    case 4:
      return "#27E2A4";
    case 3:
      return "#FFD700";
    case 2:
      return "#C0C0C0";
    case 1:
      return "#CD7F32";
    default:
      return "#b73d3d";
  }
};
