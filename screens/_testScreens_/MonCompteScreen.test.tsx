import renderer from 'react-test-renderer';
import MonCompteScreen from '../MonCompteScreen';

it('renders TabContactScreen', () => {
  expect(MonCompteScreen);
});

describe('<MonCompteScreen />', () => {
  it('renders correctly across screens', () => {
    const tree = renderer
      .create('<MonCompteScreen />').toJSON();
    expect(tree).toMatchSnapshot();
  });
});
