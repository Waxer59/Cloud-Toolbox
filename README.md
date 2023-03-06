# Cloud Toolbox

Cloud toolbox is a page that groups several tools such as: **background removal**, **tagging** images, taking **screenshots** to a **website** or **scan** whether a document is secure and **remove text** from an image.

This project is part of a hackathon organized by [cloudinary](https://cloudinary.com/) in collaboration with the streamer [midudev](https://github.com/midudev).

## How to run the proyect

1. Install the project dependencies by first running the `yarn` command in the project root directory and then install the backend and frontend dependencies by running the `yarn deps` command.

2. Fill in all the fields of the `.template.env` file and rename it to `.env` in the directory `/backend` and `/frontend`.

3. Run on the root of the proyect the command: `yarn dev`

> All backend paths are documented with swagger in the backend path `/api`.

## Technologies used

### Frontend

- [React router dom](https://reactrouter.com/en/main)
- [React icons](https://react-icons.github.io/react-icons)
- [React dropzone](https://react-dropzone.js.org/)
- [Canvas conffeti](https://github.com/catdad/canvas-confetti#readme)
- [React spinners](https://www.davidhu.io/react-spinners/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Two up](https://github.com/GoogleChromeLabs/two-up#readme)

### Backend

- [Nestjs](https://nestjs.com/)
- [Swagger](https://swagger.io/)
- [Cloudinary](https://cloudinary.com/)
