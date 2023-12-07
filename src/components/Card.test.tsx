import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  test('children should be rendered', async () => {
    const text = 'test'
    render(<Card><span>{text}</span><span>{text}</span></Card>)
    const elements = screen.getAllByText(text)
    expect(elements).toHaveLength(2)
  })
})
