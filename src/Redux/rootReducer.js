import { combineReducers } from 'redux'

import {
  SET_PLAYERS,
  FANTASY_VALUE,
  AVERAGES,
  CATEGORIES
} from './actionTypes'

const state = {
  playerData: [],
  playerAverages: [],
  fantasyValues: [],
  categories: null
}

function playerDataReducer(prevState = state.playerData, action) {
  switch (action.type) {
    case SET_PLAYERS:
      return action.payload
    default:
      return prevState
  }
}

function fantasyValuesReducer(prevState = state.fantasyValues, action) {
  switch (action.type) {
    case FANTASY_VALUE:
      return action.payload
    default:
      return prevState
  }
}

function playerAveragesReducer(prevState = state.playerAverages, action) {
  switch (action.type) {
    case AVERAGES:
      return action.payload
    default:
      return prevState
  }
}

function categoriesReducer (prevState = state.categories, action) {
  switch(action.type) {
    case CATEGORIES:
      return action.payload
    default:
      return prevState
  }
}

const rootReducer = combineReducers({
  playerData: playerDataReducer,
  playerAverages: playerAveragesReducer,
  fantasyValues: fantasyValuesReducer,
  categories: categoriesReducer
})

export default rootReducer