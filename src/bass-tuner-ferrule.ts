import { subtract, union } from "@jscad/modeling/src/operations/booleans";
import { circle, cylinder, triangle } from "@jscad/modeling/src/primitives";
import { extrudeRotate } from "@jscad/modeling/src/operations/extrusions";
import { rotate, translate } from "@jscad/modeling/src/operations/transforms";
import { degToRad } from "@jscad/modeling/src/utils";

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
  radius: 0.5,
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
  const splinesGeo = [...Array(splines.count).keys()].map((i) =>
    rotate(
      [0, 0, i * ((2 * Math.PI) / splines.count)],
      cylinder({
        height: height.bottom,
        radius: splines.radius,
        segments: 4,
        center: [(diameter.inner + splines.inset) / 2, 0, -height.bottom / 2],
      })
    )
  );

  const bevel = extrudeRotate(
    { segments },
    translate(
      [diameter.shaft / 2, -height.bottom],
      triangle({
        type: "SAS",
        values: [
          diameter.inner - diameter.shaft,
          degToRad(90),
          diameter.inner - diameter.shaft,
        ],
      })
    )
  );

  return subtract(
    cylinder({
      height: height.bottom,
      radius: (diameter.inner + splines.inset) / 2,
      center: [0, 0, -height.bottom / 2],
      segments,
    }),
    ...splinesGeo,
    bevel
  );
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
