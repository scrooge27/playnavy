const fetch = require ("node-fetch")

const getField = async(link) => {
  try{
  let response = await fetch(`${link}?format=json`)
  if (response.status === 200) {
    response = await response.json()
  } else {
    response = await response.status
  }
  return await response
}catch(e) {
  console.log(e);
}
}

const login = async(link, team, password) => {
  try{
  const response = await fetch(`${link}signup?team=${team}&password=${password}`)
  return await response.status
  }catch(e) {
    console.log(e);
  }
}

const fire = async(link, x, y, team, password) => {
  try{
    let response = await fetch(`${link}fire?x=${x}&y=${y}&team=${team}&password=${password}`)
  if (response.status === 200) {
    response = await response.json()
  }
  else {
    response = await response.status
  }
  return await response
}catch(e) {
  console.log(e);
}
}

const getScore = async(link) => {
  try{
  let response = await fetch(`${link}score`)
  if (response.status === 200) {
    response = await response.json()
  } else {
    response = await response.status
  }
  return await response
}catch(e) {
  console.log(e);
}
}

module.exports = {
  getField,
  login,
  fire,
  getScore
}