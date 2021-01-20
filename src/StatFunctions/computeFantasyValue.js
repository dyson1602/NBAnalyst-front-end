import { computeLeagueAverage } from './computeLeagueAverage'

const selection = {
  fNba_tot_reb: true, 
  fNba_assists: false, 
  fNba_points: true, 
  fNba_steals: true,
  fNba_points: true,
  fNba_blocks: true,
  fNba_tpm: true,
  fNba_ftp: true,
  fNba_fgp: true
}

export function computeFantasyValue(playerAverages) {

  let leagueAverages = computeLeagueAverage(playerAverages)
  let fantasyValuesArray = []

  for (const player in playerAverages) {
    let cP = playerAverages[player]
    let playerFantasyValue = {
      name: cP.name,
      nba_team_id: cP.nba_team_id,
      position: cP.position,
      fNba_mins: fantasyValueCaddy(cP, leagueAverages, "avg_mins"),
      fNba_fgm: fantasyValueCaddy(cP, leagueAverages, "avg_fgm"),
      fNba_fga: fantasyValueCaddy(cP, leagueAverages, "avg_fga"),
      fNba_fgp: fantasyValueCaddy(cP, leagueAverages, "fgp"),
      fNba_ftm: fantasyValueCaddy(cP, leagueAverages, "avg_ftm"),
      fNba_fta: fantasyValueCaddy(cP, leagueAverages, "avg_fta"),
      fNba_ftp: fantasyValueCaddy(cP, leagueAverages, "ftp"),
      fNba_tpm: fantasyValueCaddy(cP, leagueAverages, "avg_tpm"),
      fNba_tpa: fantasyValueCaddy(cP, leagueAverages, "avg_tpa"),
      fNba_tpp: fantasyValueCaddy(cP, leagueAverages, "tpp"),
      fNba_off_reb: fantasyValueCaddy(cP, leagueAverages, "avg_off_reb"),
      fNba_def_reb: fantasyValueCaddy(cP, leagueAverages, "avg_def_reb"),
      fNba_tot_reb: fantasyValueCaddy(cP, leagueAverages, "avg_tot_reb"),
      fNba_assists: fantasyValueCaddy(cP, leagueAverages, "avg_assists"),
      fNba_steals: fantasyValueCaddy(cP, leagueAverages, "avg_steals"),
      fNba_blocks: fantasyValueCaddy(cP, leagueAverages, "avg_blocks"),
      fNba_turnovers: fantasyValueCaddy(cP, leagueAverages, "avg_turnovers"),
      fNba_plus_minus: fantasyValueCaddy(cP, leagueAverages, "avg_plus_minus"),
      fNba_p_fouls: fantasyValueCaddy(cP, leagueAverages, "avg_p_fouls"),
      fNba_points: fantasyValueCaddy(cP, leagueAverages, "avg_points"),
    }
    playerFantasyValue.fNba_score = fantasyAggregate(playerFantasyValue, selection)
    fantasyValuesArray.push(playerFantasyValue)
  }
  return fantasyValuesArray
}

function fantasyValueCaddy(currentPlayer, leagueAverages, stat) {

  let valMod = valueModifier(stat)
  let statVal = (currentPlayer[stat] / (leagueAverages[stat] * valMod)) - 1
  return parseFloat(statVal.toFixed(2))
}

function fantasyAggregate (playerObj, selection) {
  let aggregateValue = []
  // console.log(selection)
  for (const item in selection) {
    if(selection[item]) {
      aggregateValue.push(playerObj[item])
    }
  }
  return parseFloat(aggregateValue.reduce((tot, val) => tot + val).toFixed(2))  
}

function valueModifier (stat) {
  switch (stat) {
    case "points" || "tot_rebs":
      return 0.67
    case "steals":
      return 0.75
    default:
      return 1.0
  }
}