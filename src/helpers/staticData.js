export const cities = [
  {
    id: 1,
    name: "Chicago",
  },
  {
    id: 2,
    name: "New York",
  },
  {
    id: 3,
    name: "Los Angeles",
  },
];

export const jobTypeData = [
  {
    id: 1,
    name: "Full time",
  },
  {
    id: 2,
    name: "Part time",
  },
];

export const jobColumns = [
  { id: "name", label: "Ime", minWidth: 170 },
  { id: "position", label: "Pozicija", minWidth: 100 },
  { id: "location", label: "Lokacija", minWidth: 100 },
  { id: "offer_type", label: "Tip oglasa", minWidth: 100 },
  { id: "salary", label: "Plata", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "published_at",
    label: "Datum objavljivanja",
    minWidth: 100,
    format: "date",
  },
];

export const blogColumns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "url", label: "Slika", minWidth: 100 },
  {
    id: "published_at",
    label: "Datum objavljivanja",
    minWidth: 100,
    format: "date",
  },
];

export const clientColumns = [
  { id: "name", label: "Ime", minWidth: 170 },
  { id: "url", label: "Logo", minWidth: 100 },
  {
    id: "link",
    label: "Link",
    minWidth: 170,
  },
  {
    id: "published_at",
    label: "Datum objavljivanja",
    minWidth: 100,
    format: "date",
  },
];
