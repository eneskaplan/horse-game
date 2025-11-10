import { createStore } from 'vuex'
import { generateHorses, generateRaceSchedule } from '../utils/gameLogic'

export default createStore({
  state: {
    horses: [],
    raceSchedule: [],
    currentRound: null,
    currentRoundIndex: -1,
    raceResults: [],
    isRacing: false,
    isPaused: false,
    horsePositions: {},
    roundDistances: [1200, 1400, 1600, 1800, 2000, 2200],
    pauseStatus: false
  },

  mutations: {
    SET_HORSES(state, horses) {
      state.horses = horses
    },

    SET_RACE_SCHEDULE(state, schedule) {
      state.raceSchedule = schedule
    },

    SET_CURRENT_ROUND(state, round) {
      state.currentRound = round
    },

    SET_CURRENT_ROUND_INDEX(state, index) {
      state.currentRoundIndex = index
    },

    ADD_RACE_RESULT(state, result) {
      state.raceResults.push(result)
    },

    SET_IS_RACING(state, value) {
      state.isRacing = value
    },

    SET_IS_PAUSED(state, value) {
      state.isPaused = value
    },

    SET_PAUSE_STATUS(state, value) {
      state.pauseStatus = value
    },
    
    SET_HORSE_POSITIONS(state, positions) {
      state.horsePositions = { ...positions }
    },

    UPDATE_HORSE_POSITION(state, { horseId, position }) {
      state.horsePositions[horseId] = position
    },

    RESET_RACE(state) {
      state.currentRound = null
      state.currentRoundIndex = -1
      state.raceResults = []
      state.isRacing = false
      state.isPaused = false
      state.horsePositions = {}
    }
  },

  actions: {
    generateHorses({ commit }) {
      const horses = generateHorses(20)
      commit('SET_HORSES', horses)
      commit('RESET_RACE')
    },

    generateRaceSchedule({ commit, state }) {
      if (state.horses.length === 0) {
        throw new Error('Please generate horses first')
      }
      const schedule = generateRaceSchedule(state.horses, state.roundDistances)
      commit('SET_RACE_SCHEDULE', schedule)
      commit('RESET_RACE')
    },

    startRace({ commit, state }) {
      if (state.raceSchedule.length === 0) {
        throw new Error('Please generate race schedule first')
      }
      if (state.isRacing) {
        return
      }
      
      commit('SET_IS_RACING', true)
      commit('SET_IS_PAUSED', false)
      commit('SET_CURRENT_ROUND_INDEX', 0)
      commit('SET_CURRENT_ROUND', state.raceSchedule[0])
      
      const initialPositions = {}
      state.raceSchedule[0].horses.forEach(horse => {
        initialPositions[horse.id] = 0
      })
      commit('SET_HORSE_POSITIONS', initialPositions)
    },

    pauseRace({ commit, state }) {
      if (state.isRacing) {
        commit('SET_IS_PAUSED', !state.isPaused)
      }
    },

    setRaceResult({ commit }, { round, distance, horses }) {
      commit('ADD_RACE_RESULT', {
        round,
        distance,
        horses
      })
    },

    moveToNextRound({ commit, state }) {
      const nextIndex = state.currentRoundIndex + 1
      if (nextIndex < state.raceSchedule.length) {
        commit('SET_CURRENT_ROUND_INDEX', nextIndex)
        const nextRound = state.raceSchedule[nextIndex]
        commit('SET_CURRENT_ROUND', nextRound)
        
        const nextPositions = {}
        nextRound.horses.forEach(horse => {
          nextPositions[horse.id] = 0
        })
        commit('SET_HORSE_POSITIONS', nextPositions)
      } else {
        commit('SET_IS_RACING', false)
        commit('SET_CURRENT_ROUND', null)
        commit('SET_CURRENT_ROUND_INDEX', -1)
      }
    }
  },

  getters: {
    horses: (state) => state.horses,
    raceSchedule: (state) => state.raceSchedule,
    currentRound: (state) => state.currentRound,
    currentRoundIndex: (state) => state.currentRoundIndex,
    raceResults: (state) => state.raceResults,
    isRacing: (state) => state.isRacing,
    isPaused: (state) => state.isPaused,
    horsePositions: (state) => state.horsePositions,
    roundDistances: (state) => state.roundDistances,
    canStartRace: (state) => state.raceSchedule.length > 0 && !state.isRacing,
    canGenerateSchedule: (state) => state.horses.length > 0 && !state.isRacing,
    pauseStatus: (state) => state.pauseStatus
  }
})

