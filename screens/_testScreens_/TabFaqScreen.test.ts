import renderer from 'react-test-renderer';

import Faq from '../../components/Faq/Faq';
import TabFaqScreen from '../TabFaqScreen';

describe('<TabFaqScreen />', () => {
  it('renders correctly across screens', () => {
    const tree = renderer
      .create(
        '<Faq />',
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

it('<TabFaqScreen />', () => {
  expect(TabFaqScreen);
});
