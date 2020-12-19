import React, { Component } from 'react'
import axios from 'axios';

export class PredictedActiveStates extends Component {

    state = { 
        sorted: [] 
    }

    componentDidMount(){
        axios.get('https://disease.sh/v3/covid-19/states')
            .then(res => this.setState({sorted: res.data }))
    }

    multiplyByTen(i) {
        return ((i*10).toLocaleString())
    }

    render() {
        return (
            <div>
            <div style = {{background: "#bbb", borderRadius: "2%", padding: "10px"}}>
                <h2 style={{marginBottom:'10px', textAlign: "center", wordWrap: "normal", width:"260px"}}>Predicted Actual Cases by States</h2>
                        <div style= {{height:'250px', overflow:'auto', width: '260px'}}>
                            {this.state.sorted.map((data, i) => (
                                <div key={i} style={state }>
                                <h4 >{data.state}</h4>
                                <h4 style={{marginLeft:'15px'}}>{this.multiplyByTen(parseInt(data.active))}</h4>
                                </div>
                            ))}
                        </div>
                        </div>
            </div>
        )
    }
}

const state = {
    display: 'flex',
}

export default PredictedActiveStates
