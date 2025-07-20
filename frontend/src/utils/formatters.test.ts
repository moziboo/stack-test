import { describe, it, expect } from 'vitest'
import { formatDate, formatCurrency } from './formatters'

describe('formatters', () => {
  describe('formatDate', () => {
    it('formats a date correctly', () => {
      // Create a specific date for testing (January 15, 2023)
      const testDate = new Date(2023, 0, 15)
      
      // Format the date
      const formattedDate = formatDate(testDate)
      
      // Check if the formatted date is as expected
      expect(formattedDate).toBe('January 15, 2023')
    })
  })

  describe('formatCurrency', () => {
    it('formats a number as USD currency by default', () => {
      // Format a number as currency
      const formattedCurrency = formatCurrency(1234.56)
      
      // Check if the formatted currency is as expected
      expect(formattedCurrency).toBe('$1,234.56')
    })

    it('formats a number as specified currency', () => {
      // Format a number as EUR currency
      const formattedCurrency = formatCurrency(1234.56, 'EUR')
      
      // Check if the formatted currency is as expected
      expect(formattedCurrency).toBe('€1,234.56')
    })
  })
}) 