import newsSolariaPress from "@/assets/news-solaria-press.jpg";
import newsCityscape from "@/assets/news-cityscape.jpg";
import newsInvest from "@/assets/news-invest.jpg";
import newsChooseProject from "@/assets/news-choose-project.jpg";
import newsCityHub from "@/assets/news-city-hub.jpg";
import newsSolariaLaunch from "@/assets/news-solaria-launch.jpg";

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: "press-conference-solaria-mall",
    title: "Press Conference to Announce Solaria Mall",
    date: "2024",
    image: newsSolariaPress,
    excerpt:
      "ASWAQ Real Estate Development tops the front pages of news platforms with the launch of Solaria Mall.",
    content: [
      "Aswaq Real Estate Development tops the front pages of news platforms.",
      "Follow the latest exclusive news of the press conference of ASWAQ Developments and Project Managements to learn more about its launch of its fourth project in El Shorouk City — Solaria Mall.",
    ],
  },
  {
    id: "cityscape-egypt-2024",
    title: "ASWAQ Takes Part in Cityscape Egypt 2024",
    date: "2024",
    image: newsCityscape,
    excerpt:
      "ASWAQ Developments participated in Cityscape Egypt 2024, one of the largest real estate exhibitions in the Middle East.",
    content: [
      "Aswaq Developments participated in the activities of Cityscape Egypt 2024 — one of the largest real estate exhibitions in Egypt and the Middle East.",
      "By participating in this exhibition, we presented exclusive offers for all our projects in Shorouk City. All our offers were exclusive and limited to the expo only, which led to a very noticeable influx of customers to our booth.",
    ],
  },
  {
    id: "invest-with-experience",
    title:
      "Invest with a Name That Has Previous Experience in Real Estate and Urban Development",
    date: "16 August 2024",
    image: newsInvest,
    excerpt:
      "ASWAQ Real Estate Development is an alliance between a group of the largest companies with a long history in real estate.",
    content: [
      "Aswaq Real Estate Development is an alliance between a group of the largest companies with a long history in the field of real estate and urban development for more than 20 years.",
      "We have provided more than 400 high-quality levels in various fields (commercial and industrial, administrative and residential) in new cities and all over the republic.",
      "3 projects have been launched in Shorouk City: Mercado Mall, Arena Mall, and City Hub Mall. And soon Aswaq Real Estate Development will announce a surprise ready for transfer in the commercial market in Shorouk City.",
    ],
  },
  {
    id: "choose-suitable-project",
    title: "We Help You Choose the Most Suitable Project for Investment",
    date: "20 August 2024",
    image: newsChooseProject,
    excerpt:
      "If you are looking for excellence, there are 3 points that must be taken into account when choosing a distinctive investment opportunity.",
    content: [
      "If you are looking for excellence, there are 3 points that must be taken into account when choosing a distinctive investment opportunity.",
      "First: Choosing a location suitable for your field and close to the largest targeted class in your project.",
      "Second: You have the luxury of testing between different spaces according to the needs of your project.",
      "Third: Appropriate prices to start your new project with convenient payment systems.",
      "Arena Mall provides you with all the points of success and excellence. Arena Mall has a distinguished location in the middle of the most prestigious areas of Al Shorouk.",
      "Arena Mall is an integrated multi-use mall that includes a group of units (commercial – administrative – medical). Arena Mall provides appropriate prices for all activities and different payment systems.",
      "Be distinguished and join the Aswaq Real Estate Development family.",
    ],
  },
  {
    id: "invest-city-hub-mall",
    title:
      "An Opportunity to Invest in the City's Finest Commercial Mall in the Heart of Shorouk",
    date: "23 August 2024",
    image: newsCityHub,
    excerpt:
      "Take advantage of the golden opportunity for guaranteed investment with Aswaq Real Estate Development Company.",
    content: [
      "Take advantage of the golden opportunity for guaranteed investment with Aswaq Real Estate Development Company.",
      "We offer you City Hub Mall in the most vital areas in Shorouk City, in the clubs area, in front of Shorouk Club and City Club.",
      "It provides a distinctive view for most of the units in the mall and commercial density in the clubs area.",
      "Invest in City Hub Mall with a down payment starting from 20% and installments up to 6 years.",
    ],
  },
  {
    id: "launching-solaria-mall",
    title:
      "Launching the Fourth Masterpiece of ASWAQ Developments and Project Management",
    date: "19 September 2024",
    image: newsSolariaLaunch,
    excerpt:
      "ASWAQ Development announces the launch of its fourth project in Shorouk City — Solaria Mall.",
    content: [
      "Aswaq Development announces the launch of its fourth project in Shorouk City — Solaria Mall.",
      "A fully integrated multi-use service mall built in a modern contemporary style, where commercial, administrative, and medical units are available to serve all different activities and fields.",
      "Aswaq Development has taken into account all means of safety and luxury to provide everything the customer needs in their daily life.",
      "Solaria Mall is a light that shines with life.",
    ],
  },
];
