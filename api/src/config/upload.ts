import crypto from 'crypto'
import multer, { Options } from 'multer'
import path from 'path'
import { promisify } from 'util'

export default {
  dest: path.join(__dirname, '..', '..', 'uploads'),
  limits: {
    fileSize: 2097152,
  },
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: async (_, file, cb) => {
      try {
        const fileName = await promisify(crypto.randomBytes)(16)
        const hash = fileName.toString('hex')

        const newFileName = `${hash}-${Date.now().toString()}-${
          file.originalname
        }`

        cb(null, newFileName)
      } catch (err) {
        cb(err, file.originalname)
      }
    },
  }),
  fileFilter: (_, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']

    if (allowedMimes.includes(file.mimetype)) cb(null, true)
    else {
      const allowed = allowedMimes
        .map((mime) => mime.replace('image/', ''))
        .join(', ')
      cb(
        new Error(
          `The type of media sent is not supported. Allowed types ${allowed}`
        )
      )
    }
  },
} as Options
