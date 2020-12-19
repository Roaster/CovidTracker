import React, { Component } from 'react'
import axios from 'axios';
import { findByLabelText } from '@testing-library/react';
import Countries from './Countries'
import CountryDeaths from './CountryDeaths'
import RecoveredCountries from './RecoveredCountries'
import ActiveCountries from './ActiveCountries'
import RecoveredStates from './RecoveredStates'
import ActiveStates from './ActiveStates'
import PredictedActiveCountries from './PredictedActiveCountries'
import PredictedActiveStates from './PredictedActiveStates'
import PredictedDeathsCountries from './PredictedDeathsCountries'
import PredictedDeathsStates from './PredictedDeathsStates'
import DataSources from './DataSources'
import Graph from './Graph'
import CountUp from 'react-countup'
import DailyChart from './dailyChart'
import YesterdayChart from './YesterdayChart';
import IncreaseChart from './IncreaseChart'
import Map from './Map'




export class Overview extends Component {

    state = {
        data: [],
        usData: [],
        sorted: [],
        countries: [],
        history: [],
        country: '',
        countryInfo: []
    }

    componentDidMount(){
        axios.get('https://disease.sh/v3/covid-19/all')
            .then(res => this.setState({ data: res.data}))
        axios.get('https://disease.sh/v3/covid-19/countries/United%20States?strict=true')
            .then(res => this.setState({usData: res.data }))
        axios.get('https://disease.sh/v3/covid-19/countries?sort=cases')
            .then(res => this.setState({sorted: res.data }))
        axios.get('https://disease.sh/v3/covid-19/countries')
            .then(res => this.setState({countries: res.data }))
        axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
            .then(res => this.setState({history: res.data }))
            
        
      }

      getCountryInfo = () => {
          
        const countryInfo = this.state.countries.map(({countryInfo}) => countryInfo)
        this.setState({countryInfo: countryInfo})
        //console.log(this.state.countryInfo)
      }

      getCountryHistory = (country) => {
          if(country !== ""){
            axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
            .then(res => this.setState({history: res.data.timeline }))  
          } else {
            axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
            .then(res => this.setState({history: res.data }))
          }
        }
    
    
      handleCountryChange = (country) =>{
        console.log(country)
        this.getCountryHistory(country)
        this.setState({country: country})
      }

    render() {
        //console.log(this.state.countries)
        return (
            <div style={{margin: "0px 25px", marginBottom: "15px"}}>
            <h1 style={{textAlign:'center',marginTop:'20px'}}>Worldwide Statistics</h1>
            
            <div style ={{display:"flex", alignItems: "center"}}>
                <DailyChart />
                <div>
                    <div style={{display: 'flex',justifyContent:'center'}}>
                        <div style={div1}>
                            <h2>Active Cases</h2>
                            <h2><CountUp start={0} end={(parseInt(this.state.data.cases)) || 0} separator=","  /></h2>
                        </div>
                        <div style={div1}>
                            <h2>Total Deaths</h2>
                            <h2><CountUp start={0} end={parseInt(this.state.data.deaths) || 0} separator="," /></h2>
                        </div>
                        <div style={div1}>
                            <h2>Total Recovered</h2>
                            <h2><CountUp start={0} end={parseInt(this.state.data.recovered) || 0} separator="," /></h2>
                        </div>
                    </div>
                    <h1 style={{textAlign:'center',marginTop:'20px'}}> U.S. Statistics</h1>

                        <div style={{display: 'flex',justifyContent:'spaceBetween'}}>
                        
                            <div style={div1}>
                                <h2>Active Cases</h2>
                                <h2><CountUp start={0} end={parseInt(this.state.usData.active) || 0} separator=","/></h2>
                            </div>
                            <div style={div1}>
                                <h2>Total Deaths</h2>
                                <h2><CountUp start={0} end={parseInt(this.state.usData.deaths) || 0} separator="," /></h2>
                            </div>

                            <div style={div1}>
                                <h2>Total Recovered</h2>
                                <h2><CountUp start={0} end={parseInt(this.state.usData.recovered) || 0} separator="," /></h2>
                            </div>
                            
                        </div>
                    </div>
                    <IncreaseChart />
                </div>
                
               
                <div key="div2" style = {{display: 'flex', justifyContent: 'space-between'}}>
                <Countries sorted={this.state.sorted} handleCountryChange={this.handleCountryChange}/>

                <Graph countries={this.state.countries} handleCountryChange={this.handleCountryChange} 
                myCountry={this.state.country} 
                getCountryData={this.getCountryHistory} history={this.state.history}/>

                <CountryDeaths handleCountryChange={this.handleCountryChange} />
                </div>

                <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                    <RecoveredCountries />
                    {console.log(this.state.countryInfo)}
                    <Map  countries={this.state.countries} getCountryInfo={this.getCountryInfo} countryInfo={this.state.countryInfo}/>
                    <ActiveCountries /> 
                </div>

                <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                    <RecoveredStates />
                    
                    <ActiveStates />
                </div>

                <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                    <PredictedActiveCountries />
                    <PredictedDeathsCountries />
                    <PredictedActiveStates />
                    <PredictedDeathsStates />
                </div>
               
           
            <div style={{width:"100%"}}>
                <YesterdayChart />
            </div>

            <div style = {{display: 'flex', justifyContent: 'center'}}>
                <DataSources />
            </div>
            
            </div>
        )
    }
}

const div1 = {
    height: '100px',
    width: '200px',
    background: '#bbb',
    padding: '10px',
    margin: '25px',
    textAlign: 'center',
    lineHeight: '250%',
    borderRadius:'2%'
    
}

export default Overview
