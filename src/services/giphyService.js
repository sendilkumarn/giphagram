import axios from 'axios'

import { API, LIMIT } from './constants'

function frameGiphyRequest (offset, query) {
  return `${API.PROTOCOL}://${API.URL}?${API.API_KEY}&limit=${LIMIT}&offset=${offset}&${API.LANG}&${API.RATING}&q=${query}`
}

export async function loadImageData (query, offset) {
  try {
    const response = await axios.get(frameGiphyRequest(offset, query))
    return response
  } catch (err) {
    return err
  }
}
