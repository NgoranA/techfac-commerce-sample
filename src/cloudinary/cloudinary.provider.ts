import { v2 } from 'cloudinary';
export const CLOUDINARY = 'Cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dh9p4f5xs',
      api_key: '959674257754438',
      api_secret: 'zur4lyDmLHiy8VwJVuwwaD7jCi4',
    });
  },
};
