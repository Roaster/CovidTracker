import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css';


export class Map extends Component {
  state = {
    coords: [],
    countryInfo: []
  }
  
  
 componentDidMount(){
  
    axios.get('https://disease.sh/v3/covid-19/countries')
          .then(res => this.setState({countryInfo: res.data.map((data) => (data)) }))
 }

  render() {
   
    


    console.log(this.state.countryInfo)
    const info = this.state.countryInfo.map(({countryInfo}) => (countryInfo))

   return (
      

      <div style={{height: "90%%", width: "90%", display:"flex", justifyContent: "center", marginTop: "10px"}}>
     
        <MapContainer center={[49.505, -20.09]} zoom={2} scrollWheelZoom={true} style={{height:"500px", width: "90%"}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {this.state.countryInfo.map((data, i) => (
          <Circle key={i} center={[data.countryInfo.lat, data.countryInfo.long]} radius={data.cases/10} >
          <Popup>
             <img src = {data.countryInfo.flag} style={{height: "100%", width: "100%"}} ></img>
             <h1>Country: {data.country} </h1>
             <h1>Cases: {data.active}</h1>
             <h1>Deaths: {data.deaths}</h1>
             <h1>Recovered: {data.recovered}</h1>
          </Popup>
          </Circle>
        ))}
      </MapContainer>
      </div>
    )
  } 
  
}

export default Map
