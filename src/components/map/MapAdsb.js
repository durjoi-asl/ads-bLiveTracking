import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import {React, Component} from 'react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aircrafts: {
        data: []
      }
    }

    this.displayAircraft = this.displayAircraft.bind(this)
  }

  componentDidMount() {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = 'http://103.95.99.98/aircraftlist.json';

    
    this.interval = setInterval(() => fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => { 
      // console.log(data)
      this.setState({aircrafts: { data }})

      console.log(this.state.aircrafts.data)
    }), 2000)
    
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  displayAircraft = () => {
    const google = window.google
    return this.state.aircrafts.data.map((aircraft, index) => {
      return <Marker key={index} id={index} position={{lat: aircraft.lat, lng: aircraft.lon}} name= {"Title"}
        icon={{
          path: "M510,255c0-20.4-17.85-38.25-38.25-38.25H331.5L204,12.75h-51l63.75,204H76.5l-38.25-51H0L25.5,255L0,344.25h38.25l38.25-51h140.25l-63.75,204h51l127.5-204h140.25C492.15,293.25,510,275.4,510,255z",
          fillColor: '#FF0000',
          fillOpacity: 1,
          scaledSize: new google.maps.Size(1, 1),
          strokeWeight: 0,
          scale: .04,
          rotation: aircraft.trk - 90
        }}
      />
    })  
  }
  
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%',
    };
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 23.728783, lng: 90.393791}}>
          {this.displayAircraft()}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAhhveERkRFz2TIjA8akOSGIAC3bpsm5U8'
})(App);