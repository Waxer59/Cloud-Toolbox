export const getEnvVariables = () => {
  const envVariables = import.meta.env

  return {
    ...envVariables
  }
}
