import { render, screen } from '@testing-library/react'
import { LabelText } from './LabelText'

describe('LabelText', () => {
  test('children should be rendered', async () => {
    const text = 'test'
    render(<LabelText>{text}</LabelText>)
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
