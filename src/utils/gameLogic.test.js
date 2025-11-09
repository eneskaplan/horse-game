import { describe, it, expect } from 'vitest'
import { generateHorses, generateRaceSchedule, calculateRaceResult } from './gameLogic'

describe('gameLogic', () => {
  describe('generateHorses', () => {
    it('should generate the correct number of horses', () => {
      const horses = generateHorses(20)
      expect(horses).toHaveLength(20)
    })

    it('should generate horses with required properties', () => {
      const horses = generateHorses(5)
      horses.forEach(horse => {
        expect(horse).toHaveProperty('id')
        expect(horse).toHaveProperty('name')
        expect(horse).toHaveProperty('color')
        expect(horse).toHaveProperty('condition')
        expect(horse.condition).toBeGreaterThanOrEqual(1)
        expect(horse.condition).toBeLessThanOrEqual(100)
        expect(horse.name).equal('Horse ' + horse.id)
      })
    })

    it('should generate unique horse IDs', () => {
      const horses = generateHorses(10)
      const ids = horses.map(h => h.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('generateRaceSchedule', () => {
    it('should throw error if less than 10 horses', () => {
      const horses = generateHorses(5)
      expect(() => {
        generateRaceSchedule(horses, [1200, 1400, 1600, 1800, 2000, 2200])
      }).toThrow('Need at least 10 horses to generate schedule')
    })

    it('should generate 6 rounds', () => {
      const horses = generateHorses(20)
      const schedule = generateRaceSchedule(horses, [1200, 1400, 1600, 1800, 2000, 2200])
      expect(schedule).toHaveLength(6)
    })

    it('should generate rounds with correct structure', () => {
      const horses = generateHorses(20)
      const distances = [1200, 1400, 1600, 1800, 2000, 2200]
      const schedule = generateRaceSchedule(horses, distances)
      
      schedule.forEach((round, index) => {
        expect(round).toHaveProperty('round')
        expect(round).toHaveProperty('distance')
        expect(round).toHaveProperty('horses')
        expect(round.round).toBe(index + 1)
        expect(round.distance).toBe(distances[index])
        expect(round.horses).toHaveLength(10)
      })
    })

    it('should select 10 horses per round', () => {
      const horses = generateHorses(20)
      const schedule = generateRaceSchedule(horses, [1200, 1400, 1600, 1800, 2000, 2200])
      
      schedule.forEach(round => {
        expect(round.horses).toHaveLength(10)
      })
    })
  })

  describe('calculateRaceResult', () => {
    it('should calculate results for all horses', () => {
      const horses = [
        { id: 1, name: 'Horse 1', color: 'Red', condition: 80 },
        { id: 2, name: 'Horse 2', color: 'Blue', condition: 90 },
        { id: 3, name: 'Horse 3', color: 'Green', condition: 70 }
      ]
      const results = calculateRaceResult(horses, 1200)
      
      expect(results).toHaveLength(3)
      results.forEach(result => {
        expect(result).toHaveProperty('time')
        expect(result).toHaveProperty('position')
        expect(typeof result.time).toBe('number')
        expect(result.time).toBeGreaterThan(0)
        expect(result.position).toBeGreaterThanOrEqual(1)
        expect(result.position).toBeLessThanOrEqual(3)
      })
    })

    it('should sort results by time (fastest first)', () => {
      const horses = [
        { id: 1, name: 'Horse 1', color: 'Red', condition: 50 },
        { id: 2, name: 'Horse 2', color: 'Blue', condition: 90 },
        { id: 3, name: 'Horse 3', color: 'Green', condition: 70 }
      ]
      const results = calculateRaceResult(horses, 1200)
      
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].time).toBeLessThanOrEqual(results[i + 1].time)
        expect(results[i].position).toBe(i + 1)
      }
    })

    it('should assign correct positions', () => {
      const horses = [
        { id: 1, name: 'Horse 1', color: 'Red', condition: 80 },
        { id: 2, name: 'Horse 2', color: 'Blue', condition: 90 },
        { id: 3, name: 'Horse 3', color: 'Green', condition: 70 }
      ]
      const results = calculateRaceResult(horses, 1200)
      
      const positions = results.map(r => r.position).sort((a, b) => a - b)
      expect(positions).toEqual([1, 2, 3])
    })
  })
})