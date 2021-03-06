'use strict'

const knex = require('./connect').knex

/**
 * Joins teams and submissions tables together and returns resulting rows that
 * include the given name
 * @param teamName name of the team from the 'teams' table
 * @return {Promise} resolves with a list of submissions under that team name
 */
function getSubmissionsByTeamName (teamName) {
  return new Promise((resolve, reject) => {
    if (teamName === null || typeof teamName === 'undefined') {
      reject(new Error('TeamName is null or undefined'))
    }
    knex('submissions')
      .join('teams', 'teams.id', '=', 'submissions.team_id')
      .select('version', 'status', 'submission_url', 'log_url', 'image_name')
      .where('teams.name', '=', teamName)
      .then((submissions) => {
        submissions.sort(sortSubmissions)
        return resolve(submissions)
      }).catch((err) => {
        return reject(err)
      })
  })
}

function getSubmissionByID (submissionID) {
  return new Promise((resolve, reject) => {
    if (submissionID === null || typeof submissionID === 'undefined') {
      reject(new Error('teamName is null or undefined'))
    }
    const query = knex('submissions')
      .select('id', 'status', 'log_url', 'version', 'created_at', 'updated_at')
      .where('id', '=', submissionID)
    query.then((submission) => {
      return resolve(submission[0])
    }).catch((err) => {
      return reject(err)
    })
  })
}

function sortSubmissions (submissionA, submissionB) {
  const versionA = submissionA.version
  const versionB = submissionB.version
  if (versionA > versionB) {
    return -1
  }
  if (versionA < versionB) {
    return 1
  }
  return 0
}

module.exports = {
  getSubmissionsByTeamName,
  getSubmissionByID
}
