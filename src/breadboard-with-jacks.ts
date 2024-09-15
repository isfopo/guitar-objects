import { cube, cuboid, cylinder } from "@jscad/modeling/src/primitives";
import { subtract, union } from "@jscad/modeling/src/operations/booleans";
import { rotate, translate } from "@jscad/modeling/src/operations/transforms";

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

const body = ({ width, height, length, padding }: typeof breadboard) => {
  return subtract(
    cuboid({
      size: [width + padding.x * 2, height + padding.y * 2, length + padding.z],
    }),
    cuboid({
      center: [0, 0, padding.z / 2],
      size: [width, height, length],
    })
  );
};

const jackPorts = (
  { diameter, shaft, clearance }: typeof jacks,
  { width, height, length, padding }: typeof breadboard
) => {
  return subtract(
    cuboid({
      size: [
        width + padding.x * 2,
        clearance + padding.y * 2,
        clearance + padding.z,
      ],
    }),
    rotate(
      [0, Math.PI / 2, 0],
      union(
        cuboid({
          center: [-clearance / 2, 0, 0],
          size: [clearance, clearance + padding.x * 2, width],
        }),
        cylinder({
          radius: clearance / 2,
          height: width + padding.x * 2 - shaft * 2,
        }),
        cylinder({
          radius: diameter / 2,
          height: width + padding.x * 2,
        })
      )
    )
  );
};

// A function declaration that returns geometry
export const main = () => {
  return jackPorts(jacks, breadboard);
};
