import React from "react";
import renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import DaySelector from "./DaySelector";
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe("<DaySelector />", () => {
    let store : any;
  
  beforeEach(() => {
    store = mockStore({ daysToAddTasks: { activeDays: [] } });
  });
  
  test("renders correctly", () => {
    const tree = renderer.create(<Provider store={store}><DaySelector label="Lun" /> </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});