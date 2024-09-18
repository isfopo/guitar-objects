import { subtract, union } from "@jscad/modeling/src/operations/booleans";
import { cylinder } from "@jscad/modeling/src/primitives";

const segments = 50;

const ferrule = {
  diameter: {
    shaft: 8,
    inner: 10,
    outer: 12,
  },
  height: {
    bottom: 10,
    top: 4,
  },
  splines: {
    count: 24,
    radius: 1,
  },
};

// A function declaration that returns geometry
export const main = () => {
  return subtract(
    union(
      cylinder({
        height: ferrule.height.top,
        radius: ferrule.diameter.outer / 2,
        center: [0, 0, ferrule.height.top / 2],
        segments,
      }),
      cylinder({
        height: ferrule.height.bottom,
        radius: ferrule.diameter.inner / 2,
        center: [0, 0, -ferrule.height.bottom / 2],
        segments,
      })
    ),
    cylinder({
      height: ferrule.height.bottom + ferrule.height.top,
      radius: ferrule.diameter.shaft / 2,
      center: [0, 0, (ferrule.height.top - ferrule.height.bottom) / 2],
      segments,
    })
  );
};
