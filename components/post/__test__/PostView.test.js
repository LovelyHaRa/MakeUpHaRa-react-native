import React from 'react';
import moment from 'moment';

import { render } from '@testing-library/react-native';

import { samplePostList as postList } from '../../../lib/data/TestData';
import PostView from '../PostView';

const props = {
  post: postList[4],
  error: null,
  loading: false,
  colorScheme: 'light',
};

describe('<PostView />', () => {
  it('should be render', () => {
    const { getByText } = render(<PostView {...props} />);

    const { title, publisher, publishedDate, tags, body } = postList[4];
    expect(getByText(title)).toBeTruthy();
    expect(getByText(publisher.username)).toBeTruthy();
    expect(
      getByText(moment(publishedDate).format('YYYY-MM-DD HH:mm:ss')),
    ).toBeTruthy();
    tags.forEach((tag) => {
      expect(getByText(`#${tag}`)).toBeTruthy();
    });
  });
});
