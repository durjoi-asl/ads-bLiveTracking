import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const MarkerWithLabel = ({ text, rotate }) => <div>
  <span style={{fontSize:'10px', background:"yellow", opacity:'0.7', padding:'3px'}}>{text}</span>
  <svg viewBox="0 0 510 510" style={{height:'18px', fill:'#ff0000', opacity:'0.7', transform: 'rotate('+rotate+'deg)'}}>
        
        <g id="flights">
          <path d="M510,255c0-20.4-17.85-38.25-38.25-38.25H331.5L204,12.75h-51l63.75,204H76.5l-38.25-51H0L25.5,255L0,344.25h38.25
            l38.25-51h140.25l-63.75,204h51l127.5-204h140.25C492.15,293.25,510,275.4,510,255z"/>
        </g>
      </svg>
</div>;

const SensoreMarker = () => <div>
  <svg version="1.1" viewBox="0 0 443.231 443.231" style={{height:'30px'}}>
	<path d="M381.051,231.153H62.18c0,60.741,63.418,110.635,144.436,116.169v35.91h-41.361l-20,60h152.721l-20-60h-41.361v-35.91
		C317.634,341.788,381.051,291.894,381.051,231.153z"/>
    <path d="M327.183,113.632c-58.21-58.21-152.925-58.21-211.135,0l21.213,21.213c46.514-46.513,122.195-46.513,168.709,0
		L327.183,113.632z"/>
	<path d="M221.616,30c50.625,0,98.161,19.656,133.852,55.347l21.213-21.213C335.323,22.776,280.253,0,221.616,0
		S107.908,22.776,66.551,64.134l21.213,21.213C123.455,49.656,170.991,30,221.616,30z"/>
	<path d="M165.546,163.129l21.213,21.213c9.292-9.291,21.67-14.408,34.857-14.408s25.565,5.117,34.857,14.408l21.213-21.213
		c-14.958-14.958-34.87-23.195-56.07-23.195S180.503,148.171,165.546,163.129z"/>
</svg>
</div>;
 
class MapWithMarkerLabel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sensorDhk: {
        data: []
      },
      sensorCtg: {
        data: []
      }

    }

    this.sensorDhkAircraft = this.sensorDhkAircraft.bind(this)
    this.sensorCtgAircraft = this.sensorCtgAircraft.bind(this)
  }

  componentDidMount() {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const apiUrlDhk = 'http://103.95.99.98/aircraftlist.json';
    const apiUrlCtg = 'http://103.134.27.22/aircraftlist.json';
    
    this.interval = setInterval(() => fetch(apiUrlDhk)
    .then((response) => response.json())
    .then((data) => { 
      // console.log(data)
      this.setState({sensorDhk: { data }})

      console.log(this.state.sensorDhk.data)
    }), 1000)


    this.interval = setInterval(() => fetch(apiUrlCtg)
    .then((response) => response.json())
    .then((data) => { 
      // console.log(data)
      this.setState({sensorCtg: { data }})

      console.log(this.state.sensorCtg.data)
    }), 1000)
    
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  sensorDhkAircraft = () => {
    return this.state.sensorDhk.data.map((aircraft, index) => {
      return <MarkerWithLabel
              key={index}
              id={index}
              lat={aircraft.lat}
              lng={aircraft.lon}
              text={aircraft.fli}
              rotate={aircraft.trk - 90}
            />
    })  
  }

  sensorCtgAircraft = () => {
    return this.state.sensorCtg.data.map((aircraft, index) => {
      return <MarkerWithLabel
              key={index}
              id={index}
              lat={aircraft.lat}
              lng={aircraft.lon}
              text={aircraft.fli}
              rotate={aircraft.trk - 90}
            />
    })  
  }


//   <Marker key={index} id={index} position={{lat: aircraft.lat, lng: aircraft.lon}} name= {"Title"}
//   icon={{
//     path: "M510,255c0-20.4-17.85-38.25-38.25-38.25H331.5L204,12.75h-51l63.75,204H76.5l-38.25-51H0L25.5,255L0,344.25h38.25l38.25-51h140.25l-63.75,204h51l127.5-204h140.25C492.15,293.25,510,275.4,510,255z",
//     fillColor: '#FF0000',
//     fillOpacity: 1,
//     scaledSize: new google.maps.Size(1, 1),
//     strokeWeight: 0,
//     scale: .04,
//     rotation: aircraft.trk - 90
//   }}
// />
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAhhveERkRFz2TIjA8akOSGIAC3bpsm5U8' }}
          defaultCenter={{lat: 23.728783, lng: 90.393791}}
          defaultZoom={8}
        >
          <SensoreMarker
            lat={23.83590}
            lng={90.41618}
          />

          <SensoreMarker
            lat={22.35443}
            lng={91.83392}
          />
          {this.sensorDhkAircraft()}
          {this.sensorCtgAircraft()}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default MapWithMarkerLabel;