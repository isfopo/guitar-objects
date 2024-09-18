import { subtract, union } from "@jscad/modeling/src/operations/booleans";
import { circle, cylinder } from "@jscad/modeling/src/primitives";
import { extrudeRotate } from "@jscad/modeling/src/operations/extrusions";

const segments = 50;

const diameter = {
  shaft: 8,
  inner: 10,
  outer: 16,
};
const height = {
  bottom: 10,
  top: 4,
};
const splines = {
  count: 24,
  radius: 1,
  inset: 0.5,
};

const top = () => {
  const bevel = extrudeRotate(
    { segments },
    circle({ radius: height.top / 2, center: [diameter.outer / 2, height.top] })
  );

  return subtract(
    cylinder({
      height: height.top,
      radius: diameter.outer / 2,
      center: [0, 0, height.top / 2],
      segments,
    }),
    bevel
  );
};

const bottom = () => {
  return cylinder({
    height: height.bottom,
    radius: (diameter.inner + splines.inset) / 2,
    center: [0, 0, -height.bottom / 2],
    segments,
  });
};

const shaft = () =>
  cylinder({
    height: height.bottom + height.top,
    radius: diameter.shaft / 2,
    center: [0, 0, (height.top - height.bottom) / 2],
    segments,
  });

// A function declaration that returns geometry
export const main = () => {
  return subtract(union(top(), bottom()), shaft());
};
