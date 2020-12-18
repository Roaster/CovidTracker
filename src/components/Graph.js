import React, { Component } from 'react'
import axios from 'axios'
//npm install --save react-chartjs-2 chart.js
import { Line } from 'react-chartjs-2'



export class Graph extends Component {
    
    state = {
        
        keys: [],
        values: [],
        keysR: [],
        valsR: [],
        country: "",
        history: [],
        myData: []
       

    }
    updateMe(country){
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

                
                this.setState({keys: keys, vals: values, country: this.props.myCountry})
                 
            }) 
        
        } else {

            axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
            .then(res => { 
                
                
                for(const key in res.data.timeline.cases){
                
                keys.push(key)
                values.push(res.data.timeline.cases[key])
                
                }

                for(const key in res.data.timeline.recovered){
                    keysR.push(key)
                    valsR.push(res.data.timeline.recovered[key])
                }


                
                this.setState({keys: keys, values: values, valsR: valsR, keysR: keysR})
                
                console.log(values)
                this.setState({keys: keys, values: values, country: this.props.myCountry})
            }) 
        }
      
    }
    

    componentDidMount(){

        if(this.props.myCountry === ''){
            axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
            .then(res => { 
                let keys = [], values = [], keysR=[], valsR=[]

                for(const key in res.data.cases){
                    keys.push(key)
                    values.push(res.data.cases[key])
                }

                for(const key in res.data.recovered){
                    keysR.push(key)
                    valsR.push(res.data.recovered[key])
                }


                
                this.setState({keys: keys, values: values, valsR: valsR, keysR: keysR, country: this.props.myCountry})
            }) 

        } else {
            axios.get(`https://disease.sh/v3/covid-19/historical/${this.props.myCountry}?lastdays=all`)
            .then(res => { 
                let keys = []
                let values = []
                for(const key in res.data.timeline.cases){
                    keys.push(key)
                    values.push(res.data.timeline.cases[key])
                }
                 this.setState({keys: keys, values: values, country: this.props.myCountry})
                 
            }) 
        }
    }

    render() {
        if(this.props.myCountry !== this.state.country) {
            this.updateMe(this.props.myCountry)
        }
            return (
                <div style = {{background: "#bbb", borderRadius: "2%", padding: "10px", width: "100%", margin: "0px 20px"}}>
                <div style={{display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center", width: "100%"}}>

                    <select name="countrySelect" id="countrySelect" onChange={(e) => {
                        console.log("Changing now!")
                        this.props.handleCountryChange(e.target.value)
                        this.updateMe(e.target.value)  
                    }
                                    
                    }>

                    <option key="" value ="" >Worldwide</option>
                        {this.props.countries.map((data) => (
                            <option key={data.country} value={data.country}>{data.country}</option>
                        ))}
                    </select>
                    <div key="map" style ={{width: "85%"}}>
                        <Line 
                            data= {{
                            labels: this.state.keys,
                            datasets: [{
                                data: this.state.values,
                                label: "Infected",
                                fill: false,
                                borderColor: "#F00",
                            }, {
                                data: this.state.valsR,
                                label: "Recovered", 
                                fill: false,
                                borderColor: "green"
                            }] 
                        }}/>
                    </div>
                </div>
                </div>
            )
        
    }
}



export default Graph
