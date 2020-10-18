import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

import { logger } from '@utils/logger'

interface ValidationErrors {
  [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (err instanceof ValidationError) {
    const errors: ValidationErrors = {}

    err.inner.forEach((error) => {
      errors[error.path] = error.errors
    })

    return res.status(400).json({
      message: 'Validation failed',
      errors,
    })
  }

  logger.info(err)

  return res.status(500).json({ error: 'Internal Server Error' })
}

export default errorHandler
