import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FileInput from '../../../components/form-elements/file-input';

describe('File Input', () => {
  it('should render', () => {
    const props = {
      name: 'file',
      label: 'Add a File',
      register: (name) => ({
        name,
        onChange: jest.fn(),
      }),
    };

    render(
      <FileInput {...props} />,
    );

    const inputEl = screen.getByTestId('file-input');
    expect(inputEl).toBeInTheDocument();

    const labelEl = screen.getByText(props.label);
    expect(labelEl).toBeInTheDocument();
  });

  it('should call the onChangeEvent when file added', async () => {
    const user = userEvent.setup();
    const fakeFile = new File(['test'], 'test.png', { type: 'image/png' });
    const mockChange = jest.fn();
    const props = {
      name: 'file',
      label: 'Add a File',
      register: (name) => ({
        name,
        onChange: mockChange,
      }),
    };

    render(
      <FileInput {...props} />,
    );

    const inputEl = screen.getByTestId('file-input');

    await user.upload(inputEl, fakeFile);

    expect(inputEl.files.length).toBe(1);

    await waitFor(() => {
      expect(mockChange.mock.calls.length).toBe(1);
    });
  });

  it('should show the file name when file added', async () => {
    const props = {
      name: 'file',
      label: 'Add a File',
      register: (name) => ({
        name,
        onChange: jest.fn(),
      }),
      filename: 'test.png',
    };

    render(
      <FileInput {...props} />,
    );

    const fileNameEl = screen.getByText(props.filename);

    expect(fileNameEl).toBeInTheDocument();
  });
});
