import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../assets/styles/profile.css";

const Profile = props => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useLayoutEffect(() => {
    document.body.className = "body-bg-no-image";
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/v1/profile/${props.match.params.platform}/${props.match.params.gamertag}`
        );

        setProfileData(res.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.res.data.message);
      }
    }

    fetchData();
  }, []);

  return (
    <section>
      {loading && (
        <div>
          <h3>Loading...</h3>
        </div>
      )}

      {error && (
        <div>
          <h1>{error}</h1>
          <Link to="/">Go Back</Link>
        </div>
      )}

      {profileData && (
        <div className="profile-container">
          <h1 className="gamertag">
            <img
              src={profileData.platformInfo.avatarUrl}
              className="platform-avatar"
            />
            {profileData.platformInfo.platformUserId}
          </h1>
          <div className="grid">
            <div>
              <img src={profileData.segments[1].metadata.imageUrl} />
            </div>
            <div>
              <ul>
                <li>
                  <h4>Selected Legend</h4>
                  <p>{profileData.metadata.activeLegendName}</p>
                </li>
                {profileData.segments[0].stats.season2Wins && (
                  <li>
                    <h4>Season 2 Wins</h4>
                    <p>
                      {profileData.segments[0].stats.season2Wins.displayValue}
                      <span>
                        ({profileData.segments[0].stats.season2Wins.percentile})
                      </span>
                    </p>
                  </li>
                )}
                <li>
                  <h4>Apex Level</h4>
                  <p>
                    {profileData.segments[0].stats.level.displayValue}
                    <span>
                      ({profileData.segments[0].stats.level.percentile}%)
                    </span>
                  </p>
                </li>
                {profileData.segments[0].stats.kills && (
                  <li>
                    <h4>Lifetime Kills</h4>
                    <p>
                      {profileData.segments[0].stats.kills.displayValue}
                      <span>
                        ({profileData.segments[0].stats.kills.percentile}%)
                      </span>
                    </p>
                  </li>
                )}
                {profileData.segments[0].stats.kills && (
                  <li>
                    <h4>Damage Done</h4>
                    <p>
                      {profileData.segments[0].stats.damage.displayValue}
                      <span>
                        ({profileData.segments[0].stats.damage.percentile}%)
                      </span>
                    </p>
                  </li>
                )}
              </ul>
            </div>
            <Link to="/">Go Back</Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
