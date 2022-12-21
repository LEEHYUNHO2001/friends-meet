import { render, screen } from '@testing-library/react';

import Home from '@/pages/index';

describe('<Home />', () => {
  it('renders a heading', () => {
    const { container } = render(<Home />);

    const heading = screen.getByText('Home');

    expect(heading).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
