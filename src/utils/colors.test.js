import { describe, it, expect } from 'vitest'
import { getColorCode } from './colors'

describe('colors', () => {
  describe('getColorCode', () => {
    it('should return correct hex code for Red', () => {
      expect(getColorCode('Red')).toBe('#FF0000')
    })

    it('should return correct hex code for Blue', () => {
      expect(getColorCode('Blue')).toBe('#0000FF')
    })

    it('should return correct hex code for Green', () => {
      expect(getColorCode('Green')).toBe('#008000')
    })

    it('should return default color for unknown color', () => {
      expect(getColorCode('UnknownColor')).toBe('#CCCCCC')
    })

    it('should handle all defined colors', () => {
      const colors = [
        'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Cyan',
        'Brown', 'Black', 'White', 'Grey', 'Magenta', 'Lime', 'Navy', 'Teal',
        'Maroon', 'Olive', 'Silver', 'Gold'
      ]
      
      colors.forEach(color => {
        const code = getColorCode(color)
        expect(code).toMatch(/^#[0-9A-F]{6}$/i)
        expect(code).not.toBe('#CCCCCC')
      })
    })
  })
})

