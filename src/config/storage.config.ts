import { diskStorage } from 'multer';
import { Request } from 'express';

const storage = diskStorage({
  destination: './uploads',
  filename: (req: Request, file: Express.Multer.File, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file: Express.Multer.File): string {
  return `${Date.now()}.${file.originalname}`;
}

export default storage;
