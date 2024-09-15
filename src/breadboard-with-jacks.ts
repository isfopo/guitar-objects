import { cube, cuboid } from "@jscad/modeling/src/primitives";
import { subtract, union } from "@jscad/modeling/src/operations/booleans";

const breadboard = {
  width: 100,
  height: 50,
  length: 10,
  padding: {
    x: 10,
    y: 10,
    z: 10,
  },
};

const jacks = {
  diameter: 20,
  shaft: 10,
  clearance: 30,
};

const body = () => {
  return subtract(
    cuboid({
      size: [
        breadboard.width + breadboard.padding.x * 2,
        breadboard.height + breadboard.padding.y * 2,
        breadboard.length + breadboard.padding.z,
      ],
    }),
    cuboid({
      center: [0, 0, breadboard.padding.z / 2],
      size: [breadboard.width, breadboard.height, breadboard.length],
    })
  );
};

// A function declaration that returns geometry
export const main = () => {
  return body();
};
