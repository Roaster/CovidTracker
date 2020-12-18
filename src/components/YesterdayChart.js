import React from 'react';  
import axios from 'axios'
import {Bar} from 'react-chartjs-2'


class YesterdayChart extends React.Component {  
    state = {
        country: [],
       yesterday:[]

    }
    componentDidMount(){
        axios.get('https://disease.sh/v3/covid-19/continents?sort=cases')
        .then(res => this.setState({country: res.data}))
        axios.get('https://disease.sh/v3/covid-19/continents?yesterday=true&sort=cases')
        .then(res => this.setState({yesterday: res.data}))



       
   }
    render(){  

        
       return(  
        <div style= {{height:'650px', overflow:'auto',width: '370px' }}>
            <h2 style={{marginBottom:'10px', textAlign: "center"}}>Confirmed Cases, Recovered, Deaths from Previous Day </h2>
        <div style = {{display: 'auto', justifyContent: 'center'}}>    
        <Bar 
            options = {{
                title: {
                    display: true,
                    text: "Confirmed Cases Yesterday vs. Today",
                    fontColor: "black"
                }
            }}
            data= {{
            labels: this.state.country.map(({continent})=> continent),
            datasets: [{
                data: this.state.yesterday.map(({cases})=>cases),
                label: "Confirmed Yesterday",
                backgroundColor:"#a00",
                borderColor: "black",
            },{
           
                data: this.state.country.map(({cases})=>cases),
                    label: "Confirmed Today",
                    backgroundColor:"#f00",
                    borderColor: "green",

                }
            ],

        }}/> 
        <Bar options = {{
                title: {
                    display: true,
                    text: "Recovered Yesterday vs. Today",
                    fontColor: "black"
                }
            }}
            data= {{
            labels: this.state.country.map(({continent})=> continent),
            datasets: [{
                data: this.state.yesterday.map(({deaths})=>deaths),
                label: "Deaths Yesterday",
                backgroundColor:"#666",
                borderColor: "white",
            },{
           
                data: this.state.country.map(({deaths})=>deaths),
                    label: "Deaths Today",
                    backgroundColor:"#000",
                    borderColor: "white",

                }
            ],

        }}/> 
        <Bar options = {{
                title: {
                    display: true,
                    text: "Deaths Yesterday vs. Today",
                    fontColor: "black"
                }
            }}
            data= {{
            labels: this.state.country.map(({continent})=> continent),
            datasets: [{
                data: this.state.yesterday.map(({recovered})=>recovered),
                label: "Recovered Yesterday",
                backgroundColor:"lightGreen",
                borderColor: "black",
            },{
           
                data: this.state.country.map(({recovered})=>recovered),
                    label: "Recovered Today",
                    backgroundColor:"green",
                    borderColor: "black",

                }
            ],

        }}/> 
        
        </div>
    </div>
    )  
}  
}  
  
export default YesterdayChart;