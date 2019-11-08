import React, { useState, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

toast.configure({
  autoClose: 8000
});

const Search = () => {
  const history = useHistory();
  const initialState = {
    platform: "psn",
    gamertag: ""
  };

  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    document.body.className = "body-bg-image";
  });

  const handleInput = e => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!state.gamertag) {
      toast("Please enter a gamertag");
    } else {
      history.push(`/profile/${state.platform}/${state.gamertag}`);
    }
  };

  return (
    <section className="search">
      <h1>Track Player Stats</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="platform">Platform</label>
          <select
            name="platform"
            id="platform"
            value={state.platform}
            onChange={handleInput}
          >
            <option value="psn">Playstation</option>
            <option value="xbl">Xbox</option>
            <option value="Origin">Origin</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="gamertag">Gamertag</label>
          <input
            type="text"
            name="gamertag"
            id="gamertag"
            placeholder="Origin ID, Xbox Live gamertag, PSN ID, etc"
            value={state.gamertag}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" className="btn" />
        </div>
      </form>
    </section>
  );
};

export default Search;
