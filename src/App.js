import './App.css';
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
    }), 1000)
    
  }
  // componentDidMount() {
  //   this.interval = setInterval(() => this.setState({ aircraft:{ lat: this.state.aircraft.lat+0.005, lng: this.state.aircraft.lng } }), 1000);
  // }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  displayAircraft = () => {
    return this.state.aircrafts.data.map((aircraft, index) => {
      return <Marker key={index} id={index} position={{lat: aircraft.lat, lng: aircraft.lon}}/>
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