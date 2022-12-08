# Multiplayer Math Game | Hackathon Submission

## Description

Multiplayer Math Game is an online game, that anyone can play with their friends. The application is Build using the FARM(FastAPI, React, and MongoDB).

## Screenshots

| Home Page                                 | Lobby Page                                                     |
| ----------------------------------------- | ---------------------------------------------------------------- |
| ![Home Page](./assets/images/01.Home.png) | ![Screenshot of Lobby](./assets/images/02.Lobby.png) |

---

| Game Page                                                         | Results Page                        |
| ---------------------------------------------------------------------- | --------------------------------------------- |
| ![Game Page](./assets/images/03.Game.png) | ![Results Page](./assets/images/04.Results.png) |


## How to run it locally?

**Step 1.** Clone the repository

```sh
$ git clone git@github.com:RajeshJ3/multiplayer-math-game.git
$ cd multiplayer-math-game
```

**Step 2.** Create `.env` file in the `backend` folder

```sh
$ nano .env # save the following credentials into .env file
```

```.env
DB_URL=mongodb+srv://<user>:<password>@<host>/?retryWrites=true&w=majority
DB_NAME=<DB_NAME>
```

**Step 3.** Installing dependencies

> Backend

```sh
$ cd backend
$ python3 -m venv env
$ source env/bin/activate
(env)$ pip install -r requirements.txt
```

> Frontend

```sh
$ cd frontend
$ yarn # I used yarn for the development, you can use npm as well
```

**Step 4.** Spinning the servers up

> Backend

```sh
$ cd backend
(env)$ # export the environment variables from .env file 
(env)$ # or save the environment variables into your environment
(env)$ python main.py
INFO:     Started server process [9267]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

> Frontend

```sh
$ cd frontend
$ yarn start
```

Now, open [http://localhost:3000/](http://localhost:3000/) in browser.

### Prerequisites

- Git
- Python 3.8
- Mongodb cloud
- Node
- yarn/npm

Happy Coding

Cheers