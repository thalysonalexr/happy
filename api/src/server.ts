import { app } from '@/app'
import appConfig from '@/config/app'
import { logger } from '@/utils/logger'

const { host, port } = appConfig

app.listen(port, host, () => {
  logger.info(`Application is running on http://${host}:${port}`)
})
