import React, { useState }from 'react'
const { compose, withProps, withStateHandlers } = require("recompose")
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap
} = require("react-google-maps");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const labelSize = { width: 30};
const labelPadding = 5;

const Gmap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAhhveERkRFz2TIjA8akOSGIAC3bpsm5U8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 25.03, lng: 121.6 },
  }),
  withStateHandlers(() => ({
    isOpen: true,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap defaultZoom={5} defaultCenter={props.center}>
    <MarkerWithLabel
      position={{ lat: -34.397, lng: 150.644 }}
    //   labelAnchor={new window.google.maps.Point(2, 2)}
      labelStyle={{backgroundColor: "yellow", textAlign:"center", fontWeight:"bold", fontSize: "10px", padding:"5px", margin: "5px", opacity:"0.5", height:"8px", width:"60px", color:"#000000"}}
      labelAnchor={{x: (labelSize.width/2) + labelPadding , y: 20}}
      icon={{
        path: "M510,255c0-20.4-17.85-38.25-38.25-38.25H331.5L204,12.75h-51l63.75,204H76.5l-38.25-51H0L25.5,255L0,344.25h38.25l38.25-51h140.25l-63.75,204h51l127.5-204h140.25C492.15,293.25,510,275.4,510,255z",
        fillColor: '#FF0000',
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: -45,
        scale: .05,
      }}
    >
      <span>A777</span>
    </MarkerWithLabel>
   </GoogleMap>
);


export default Gmap 