import { createConnection } from 'typeorm'

import { logger } from '@/utils/logger'

createConnection()
  .then(() => {
    logger.info('Database connected with successfully')
  })
  .catch((err) => {
    logger.info(`Database is failed connection: ${err.message}`)
  })
