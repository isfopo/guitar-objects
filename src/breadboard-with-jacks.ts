import {
  cube,
  cuboid,
  cylinder,
  roundedCuboid,
} from "@jscad/modeling/src/primitives";
import { subtract, union } from "@jscad/modeling/src/operations/booleans";
import { rotate, translate } from "@jscad/modeling/src/operations/transforms";

const breadboard = {
  width: 166,
  height: 51,
  length: 10,
  padding: 5,
};

const jacks = {
  diameter: 10,
  shaft: 2,
  clearance: 30,
};

const body = ({ width, height, length, padding }: typeof breadboard) => {
  return subtract(
    cuboid({
      size: [width + padding * 2, height + padding * 2, length + padding],
    }),
    cuboid({
      center: [0, 0, padding / 2],
      size: [width, height, length],
    })
  );
};

const jackPorts = (
  { diameter, shaft, clearance }: typeof jacks,
  { width, padding }: typeof breadboard
) => {
  return subtract(
    cuboid({
      size: [width + padding * 2, clearance + padding * 2, clearance + padding],
    }),
    rotate(
      [0, Math.PI / 2, 0],
      union(
        cuboid({
          center: [-(clearance + padding * 2) / 2, 0, 0],
          size: [clearance + padding * 2, clearance + padding * 2, width],
        }),
        cylinder({
          radius: clearance / 2,
          height: width + padding * 2 - shaft * 2,
        }),
        cylinder({
          radius: diameter / 2,
          height: width + padding * 2,
        })
      )
    )
  );
};

// A function declaration that returns geometry
export const main = () => {
  return union(
    body(breadboard),
    translate(
      [
        0,
        breadboard.height - breadboard.padding,
        jacks.clearance / 2 - breadboard.padding,
      ],
      jackPorts(jacks, breadboard)
    )
  );
};
