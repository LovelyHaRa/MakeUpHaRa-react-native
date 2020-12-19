import React from 'react';
import moment from 'moment';

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

    const { title, publisher, publishedDate, tags } = postList[0];
    expect(getByText(title)).toBeTruthy();
    expect(getByText(publisher.username)).toBeTruthy();
    expect(
      getByText(moment(publishedDate).format('YYYY-MM-DD HH:mm:ss')),
    ).toBeTruthy();
    tags.forEach((tag) => {
      expect(getByText(`#${tag}`)).toBeTruthy();
    });
  });

  it('render when failed to get post', () => {
    const nextProps = { ...props, post: null, error: true };

    const { getByText } = render(<PostView {...nextProps} />);

    expect(getByText('잘못된 접근입니다.')).toBeTruthy();
  });
});
