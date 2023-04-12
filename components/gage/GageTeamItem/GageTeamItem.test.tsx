import React from "react";
import renderer from "react-test-renderer";
import GageTeamItem from "./GageTeamItem";

describe("<GageTeamItem />", () => {
  const gage = {
    id: 1,
    title: "string",
    description: "string",
    is_done: false,
    cost: 122,
    category: "cuisine",
    day: 1,
    month: 2,
    year: 2012,
    date_string: "2012-02-12",
    user_id: "id",
    user_name: "Michel",
    user_points: 1000,
  };

  it("renders correctly", () => {
    const tree = renderer.create(<GageTeamItem {...gage} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
