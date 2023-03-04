interface ImportMetaEnv {
  readonly VITE_CLOUDINARY_CLOUD_NAME: string
  readonly VITE_CLOUDINARY_CLOUD_API_KEY: string
  readonly VITE_CLOUDINARY_CLOUD_API_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
