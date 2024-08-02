import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

const shortName = uniqueNamesGenerator({
  dictionaries: [colors, adjectives, animals],
  style: "lowerCase",
  separator: "-",
  length: 2,
}); // red_big_donkey


 
export default  shortName ;
