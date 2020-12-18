import React from 'react';  
import axios from 'axios'
import {Line} from 'react-chartjs-2'


class DailyChart extends React.Component {  
    state = {
        country: [],
        keys: [1,2,3,4],
        values: [3,4,5,]

    }
    componentDidMount(){
        axios.get('https://disease.sh/v3/covid-19/continents?sort=cases')
        .then(res => this.setState({country: res.data}))


       
   }
    render(){  

        
       return(  
        <div style ={{width: "85%"}}>
       <h2 style={{marginBottom:'10px', textAlign: "center"}}>Confirmed Cases, Recovered, Deaths by Region</h2>
        <Line 
            data= {{
            labels: this.state.country.map(({continent})=> continent),
            datasets: [{
                data: this.state.country.map(({cases})=>cases),
                label: "Confirmed",
                fill: false,
                borderColor: "#F00",
            },{
           
                data: this.state.country.map(({deaths})=>deaths),
                    label: "Death",
                    fill: false,
                    borderColor: "black",

                },{
                data: this.state.country.map(({recovered})=>recovered),
                label: "Recover",
                fill: false,
                borderColor: "yellow",
                }
            ],

        }}/> 

    </div>
    )  
}  
}  
  
export default DailyChart;