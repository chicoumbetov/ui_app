import renderer from 'react-test-renderer';

import TabFaqScreen from '../FaqScreen/TabFaqScreen';

describe('<TabFaqScreen />', () => {
  it('renders correctly across screens', () => {
    const tree = renderer
      .create(
        '<TabFaqScreen />',
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

it('<TabFaqScreen />', () => {
  expect(TabFaqScreen);
});
