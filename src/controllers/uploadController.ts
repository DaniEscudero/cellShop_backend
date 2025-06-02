import { v2 as cloudinary } from 'cloudinary';
import { Request, Response } from 'express';
import { cnyConfig } from 'utils/cloudinary';
import { HttpErrorResponse } from 'utils/utils';

export const uploadImage = async (req: Request, res: Response) => {
  //cloudinary.config(cnyConfig);

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const file = req.file;

  if (!file) {
    res
      .status(400)
      .json(
        new HttpErrorResponse('Invalid input or resource', [
          'An image must be uploaded or invalid file',
        ])
      );
    return;
  }

  cloudinary.uploader.upload(file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json(new HttpErrorResponse(err.message));
    }

    res.status(200).json({
      message: 'Successfully uploaded',
      data: result,
    });
  });
};
