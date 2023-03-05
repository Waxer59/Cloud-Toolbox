import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_API_URL } = getEnvVariables()

export const fetchApi = async (
  urlFragment: string,
  options = {}
): Promise<any> => {
  try {
    const response = await fetch(VITE_API_URL + urlFragment, options)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}
