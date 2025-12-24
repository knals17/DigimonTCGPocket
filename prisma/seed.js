import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const cards = [
  {
    "id": "BT1-010",
    "name": "Agumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-010.webp"
  },
  {
    "id": "BT1-010",
    "name": "Agumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-010.webp"
  },
  {
    "id": "BT1-010",
    "name": "Agumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-010.webp"
  },
  {
    "id": "BT1-010",
    "name": "Agumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-010.webp"
  },
  {
    "id": "BT1-010",
    "name": "Agumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-010.webp"
  },
  {
    "id": "BT1-011",
    "name": "Agumon Expert",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-011.webp"
  },
  {
    "id": "BT1-011",
    "name": "Agumon Expert",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-011.webp"
  },
  {
    "id": "BT1-055",
    "name": "Angemon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-055.webp"
  },
  {
    "id": "BT1-027",
    "name": "Armadillomon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-027.webp"
  },
  {
    "id": "BT1-002",
    "name": "Bebydomon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-002.webp"
  },
  {
    "id": "BT1-017",
    "name": "Birdramon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-017.webp"
  },
  {
    "id": "BT1-012",
    "name": "Biyomon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-012.webp"
  },
  {
    "id": "BT1-102",
    "name": "Blade of the True",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-102.webp"
  },
  {
    "id": "BT1-105",
    "name": "Blast Fire",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-105.webp"
  },
  {
    "id": "BT1-097",
    "name": "Boring Storm",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-097.webp"
  },
  {
    "id": "BT1-095",
    "name": "Brave Shield",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-095.webp"
  },
  {
    "id": "BT1-095",
    "name": "Brave Shield",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-095.webp"
  },
  {
    "id": "BT1-026",
    "name": "Breakdramon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-026.webp"
  },
  {
    "id": "BT1-039",
    "name": "Cerberusmon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-039.webp"
  },
  {
    "id": "BT1-058",
    "name": "Chirinmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-058.webp"
  },
  {
    "id": "BT1-006",
    "name": "Cupimon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-006.webp"
  },
  {
    "id": "BT1-006",
    "name": "Cupimon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-006.webp"
  },
  {
    "id": "BT1-053",
    "name": "Darcmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-053.webp"
  },
  {
    "id": "BT1-019",
    "name": "DarkTyrannomon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-019.webp"
  },
  {
    "id": "BT1-019",
    "name": "DarkTyrannomon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-019.webp"
  },
  {
    "id": "BT1-075",
    "name": "Digitamamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-075.webp"
  },
  {
    "id": "BT1-112",
    "name": "Dimension Scissor",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-112.webp"
  },
  {
    "id": "BT1-033",
    "name": "Dolphmon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-033.webp"
  },
  {
    "id": "BT1-028",
    "name": "Elecmon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-028.webp"
  },
  {
    "id": "BT1-028",
    "name": "Elecmon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-028.webp"
  },
  {
    "id": "BT1-018",
    "name": "Flarerizamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-018.webp"
  },
  {
    "id": "BT1-110",
    "name": "Flower Cannon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-110.webp"
  },
  {
    "id": "BT1-110",
    "name": "Flower Cannon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-110.webp"
  },
  {
    "id": "BT1-110",
    "name": "Flower Cannon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-110.webp"
  },
  {
    "id": "BT1-110",
    "name": "Flower Cannon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-110.webp"
  },
  {
    "id": "BT1-110",
    "name": "Flower Cannon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-110.webp"
  },
  {
    "id": "BT1-113",
    "name": "Forbidden Temptation",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-113.webp"
  },
  {
    "id": "BT1-032",
    "name": "Frigimon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-032.webp"
  },
  {
    "id": "BT1-008",
    "name": "Frimon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-008.webp"
  },
  {
    "id": "BT1-029",
    "name": "Gabumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-029.webp"
  },
  {
    "id": "BT1-029",
    "name": "Gabumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-029.webp"
  },
  {
    "id": "BT1-029",
    "name": "Gabumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-029.webp"
  },
  {
    "id": "BT1-029",
    "name": "Gabumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-029.webp"
  },
  {
    "id": "BT1-029",
    "name": "Gabumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-029.webp"
  },
  {
    "id": "BT1-029",
    "name": "Gabumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-029.webp"
  },
  {
    "id": "BT1-022",
    "name": "Garudamon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-022.webp"
  },
  {
    "id": "BT1-036",
    "name": "Garurumon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-036.webp"
  },
  {
    "id": "BT1-111",
    "name": "Giga Blaster",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-111.webp"
  },
  {
    "id": "BT1-064",
    "name": "Goblimon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-064.webp"
  },
  {
    "id": "BT1-064",
    "name": "Goblimon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-064.webp"
  },
  {
    "id": "BT1-064",
    "name": "Goblimon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-064.webp"
  },
  {
    "id": "BT1-104",
    "name": "Golden Ripper",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-104.webp"
  },
  {
    "id": "BT1-030",
    "name": "Gomamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-030.webp"
  },
  {
    "id": "BT1-037",
    "name": "Gorillamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-037.webp"
  },
  {
    "id": "BT1-037",
    "name": "Gorillamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-037.webp"
  },
  {
    "id": "BT1-100",
    "name": "Grace Cross Freezer",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-100.webp"
  },
  {
    "id": "BT1-083",
    "name": "GranKuwagamon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-083.webp"
  },
  {
    "id": "BT1-083",
    "name": "GranKuwagamon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-083.webp"
  },
  {
    "id": "BT1-090",
    "name": "Gravity Crush",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-090.webp"
  },
  {
    "id": "BT1-090",
    "name": "Gravity Crush",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-090.webp"
  },
  {
    "id": "BT1-093",
    "name": "Great Tornado",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-093.webp"
  },
  {
    "id": "BT1-015",
    "name": "Greymon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-015.webp"
  },
  {
    "id": "BT1-015",
    "name": "Greymon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-015.webp"
  },
  {
    "id": "BT1-020",
    "name": "Groundramon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-020.webp"
  },
  {
    "id": "BT1-020",
    "name": "Groundramon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-020.webp"
  },
  {
    "id": "BT1-099",
    "name": "Hearts Attack",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-099.webp"
  },
  {
    "id": "BT1-081",
    "name": "HerculesKabuterimon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-081.webp"
  },
  {
    "id": "BT1-107",
    "name": "Holy Wave",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-107.webp"
  },
  {
    "id": "BT1-107",
    "name": "Holy Wave",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-107.webp"
  },
  {
    "id": "BT1-107",
    "name": "Holy Wave",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-107.webp"
  },
  {
    "id": "BT1-108",
    "name": "Horn Buster",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-108.webp"
  },
  {
    "id": "BT1-108",
    "name": "Horn Buster",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-108.webp"
  },
  {
    "id": "BT1-108",
    "name": "Horn Buster",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-108.webp"
  },
  {
    "id": "BT1-101",
    "name": "Howling Crusher",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-101.webp"
  },
  {
    "id": "BT1-101",
    "name": "Howling Crusher",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-101.webp"
  },
  {
    "id": "BT1-034",
    "name": "Ikkakumon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-034.webp"
  },
  {
    "id": "BT1-088",
    "name": "Izzy Izumi",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-088.webp"
  },
  {
    "id": "BT1-088",
    "name": "Izzy Izumi",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-088.webp"
  },
  {
    "id": "BT1-088",
    "name": "Izzy Izumi",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-088.webp"
  },
  {
    "id": "BT1-078",
    "name": "Jagamon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-078.webp"
  },
  {
    "id": "BT1-078",
    "name": "Jagamon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-078.webp"
  },
  {
    "id": "BT1-073",
    "name": "Kabuterimon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-073.webp"
  },
  {
    "id": "BT1-073",
    "name": "Kabuterimon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-073.webp"
  },
  {
    "id": "BT1-014",
    "name": "Kokatorimon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-014.webp"
  },
  {
    "id": "BT1-068",
    "name": "Kokuwamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-068.webp"
  },
  {
    "id": "BT1-046",
    "name": "Kudamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-046.webp"
  },
  {
    "id": "BT1-070",
    "name": "Kuwagamon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-070.webp"
  },
  {
    "id": "BT1-005",
    "name": "Kyaromon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-005.webp"
  },
  {
    "id": "BT1-049",
    "name": "Labramon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-049.webp"
  },
  {
    "id": "BT1-035",
    "name": "Leomon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-035.webp"
  },
  {
    "id": "BT1-035",
    "name": "Leomon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-035.webp"
  },
  {
    "id": "BT1-035",
    "name": "Leomon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-035.webp"
  },
  {
    "id": "BT1-054",
    "name": "Liamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-054.webp"
  },
  {
    "id": "BT1-079",
    "name": "Lillymon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-079.webp"
  },
  {
    "id": "BT1-079",
    "name": "Lillymon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-079.webp"
  },
  {
    "id": "BT1-050",
    "name": "Liollmon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-050.webp"
  },
  {
    "id": "BT1-042",
    "name": "LoaderLeomon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-042.webp"
  },
  {
    "id": "BT1-096",
    "name": "Mad Dog Fire",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-096.webp"
  },
  {
    "id": "BT1-060",
    "name": "MagnaAngemon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-060.webp"
  },
  {
    "id": "BT1-060",
    "name": "MagnaAngemon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-060.webp"
  },
  {
    "id": "BT1-060",
    "name": "MagnaAngemon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-060.webp"
  },
  {
    "id": "BT1-060",
    "name": "MagnaAngemon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-060.webp"
  },
  {
    "id": "BT1-060",
    "name": "MagnaAngemon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-060.webp"
  },
  {
    "id": "BT1-086",
    "name": "Matt Ishida",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-086.webp"
  },
  {
    "id": "BT1-086",
    "name": "Matt Ishida",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-086.webp"
  },
  {
    "id": "BT1-076",
    "name": "MegaKabuterimon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-076.webp"
  },
  {
    "id": "BT1-076",
    "name": "MegaKabuterimon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-076.webp"
  },
  {
    "id": "BT1-076",
    "name": "MegaKabuterimon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-076.webp"
  },
  {
    "id": "BT1-076",
    "name": "MegaKabuterimon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-076.webp"
  },
  {
    "id": "BT1-044",
    "name": "MetalGarurumon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-044.webp"
  },
  {
    "id": "BT1-044",
    "name": "MetalGarurumon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-044.webp"
  },
  {
    "id": "BT1-021",
    "name": "MetalGreymon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-021.webp"
  },
  {
    "id": "BT1-021",
    "name": "MetalGreymon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-021.webp"
  },
  {
    "id": "BT1-021",
    "name": "MetalGreymon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-021.webp"
  },
  {
    "id": "BT1-021",
    "name": "MetalGreymon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-021.webp"
  },
  {
    "id": "BT1-114",
    "name": "MetalGreymon",
    "rarity": "sec",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-114.webp"
  },
  {
    "id": "BT1-114",
    "name": "MetalGreymon",
    "rarity": "sec",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-114.webp"
  },
  {
    "id": "BT1-114",
    "name": "MetalGreymon",
    "rarity": "sec",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-114.webp"
  },
  {
    "id": "BT1-024",
    "name": "MetalTyrannomon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-024.webp"
  },
  {
    "id": "BT1-089",
    "name": "Mimi Tachikawa",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-089.webp"
  },
  {
    "id": "BT1-089",
    "name": "Mimi Tachikawa",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-089.webp"
  },
  {
    "id": "BT1-089",
    "name": "Mimi Tachikawa",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-089.webp"
  },
  {
    "id": "BT1-089",
    "name": "Mimi Tachikawa",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-089.webp"
  },
  {
    "id": "BT1-061",
    "name": "Mistymon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-061.webp"
  },
  {
    "id": "BT1-031",
    "name": "Monmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-031.webp"
  },
  {
    "id": "BT1-009",
    "name": "Monodramon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-009.webp"
  },
  {
    "id": "BT1-009",
    "name": "Monodramon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-009.webp"
  },
  {
    "id": "BT1-038",
    "name": "Monzaemon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-038.webp"
  },
  {
    "id": "BT1-038",
    "name": "Monzaemon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-038.webp"
  },
  {
    "id": "BT1-038",
    "name": "Monzaemon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-038.webp"
  },
  {
    "id": "BT1-038",
    "name": "Monzaemon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-038.webp"
  },
  {
    "id": "BT1-013",
    "name": "Muchomon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-013.webp"
  },
  {
    "id": "BT1-065",
    "name": "Mushroomon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-065.webp"
  },
  {
    "id": "BT1-092",
    "name": "Nuclear Laser",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-092.webp"
  },
  {
    "id": "BT1-094",
    "name": "Oblivion Bird",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-094.webp"
  },
  {
    "id": "BT1-069",
    "name": "Ogremon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-069.webp"
  },
  {
    "id": "BT1-077",
    "name": "Okuwamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-077.webp"
  },
  {
    "id": "BT1-077",
    "name": "Okuwamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-077.webp"
  },
  {
    "id": "BT1-077",
    "name": "Okuwamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-077.webp"
  },
  {
    "id": "BT1-084",
    "name": "Omnimon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-084.webp"
  },
  {
    "id": "BT1-084",
    "name": "Omnimon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-084.webp"
  },
  {
    "id": "BT1-084",
    "name": "Omnimon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-084.webp"
  },
  {
    "id": "BT1-084",
    "name": "Omnimon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-084.webp"
  },
  {
    "id": "BT1-084",
    "name": "Omnimon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-084.webp"
  },
  {
    "id": "BT1-084",
    "name": "Omnimon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-084.webp"
  },
  {
    "id": "BT1-067",
    "name": "Palmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-067.webp"
  },
  {
    "id": "BT1-067",
    "name": "Palmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-067.webp"
  },
  {
    "id": "BT1-067",
    "name": "Palmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-067.webp"
  },
  {
    "id": "BT1-048",
    "name": "Patamon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-048.webp"
  },
  {
    "id": "BT1-048",
    "name": "Patamon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-048.webp"
  },
  {
    "id": "BT1-048",
    "name": "Patamon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-048.webp"
  },
  {
    "id": "BT1-056",
    "name": "Petermon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-056.webp"
  },
  {
    "id": "BT1-059",
    "name": "Piximon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-059.webp"
  },
  {
    "id": "BT1-051",
    "name": "Reppamon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-051.webp"
  },
  {
    "id": "BT1-082",
    "name": "Rosemon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-082.webp"
  },
  {
    "id": "BT1-082",
    "name": "Rosemon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-082.webp"
  },
  {
    "id": "BT1-043",
    "name": "SaberLeomon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-043.webp"
  },
  {
    "id": "BT1-091",
    "name": "Scrap Claw",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-091.webp"
  },
  {
    "id": "BT1-052",
    "name": "Seasarmon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-052.webp"
  },
  {
    "id": "BT1-063",
    "name": "Seraphimon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-063.webp"
  },
  {
    "id": "BT1-063",
    "name": "Seraphimon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-063.webp"
  },
  {
    "id": "BT1-057",
    "name": "Sirenmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-057.webp"
  },
  {
    "id": "BT1-057",
    "name": "Sirenmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-057.webp"
  },
  {
    "id": "BT1-057",
    "name": "Sirenmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-057.webp"
  },
  {
    "id": "BT1-023",
    "name": "SkullGreymon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-023.webp"
  },
  {
    "id": "BT1-023",
    "name": "SkullGreymon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-023.webp"
  },
  {
    "id": "BT1-062",
    "name": "SlashAngemon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-062.webp"
  },
  {
    "id": "BT1-062",
    "name": "SlashAngemon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-062.webp"
  },
  {
    "id": "BT1-062",
    "name": "SlashAngemon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-062.webp"
  },
  {
    "id": "BT1-109",
    "name": "Smashed Potatoes",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-109.webp"
  },
  {
    "id": "BT1-106",
    "name": "Symphony No.1 <Polyphony>",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-106.webp"
  },
  {
    "id": "BT1-087",
    "name": "T.K. Takaishi",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-087.webp"
  },
  {
    "id": "BT1-087",
    "name": "T.K. Takaishi",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-087.webp"
  },
  {
    "id": "BT1-087",
    "name": "T.K. Takaishi",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-087.webp"
  },
  {
    "id": "BT1-087",
    "name": "T.K. Takaishi",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-087.webp"
  },
  {
    "id": "BT1-085",
    "name": "Tai Kamiya",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-085.webp"
  },
  {
    "id": "BT1-085",
    "name": "Tai Kamiya",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-085.webp"
  },
  {
    "id": "BT1-085",
    "name": "Tai Kamiya",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-085.webp"
  },
  {
    "id": "BT1-085",
    "name": "Tai Kamiya",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-085.webp"
  },
  {
    "id": "BT1-085",
    "name": "Tai Kamiya",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-085.webp"
  },
  {
    "id": "BT1-007",
    "name": "Tanemon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-007.webp"
  },
  {
    "id": "BT1-007",
    "name": "Tanemon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-007.webp"
  },
  {
    "id": "BT1-066",
    "name": "Tentomon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-066.webp"
  },
  {
    "id": "BT1-066",
    "name": "Tentomon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-066.webp"
  },
  {
    "id": "BT1-066",
    "name": "Tentomon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-066.webp"
  },
  {
    "id": "BT1-103",
    "name": "Testament",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-103.webp"
  },
  {
    "id": "BT1-047",
    "name": "Tinkermon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-047.webp"
  },
  {
    "id": "BT1-080",
    "name": "Titamon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-080.webp"
  },
  {
    "id": "BT1-074",
    "name": "Togemon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-074.webp"
  },
  {
    "id": "BT1-074",
    "name": "Togemon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-074.webp"
  },
  {
    "id": "BT1-045",
    "name": "Tsukaimon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-045.webp"
  },
  {
    "id": "BT1-045",
    "name": "Tsukaimon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-045.webp"
  },
  {
    "id": "BT1-016",
    "name": "Tyrannomon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-016.webp"
  },
  {
    "id": "BT1-003",
    "name": "Upamon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-003.webp"
  },
  {
    "id": "BT1-003",
    "name": "Upamon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-003.webp"
  },
  {
    "id": "BT1-003",
    "name": "Upamon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-003.webp"
  },
  {
    "id": "BT1-003",
    "name": "Upamon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-003.webp"
  },
  {
    "id": "BT1-098",
    "name": "V-Nova Blast",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-098.webp"
  },
  {
    "id": "BT1-115",
    "name": "Veedramon",
    "rarity": "sec",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-115.webp"
  },
  {
    "id": "BT1-115",
    "name": "Veedramon",
    "rarity": "sec",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-115.webp"
  },
  {
    "id": "BT1-115",
    "name": "Veedramon",
    "rarity": "sec",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-115.webp"
  },
  {
    "id": "BT1-071",
    "name": "Vegiemon",
    "rarity": "c",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-071.webp"
  },
  {
    "id": "BT1-004",
    "name": "Wanyamon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-004.webp"
  },
  {
    "id": "BT1-025",
    "name": "WarGreymon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-025.webp"
  },
  {
    "id": "BT1-025",
    "name": "WarGreymon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-025.webp"
  },
  {
    "id": "BT1-025",
    "name": "WarGreymon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-025.webp"
  },
  {
    "id": "BT1-025",
    "name": "WarGreymon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-025.webp"
  },
  {
    "id": "BT1-040",
    "name": "WereGarurumon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-040.webp"
  },
  {
    "id": "BT1-072",
    "name": "Woodmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-072.webp"
  },
  {
    "id": "BT1-072",
    "name": "Woodmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-072.webp"
  },
  {
    "id": "BT1-072",
    "name": "Woodmon",
    "rarity": "u",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-072.webp"
  },
  {
    "id": "BT1-001",
    "name": "Yokomon",
    "rarity": "r",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-001.webp"
  },
  {
    "id": "BT1-041",
    "name": "Zudomon",
    "rarity": "sr",
    "setName": "BT-01: Booster New Evolution",
    "imageUrl": "https://digicartas.click/cards/BT1-041.webp"
  }
];

async function main() {
    console.log('Seeding ' + cards.length + ' cards...');
    
    for (const card of cards) {
        // Validation check before insert
        if(!card.id || !card.name) {
             console.warn('Skipping invalid card:', card);
             continue;
        }

        await prisma.card.upsert({
            where: { id: card.id },
            update: {
                name: card.name,
                rarity: card.rarity,
                setName: card.setName,
                imageUrl: card.imageUrl
            },
            create: {
                id: card.id,
                name: card.name,
                rarity: card.rarity,
                setName: card.setName,
                imageUrl: card.imageUrl
            }
        });
    }
    console.log('Seeding completed.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
