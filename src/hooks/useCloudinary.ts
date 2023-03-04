import { Cloudinary } from '@cloudinary/url-gen'
import { getEnvVariables } from '../helpers/getEnvVariables'

const {
  VITE_CLOUDINARY_CLOUD_NAME,
  VITE_CLOUDINARY_CLOUD_API_KEY,
  VITE_CLOUDINARY_CLOUD_API_SECRET
} = getEnvVariables()

const cld = new Cloudinary({
  cloud: {
    cloudName: VITE_CLOUDINARY_CLOUD_NAME,
    apiKey: VITE_CLOUDINARY_CLOUD_API_KEY,
    apiSecret: VITE_CLOUDINARY_CLOUD_API_SECRET
  },
  url: {
    secure: true
  }
})

console.log(cld)

const useCloudinary = () => {}

export default useCloudinary
