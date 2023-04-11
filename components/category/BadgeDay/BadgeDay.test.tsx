import React from "react";
import renderer from "react-test-renderer";

import BadgeDay from "./BadgeDay";

describe("<BadgeDay />", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<BadgeDay dayText="Lun" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
