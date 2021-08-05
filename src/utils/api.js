import axios from 'axios'

const TOKEN="21059964-5bf790d712106238e57c2f022"
const SITE="https://pixabay.com/api/"

const getData= async (query,page,per_page)=>await axios(`${SITE}?key=${TOKEN}&q=${query}&per_page=${per_page}&page=${page}`)

export default getData