import React, { useState } from "react";
import LayoutContainer from "../components/LayoutContainer";
import useLocalState from "../hooks/useLocalState";

type RpgDataType = {
  world?: string;
  scenario?: string;
  players?: Player[];
};

type Player = {
  name: string;
};

const ChatRPG = () => {
  const [rpgData, setRpgData] = useLocalState<RpgDataType>("rpgData", {});
  const [newPlayerName, setNewPlayerName] = useState<string>("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(rpgData.world);
  };

  const handleNewPlayer = () => {
    const newPlayer: Player = { name: newPlayerName };
    let currentPlayers: Player[] = [];
    if (rpgData.players) currentPlayers = rpgData.players;
    setRpgData({
      ...rpgData,
      players: [...currentPlayers, newPlayer],
    });
    setNewPlayerName("");
  };

  return (
    <LayoutContainer>
      <form onSubmit={onSubmit} className="form-control w-full max-w-xs gap-3">
        <div>
          <label className="label label-text">describe the gameworld</label>
          <textarea
            placeholder="Type here"
            className="textarea textarea-bordered w-full max-w-xs"
            value={rpgData.world}
            onChange={(e) => setRpgData({ ...rpgData, world: e.target.value })}
          />
        </div>
        <div>
          <label className="label label-text">describe the scenario</label>
          <textarea
            placeholder="Type here"
            className="textarea textarea-bordered w-full max-w-xs"
            value={rpgData.scenario}
            onChange={(e) =>
              setRpgData({ ...rpgData, scenario: e.target.value })
            }
          />
        </div>
        <div>
          <label className="label label-text">add player</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="player name"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setNewPlayerName(e.target.value)}
              value={newPlayerName}
            />
            <button onClick={handleNewPlayer} className="btn btn-neutral">
              +
            </button>
          </div>
          {rpgData.players?.map((player) => {
            return <div> {player.name}</div>;
          })}
        </div>
        <input type="submit" value="submit" className="btn" />
      </form>
    </LayoutContainer>
  );
};
export default ChatRPG;
