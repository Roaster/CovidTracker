import React from 'react';  
import axios from 'axios'
import {Bar, Line} from 'react-chartjs-2'


class dailyChart extends React.Component {  
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
        <div style={{width: "33%"}}>
       <h2 style={{marginBottom:'10px', textAlign: "center"}}></h2>
        <Bar
            options={{
                title : {
                    display: true,
                    text: "Total Confirmed Cases, Recovered and Deaths by Region" ,
                    fontSize: 20,
                    fontColor: "black"
                    }
            }} 
            data= {{
            labels: this.state.country.map(({continent})=> continent),
            datasets: [{
                data: this.state.country.map(({cases})=>cases),
                label: "Confirmed",
                fill: false,
                borderColor: "#F00",
                backgroundColor: "#F00"
            },{
           
                data: this.state.country.map(({deaths})=>deaths),
                    label: "Death",
                    fill: false,
                    borderColor: "black",
                    backgroundColor: "black"

                },{
                data: this.state.country.map(({recovered})=>recovered),
                label: "Recovered",
                fill: false,
                borderColor: "green",
                backgroundColor: "green"
                }
            ],

        }}/> 

    </div>
    )  
}  
}  
  
export default dailyChart;
