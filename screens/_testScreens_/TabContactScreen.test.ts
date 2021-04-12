import renderer from 'react-test-renderer';

import TabContactScreen from '../TabContactScreen';

it('renders TabContactScreen', () => {
  expect(TabContactScreen);
});

describe('<TabContactScreen />', () => {
  it('renders correctly across screens', () => {
    const tree = renderer
      .create('<TabContactScreen />').toJSON();
    expect(tree).toMatchSnapshot();
  });
});
