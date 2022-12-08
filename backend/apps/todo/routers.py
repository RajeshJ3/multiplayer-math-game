from fastapi import APIRouter, Body, Request, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from datetime import datetime, timedelta
from dateutil import tz
from uuid import uuid4

from .models import GameModel, PlayerModel
from game_script import gen_game_data

router = APIRouter()

@router.get("/", response_description="List all games")
async def list_games(request: Request):
    now = datetime.now(tz.UTC)
    live_time = now - timedelta(minutes=10)

    live_time_ts = live_time.timestamp().__int__()

    games = await request.app.mongodb["games"].find(
        {"created_time": {'$gt': live_time_ts}}
    ).to_list(length=10)

    live_games = []
    for game in games:
        if game["status"] != 0: continue
        live_games.append(game)
    
    return JSONResponse(status_code=status.HTTP_200_OK, content={
        "count": len(live_games),
        "payload": live_games
    })

@router.get("/{pk}")
async def game(request: Request, pk: str, player_id: str = None):
    try:
        game = await request.app.mongodb["games"].find_one(
            {"_id": pk}
        )
        if not game["status"] and player_id:
            now = datetime.now(tz.UTC)
            now_ts = now.timestamp().__int__()

            ideal_age_ts = (now - timedelta(seconds=10)).timestamp().__int__()

            updated_players = []
            for player in game["players"]:
                if player["_id"] == player_id:
                    player["last_active"] = now_ts
                elif not player["last_active"]: continue
                elif player["last_active"] < ideal_age_ts: continue
                updated_players.append(player)

            game["players"] = updated_players

            await request.app.mongodb["games"].update_one(
                {"_id": pk}, {"$set": game}
            )
            game = await request.app.mongodb["games"].find_one(
                {"_id": pk}
            )
            return JSONResponse(status_code=status.HTTP_200_OK, content=game)
        return JSONResponse(status_code=status.HTTP_200_OK, content=game)
    except: JSONResponse(status_code=status.HTTP_400_BAD_REQUEST)

@router.post("/", response_description="Create new Game")
async def create_game(request: Request, game: GameModel = Body(...)):
    game = jsonable_encoder(game)
    game["_id"] = uuid4().__str__()

    now = datetime.now(tz.UTC).timestamp().__int__()

    players = []
    for player in game["players"]:
        player["_id"] = uuid4().__str__()
        player["last_active"] = now
        players.append(player)
    
    game["players"] = players
    game["created_time"] = now

    new_game = await request.app.mongodb["games"].insert_one(game)
    created_game = await request.app.mongodb["games"].find_one(
        {"_id": new_game.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_game)

@router.post("/{pk}/join")
async def game(request: Request, pk, player: PlayerModel):
    try:
        player = jsonable_encoder(player)

        game = await request.app.mongodb["games"].find_one(
            {"_id": pk}
        )

        now = datetime.now(tz.UTC)
        now_ts = now.timestamp().__int__()
        
        player["_id"] = uuid4().__str__()
        player["last_active"] = now_ts

        # checking game status
        if game["status"]:
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={
                "details": "Game has already been started"
            })

        # looking for someone with the same name
        for i in game["players"]:
            if i["name"] == player["name"]:
                return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={
                    "details": "Someone with this name, is already playing."
                })

        game["players"] = [*game["players"], player]
        
        await request.app.mongodb["games"].update_one(
            {"_id": pk}, {"$set": game}
        )
        game = await request.app.mongodb["games"].find_one(
            {"_id": pk}
        )
        return JSONResponse(status_code=status.HTTP_200_OK, content=game)

    except: return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST)

@router.post("/{id}/toggle-ready")
async def toggle_ready(request: Request, id, player_id: str):
    try:
        game = await request.app.mongodb["games"].find_one(
            {"_id": id}
        )
        updated_players = []
        ready_players = 0
        for player in game["players"]:
            if player["_id"] == player_id:
                player["ready"] = not bool(player["ready"])
            if player["ready"]:
                ready_players += 1
            updated_players.append(player)
        
        # if all players are ready
        if ready_players >= len(updated_players):
            game["status"] = 1
            game["start_time"] = datetime.now(tz.UTC).timestamp().__int__()
            game["question"] = gen_game_data(game["level"])

        game["players"] = updated_players
        await request.app.mongodb["games"].update_one(
            {"_id": id}, {"$set": game}
        )
        game = await request.app.mongodb["games"].find_one(
            {"_id": id}
        )
        return JSONResponse(status_code=status.HTTP_200_OK, content=game)
    except: return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST)

@router.post("/{id}/submit-score")
async def submit_score(request: Request, id, player_id: str):
    try:
        game = await request.app.mongodb["games"].find_one(
            {"_id": id}
        )

        now = datetime.utcfromtimestamp(datetime.now(tz.UTC).timestamp().__int__())
        start_time = datetime.utcfromtimestamp(game["start_time"])
        score = now - start_time

        updated_players = []
        for player in game["players"]:
            if player["_id"] == player_id:
                player["score"] = score.seconds
            updated_players.append(player)
        
        game["players"] = updated_players
        await request.app.mongodb["games"].update_one(
            {"_id": id}, {"$set": game}
        )
        game = await request.app.mongodb["games"].find_one(
            {"_id": id}
        )
        return JSONResponse(status_code=status.HTTP_200_OK, content=game)

    except: return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST)
