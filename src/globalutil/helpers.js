import moment from 'moment'

export const getTimeOfCreation = time => {
    return moment(time).startOf('hour').fromNow();
}

const sortDescending = (data) =>{
  return data.sort((a, b) => b.voteScore - a.voteScore)
}

const sortAscending = (data) => {
  return data.sort((a, b) => a.voteScore - b.voteScore)
}

const sortOldest = (data) => {
  return data.sort((a, b) => a.timestamp - b.timestamp)
}

const sortNewest = (data) =>{
  return data.sort((a, b) => b.timestamp - a.timestamp)
} 

export const sortByCriteria = (data, method) => {
    switch(method){
      case 'desc':
        return sortDescending(data)
      case 'asc':
        return sortAscending(data)
      case 'oldest':
        return sortOldest(data)
      case 'newest':
        return sortNewest(data)
      default:
        return data;

    }
  }