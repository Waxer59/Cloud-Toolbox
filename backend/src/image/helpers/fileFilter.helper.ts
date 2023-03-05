export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file) {
    return cb(new Error('File is empty'), false);
  }

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'tiff',
    'ico',
    'pdf',
    'eps',
    'psd',
    'svg',
    'webp',
    'jxr',
    'wdp',
  ];

  if (validExtensions.includes(fileExtension)) {
    return cb(null, true);
  }

  cb(null, false);
};
