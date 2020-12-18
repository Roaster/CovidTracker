import React, { Component } from 'react'
import axios from 'axios'
//npm install --save react-chartjs-2 chart.js
import { Line } from 'react-chartjs-2'



export class Graph extends Component {
    
    /*state = {
        keys: [],
        values: [],
        keysR: [],
        valsR: [],
        country: "",
        history: [],
        myData: []
       
    }*/
    
    /*updateMe(country){
        let keys = [], values = [], keysR=[], valsR=[]

        console.log("updateme()")
        console.log(this.props.myCountry)

        if(country === ''){
            axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
            .then(res => { 
                
                
                for(const key in res.data.cases){
                    keys.push(key)
                    values.push(res.data.cases[key])
                }

                
                this.setState({keys: keys, vals: values, country: this.props.myCountry, history: res.data})
                 
            }) 
        
        } else {
            axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
            .then(res => { 
                this.setState({country: this.props.myCountry, history: res.data})
              
            }) 
        }
      
    }*/
    

    /*componentDidMount(){

        if(this.props.myCountry === ''){
            axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
            .then(res => { 
                this.setState({country: this.props.myCountry, history: res.data})
            }) 

        } else {
            axios.get(`https://disease.sh/v3/covid-19/historical/${this.props.myCountry}?lastdays=all`)
            .then(res => { 
                 this.setState({country: this.props.myCountry, history: res.data})
                 
            }) 
        }
    }*/
 
    render() {
       
        /*if(this.props.myCountry !== this.state.country) {
            this.updateMe(this.props.myCountry)
        }*/
            return (
                <div style = {{background: "#bbb", borderRadius: "2%", padding: "10px", width: "100%", margin: "0px 20px"}}>
                <div style={{display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center", width: "100%"}}>

                    <select name="countrySelect" id="countrySelect" onChange={(e) => {
                        this.props.handleCountryChange(e.target.value)
                        //this.updateMe(e.target.value)  
                    }          
                    }>

                    <option key="" value ="" >Worldwide</option>
                        {this.props.countries.map((data) => (
                            <option key={data.country} value={data.country}>{data.country}</option>
                        ))}
                    </select>
                    <div key="map" style ={{width: "85%"}}>
                        <Line 
                            options={{
                                title : {
                                    display: true,
                                    text: this.props.myCountry === "" ? "Worldwide" : this.props.myCountry,
                                    fontSize: 20,
                                    fontColor: "black"
                                }
                            }} 
                            data= {{
                            labels: this.props.history.cases ? Object.keys(this.props.history.cases): [""],
                            datasets: [{
                                data: this.props.history.cases ? Object.values(this.props.history.cases) : [0],
                                label: "Infected",
                                fill: false,
                                borderColor: "#F00",
                                backgroundColor: "#F00"
                            }, {
                                data: this.props.history.recovered ? Object.values(this.props.history.recovered) : [0],
                                label: "Recovered", 
                                fill: false,
                                borderColor: "green"
                            },{
                                data: this.props.history.deaths ? Object.values(this.props.history.deaths) : [0],
                                label: "Deaths",
                                fill: false, 
                                borderColor: "black"
                            }
                            ], 
                            
                        }}/>
                    </div>
                </div>
                </div>
            )
        
    }
}



export default Graph
