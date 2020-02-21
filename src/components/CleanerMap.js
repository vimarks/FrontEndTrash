import React, { useState } from "react";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./auth/style.css";

export default function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: props.coords.latitude,
    longitude: props.coords.longitude,
    width: "100vw",
    height: "75vh",
    zoom: 10
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  console.log(props.reputations);
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/vimarks/ck5edmyhu0vv81jo6qxc2bjh3"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {props.dirtyTrashLocations &&
          props.dirtyTrashLocations.map(loc => (
            <Marker
              key={loc.id}
              latitude={loc.latitude}
              longitude={loc.longitude}
            >
              <button
                className="trash-button"
                onClick={e => {
                  e.preventDefault();
                  setSelectedLocation(loc);
                  props.markerKeyHolder(loc.id);
                }}
              >
                <img alt="trashcan" height="20px" src="/trash_can.png" />
              </button>
            </Marker>
          ))}
        {props.cleanTrashLocations &&
          props.cleanTrashLocations.map(loc => (
            <Marker
              key={loc.id}
              latitude={loc.latitude}
              longitude={loc.longitude}
            >
              <button
                className="trash-button"
                onClick={e => {
                  e.preventDefault();
                  setSelectedLocation(loc);
                  props.markerKeyHolder(loc.id);
                }}
              >
                <img alt="trashcan" height="26px" src="/2107157.png" />
              </button>
            </Marker>
          ))}

        {selectedLocation &&
          props.trash
            .filter(tr => tr.location_id === selectedLocation.id)
            .map(tr => (
              <Popup
                latitude={selectedLocation.latitude}
                longitude={selectedLocation.longitude}
                onClose={() => {
                  setSelectedLocation(null);
                }}
              >
                <div>
                  <h2>{tr.bounty} kP$</h2>
                  <p>{tr.description}</p>
                  <p>
                    {
                      props.users.filter(user => user.id === tr.reporter_id)[0]
                        .username
                    }
                  </p>
                  <p>
                    {
                      props.reputations.filter(
                        rep => rep.user_id === tr.reporter_id
                      )[0].rating
                    }
                  </p>
                </div>
              </Popup>
            ))}
      </ReactMapGL>
    </div>
  );
}
