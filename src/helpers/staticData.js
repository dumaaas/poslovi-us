import instagramIcon from "../../public/instagram-header-icon.svg";
import facebookIcon from "../../public/facebook-header-icon.svg";

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
  { id: "name", label: "Ime", minWidth: 150 },
  { id: "position", label: "Pozicija", minWidth: 170 },
  { id: "location", label: "Lokacija", minWidth: 100 },
  { id: "category", label: "Kategorija", minWidth: 100 },
  { id: "offer_type", label: "Tip oglasa", minWidth: 100 },
  { id: "salary", label: "Plata", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "featured", label: "Izdvojen", minWidth: 50 },
  { id: "featured_plus", label: "Izdvojen +", minWidth: 80 },
  { id: "is_remote", label: "Remote", minWidth: 50 },
  {
    id: "date_to",
    label: "Važi do",
    minWidth: 100,
    format: 'date2'
  },
  {
    id: "published_at",
    label: "Objavljeno",
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
  { id: "url", label: "Logo", minWidth: 100, format: "img" },
  {
    id: "link",
    label: "Link",
    minWidth: 170,
    format: "link",
  },
  {
    id: "published_at",
    label: "Datum objavljivanja",
    minWidth: 100,
    format: "date",
  },
];

export const cityColumns = [
  { id: "name", label: "Grad", minWidth: 200 },
  {
    id: "published_at",
    label: "Datum objavljivanja",
    minWidth: 200,
    format: "date",
  },
];

export const categoryColumns = [
  { id: "name", label: "Kategorija", minWidth: 200 },
  {
    id: "published_at",
    label: "Datum objavljivanja",
    minWidth: 200,
    format: "date",
  },
];

export const navMenu = [
  {
    name: "Početna",
    href: "/",
  },
  {
    name: "Poslovi",
    href: "/jobs",
  },
  {
    name: "Kandidati",
    href: "/offers",
  },
  {
    name: "Premium oglasi",
    href: "/featured",
  },
  {
    name: "Klijenti",
    href: "/clients",
  },
  {
    name: "Vesti",
    href: "/blog",
  },
  {
    name: "O nama",
    href: "/about",
  },
  {
    name: "Poslovi",
    href: "/dashboard/jobs",
    isDashboard: true,
  },
  {
    name: "Klijenti",
    href: "/dashboard/clients",
    isDashboard: true,
  },
  {
    name: "Vijesti",
    href: "/dashboard/blog",
    isDashboard: true,
  },
  {
    name: "Gradovi",
    href: "/dashboard/cities",
    isDashboard: true,
  },
  {
    name: "Kategorije",
    href: "/dashboard/categories",
    isDashboard: true,
  },
];

export const socialCards = [
  {
    title: "Follow us on Instagram!",
    href: "https://www.instagram.com/vibecreative.digital/",
    icon: instagramIcon,
    tag: "@poslovius",
  },
  {
    title: "Follow us on Facebook!",
    href: "https://www.instagram.com/vibecreative.digital/",
    icon: facebookIcon,
    tag: "@poslovius",
  },
];
