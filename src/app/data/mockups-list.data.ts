import { Mockup } from '../models/mockup.model';

const imgsRoute = './assets/images/';

export const MOCKUPS: Mockup[] = [
  {
    id: '16p-madera',
    title: "Rompecabezas de 16 piezas de madera",
    shortTitle: "16p madera",
    img: `${imgsRoute}/16p-madera-mockup.png`,
    svg: `${imgsRoute}/16p-madera-clip_path.svg`
  },
  { id: '30p-madera',
    title: "Rompecabezas de 30 piezas de madera",
    shortTitle: "30p madera",
    img: `${imgsRoute}/30p-madera-mockup.png`,
    svg: `${imgsRoute}/30p-madera-clip_path.svg`
  },
  {
    id: '54p-carton',
    title: "Rompecabezas de 54 piezas de cartón",
    shortTitle: "54p cartón",
    img: `${imgsRoute}/54p-carton-mockup.png`,
    svg: `${imgsRoute}/54p-carton-clip_path.svg`
  }
];
