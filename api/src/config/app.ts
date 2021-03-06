interface AppConfig {
  host: string
  port: number
}

export default {
  host: process.env.APP_HOST,
  port: +process.env.APP_PORT,
} as AppConfig
