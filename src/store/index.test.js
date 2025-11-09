import { describe, it, expect, beforeEach } from 'vitest'
import store from './index'

describe('Vuex Store', () => {
  beforeEach(() => {
    store.commit('RESET_RACE')
    store.commit('SET_HORSES', [])
    store.commit('SET_RACE_SCHEDULE', [])
  })

  describe('State', () => {
    it('should have initial state', () => {
      expect(store.state.horses).toEqual([])
      expect(store.state.raceSchedule).toEqual([])
      expect(store.state.currentRound).toBeNull()
      expect(store.state.currentRoundIndex).toBe(-1)
      expect(store.state.raceResults).toEqual([])
      expect(store.state.isRacing).toBe(false)
      expect(store.state.isPaused).toBe(false)
      expect(store.state.horsePositions).toEqual({})
    })
  })

  describe('Actions', () => {
    it('should generate horses', async () => {
      await store.dispatch('generateHorses')
      expect(store.state.horses).toHaveLength(20)
      expect(store.state.horses[0]).toHaveProperty('id')
      expect(store.state.horses[0]).toHaveProperty('name')
      expect(store.state.horses[0]).toHaveProperty('color')
      expect(store.state.horses[0]).toHaveProperty('condition')
    })

    it('should generate race schedule', async () => {
      await store.dispatch('generateHorses')
      await store.dispatch('generateRaceSchedule')
      expect(store.state.raceSchedule).toHaveLength(6)
      expect(store.state.raceSchedule[0]).toHaveProperty('round')
      expect(store.state.raceSchedule[0]).toHaveProperty('distance')
      expect(store.state.raceSchedule[0]).toHaveProperty('horses')
    })

    it('should throw error when generating schedule without horses', () => {
      expect(() => {
        store.dispatch('generateRaceSchedule')
      }).toThrow('Please generate horses first')
    })

    it('should start race', async () => {
      await store.dispatch('generateHorses')
      await store.dispatch('generateRaceSchedule')
      await store.dispatch('startRace')
      
      expect(store.state.isRacing).toBe(true)
      expect(store.state.currentRoundIndex).toBe(0)
      expect(store.state.currentRound).toBeTruthy()
      expect(Object.keys(store.state.horsePositions).length).toBeGreaterThan(0)
    })

    it('should throw error when starting race without schedule', () => {
      expect(() => {
        store.dispatch('startRace')
      }).toThrow('Please generate race schedule first')
    })

    it('should pause race', async () => {
      await store.dispatch('generateHorses')
      await store.dispatch('generateRaceSchedule')
      await store.dispatch('startRace')
      
      await store.dispatch('pauseRace')
      expect(store.state.isPaused).toBe(true)
      
      await store.dispatch('pauseRace')
      expect(store.state.isPaused).toBe(false)
    })

    it('should move to next round', async () => {
      await store.dispatch('generateHorses')
      await store.dispatch('generateRaceSchedule')
      await store.dispatch('startRace')
      
      expect(store.state.currentRoundIndex).toBe(0)
      
      await store.dispatch('moveToNextRound')
      expect(store.state.currentRoundIndex).toBe(1)
    })
  })

  describe('Getters', () => {
    beforeEach(async () => {
      await store.dispatch('generateHorses')
      await store.dispatch('generateRaceSchedule')
    })

    it('should return horses', () => {
      expect(store.getters.horses).toHaveLength(20)
    })

    it('should return race schedule', () => {
      expect(store.getters.raceSchedule).toHaveLength(6)
    })

    it('should return canStartRace', () => {
      expect(store.getters.canStartRace).toBe(true)
    })

    it('should return canGenerateSchedule', () => {
      expect(store.getters.canGenerateSchedule).toBe(true)
    })

    it('should return false for canStartRace when racing', async () => {
      await store.dispatch('startRace')
      expect(store.getters.canStartRace).toBe(false)
    })
  })

  describe('Mutations', () => {
    it('should set horses', () => {
      const horses = [{ id: 1, name: 'Test Horse', color: 'Red', condition: 80 }]
      store.commit('SET_HORSES', horses)
      expect(store.state.horses).toEqual(horses)
    })

    it('should add race result', () => {
      const result = { round: 1, distance: 1200, horses: [] }
      store.commit('ADD_RACE_RESULT', result)
      expect(store.state.raceResults).toHaveLength(1)
      expect(store.state.raceResults[0]).toEqual(result)
    })

    it('should reset race', async () => {
      await store.dispatch('generateHorses')
      await store.dispatch('generateRaceSchedule')
      await store.dispatch('startRace')
      
      store.commit('RESET_RACE')
      
      expect(store.state.currentRound).toBeNull()
      expect(store.state.currentRoundIndex).toBe(-1)
      expect(store.state.raceResults).toEqual([])
      expect(store.state.isRacing).toBe(false)
      expect(store.state.isPaused).toBe(false)
      expect(store.state.horsePositions).toEqual({})
    })
  })
})

