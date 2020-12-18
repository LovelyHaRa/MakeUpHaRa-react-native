import React from 'react';

import { render } from '@testing-library/react-native';

import { samplePostList as postList } from '../../../lib/data/TestData';
import PostView from '../PostView';

const props = {
  post: postList[0],
  error: null,
  loading: false,
  colorScheme: 'light',
};

describe('<PostView />', () => {
  it('should be render', () => {
    const { getByText } = render(<PostView {...props} />);
    expect(getByText(postList[0].title)).toBeTruthy();
  });
});
