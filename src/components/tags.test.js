import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputTags from './tags';

describe('InputTags component', () => {
  test('renders with initial tags', () => {
    const keys = ['tag1', 'tag2'];
    const { getByText } = render(<InputTags keys={keys} />);
    expect(getByText('tag1')).toBeInTheDocument();
    expect(getByText('tag2')).toBeInTheDocument();
  });

  test('adds a new tag on pressing Enter key', () => {
    const onChangeKeysMock = jest.fn();
    const { getByPlaceholderText } = render(<InputTags keys={[]} onChangeKeys={onChangeKeysMock} />);
    const input = getByPlaceholderText('+ Add Email Address');
    fireEvent.change(input, { target: { value: 'newtag' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onChangeKeysMock).toHaveBeenCalledWith(['newtag']);
  });

  test('removes a tag on clicking remove button', (index = 0) => {
    const onChangeKeysMock = jest.fn();
    const { getAllByText } = render(<InputTags keys={['tag1', 'tag2']} onChangeKeys={onChangeKeysMock} />);
    const removeButton = (getAllByText('+'))[index];
    fireEvent.click(removeButton);
    expect(onChangeKeysMock).toHaveBeenCalledWith(['tag2']);
  });

  test('does not add a tag if it already exists', () => {
    const onChangeKeysMock = jest.fn();
    const { getByPlaceholderText } = render(<InputTags keys={['tag1']} onChangeKeys={onChangeKeysMock} />);
    const input = getByPlaceholderText('+ Add Email Address');
    fireEvent.change(input, { target: { value: 'tag1' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onChangeKeysMock).not.toHaveBeenCalled();
  });

  test('removes last tag on pressing Backspace key with empty input', () => {
    const onChangeKeysMock = jest.fn();
    const { getByPlaceholderText } = render(<InputTags keys={['tag1', 'tag2']} onChangeKeys={onChangeKeysMock} />);
    const input = getByPlaceholderText('+ Add Email Address');
    fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace' });
    expect(onChangeKeysMock).toHaveBeenCalledWith(['tag1']);
  });
});