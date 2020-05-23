import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const filesDirectory = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  storage: multer.diskStorage({
    destination: filesDirectory,
    filename: (req, file, calback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      calback(null, fileName);
    },
  }),
};
