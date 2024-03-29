<div id="top"></div>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/blesten/social-media">
    <img src="client/public/assets/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Social Sphere</h3>

  <p align="center">
    An awesome social media application based on website
    <br />
    <a href="https://github.com/blesten/social-media"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/blesten/social-media">View Demo</a>
    ·
    <a href="https://github.com/blesten/social-media/issues">Report Bug</a>
    ·
    <a href="https://github.com/blesten/social-media/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

Welcome to the **Social Sphere** Github repository! Here, you'll find the source code for our sleek and sophisticated social media application. Built with modern technologies and a focus on user experience, our application aims to provide users with an effortless socialize experience.

<p align="right"><a href="#top">back to top</a></p>

### Built With

Main technology used to built this application are listed below:

* [Typescript](https://www.typescriptlang.org/)
* [React.js](https://www.reactjs.org/)
* [Tailwind CSS](https://www.tailwindcss.com/)
* [Node.js](https://www.nodejs.org/)
* [Express.js](https://www.expressjs.com/)
* [MongoDB](https://www.mongodb.com/cloud/atlas/)
* [Docker](https://www.docker.com/)

<p align="right"><a href="#top">back to top</a></p>

## Getting Started

To get started with this project locally, follow below steps:

### Prerequisites

Make sure you have Docker, Node.js, and package manager (either npm or yarn) installed

>**FYI**: This project uses **yarn** as the package manager, but you're free to use **npm** too.

### Installation

Below steps will guide you through the local installation process of this application

1. Clone the repo
   ```
   git clone https://github.com/blesten/social-media.git
   ```
2. Complete the .env variable at /server directory
Rename .env.example file at ```/config``` directory become ```.env```, then fill the value for every key. Below is the guideline for filling the .env value:<br/>
    | Key | What to Fill | Example Value |
    | :---: | :---: | :---: |
    | PORT | Your server port | 5000 |
    | CLIENT_URL | Your client URL | http://localhost:3000 |
    | MONGO_URL | Your MongoDB connection URL | mongodb+srv://username:password@main.14znatw.mongodb.net/DBName?retryWrites=true&w=majority |
    | ACCESS_TOKEN_SECRET | Your JWT access token secret | NzeWG39JJNWASRKTeM85Ki77yZbdXZapvfIfepxz7d2WG |
    | REFRESH_TOKEN_SECRET | Your JWT refresh token secret | KS3VuMkQkGzzQ5BhMyxgpGV2xelxR7B7UummWAG5r5c |
    | MAIL_CLIENT_ID | Your mail client ID | 2678-dfs.apps.googleusercontent.com |
    | MAIL_CLIENT_SECRET | Your mail client secret | GOCSPX-Jj03432-fdsjfdfdkLO |
    | MAIL_REFRESH_TOKEN | Your mail refresh token | 1//020FT6IlI |
    | SENDER_MAIL_ADDRESS | Your email address to send email | test@testmail.com |
3. Complete the key.ts variabel at /client directory
Rename key.example.ts file at ```/config``` directory become ```key.ts```, then fill the value for every key. Below is the guideline for filling the key.ts value:<br/>
    | Key | What to Fill | Example Value |
    | :---: | :---: | :---: |
    | CLOUDINARY_POSTS_FOLDER_ID | Your <a href="https://www.cloudinary.com/">Cloudinary</a> "products" folder ID for this project | abcdefgh |
    | CLOUDINARY_USERS_FOLDER_ID | Your <a href="https://www.cloudinary.com/">Cloudinary</a> "users" folder ID for this project | abcdefgh |
    | CLOUDINARY_CLOUD_NAME | Your <a href="https://www.cloudinary.com/">Cloudinary</a> cloud name | abcd8efgh |
4. Go to ```docker-compose.yml``` at root directory and replace the ```ports``` value at the ```server``` section to the port value at yout .env file. For example, your PORT value at .env is 5000, so the ```ports``` value at the docker-compose.yml is ```5000:5000```
5. Go to ```package.json``` at ```/client``` directory and replace the ```proxy``` port to the port value at your .env file. For example, your PORT value at .env is 5000, so the ```proxy``` value is ```http://server:5000```
6. Open your terminal, and ```cd``` to the root directory, then run ```docker-compose build``` command
7. Lastly, run ```docker-compose up``` command at your terminal to start the application

<p align="right"><a href="#top">back to top</a></p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right"><a href="#top">back to top</a></p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right"><a href="#top">back to top</a></p>

## Contact

LinkedIn: [Stanley Claudius](https://www.linkedin.com/in/stanleyclaudius)

Project Link: [https://github.com/blesten/social-media](https://github.com/blesten/social-media)

<p align="right"><a href="#top">back to top</a></p>

## Acknowledgments

Special thanks to:

* [Othneildrew](https://github.com/othneildrew/) for providing an amazing README template.
* [Tailwind CSS](https://tailwindcss.com) for providing CSS framework to be used in this application.
* [React Icons](https://react-icons.github.io/react-icons/) for providing icon to be used in this application.

<p align="right"><a href="#top">back to top</a></p>

[forks-shield]: https://img.shields.io/github/forks/blesten/social-media.svg?style=for-the-badge
[forks-url]: https://github.com/blesten/social-media/network/members
[stars-shield]: https://img.shields.io/github/stars/blesten/social-media.svg?style=for-the-badge
[stars-url]: https://github.com/blesten/social-media/stargazers
[issues-shield]: https://img.shields.io/github/issues/blesten/social-media.svg?style=for-the-badge
[issues-url]: https://github.com/blesten/social-media/issues
[license-shield]: https://img.shields.io/github/license/blesten/social-media.svg?style=for-the-badge
[license-url]: https://github.com/blesten/social-media/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/stanleyclaudius