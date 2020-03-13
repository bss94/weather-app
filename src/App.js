import React from 'react';
import './style.css';

class App extends React.Component {
    state = {
        data: null,
        city: 'Bishkek',
        loading: false,
        error: false,
    };
    apikey = '1e421ccd9a9020fc2890daf0359af1f3';

    handleChange = (event) => {
        this.setState({city: event.target.value});
    };
    getWeather = (event) => {
        event.preventDefault();
        let city = this.state.city;
        this.setState({
                loading: true,
            }, () => {
                {
                    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apikey}&units=metric`)
                        .then(res => res.json())
                        .then(data => {
                                if (data.cod === 200) {
                                    this.setState({data: data, loading: false, error: false})
                                } else {
                                    this.setState({error: true})
                                }
                            }
                        )
                }
            }
        )
    };

    render() {
        return (
            <div className="App">
                <div className={'container'}>
                    <div className={'weather-box'}>
                        <form align={'center'} onSubmit={this.getWeather}>
                            <input className={'city-name'} type="text" onChange={this.handleChange}
                            />
                            <button className={'city-btn'}>Показать погоду</button>
                        </form>
                        {this.state.error ? (<h4 align={'center'} className={'enter-tag'}>Город не найден<br/>
                            Введите правильное название города</h4>) : this.state.data ? (
                            <div>
                                <h1 className={'weather-prop'}>{this.state.data.name}</h1>
                                {this.state.data.weather.map((item) => (
                                    <div key={item.id} className={'image-box'}><img
                                                                      src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                                                      alt=""/></div>))}
                                <h3 className={'weather-prop'}>Температура: {this.state.data.main.temp}°C</h3>
                                <h3 className={'weather-prop'}>Ощущается:  {this.state.data.main.feels_like}°C</h3>
                            </div>
                        ) : (<div className={'start-box'}>
                                <h4 align={'center'} className={'enter-tag'}>Введите название города</h4>
                            <img
                            src={`https://lh3.googleusercontent.com/napgxTBO7Efx-5NrdG_Mrfh6tISWc7Q1V6mXhQl-yDMOCPQIeioaTnUG5-zAjnFP-_o=w300`}
                            alt=""
                            className={"fake-pic"}/></div>
                        )}
                    </div>
                </div>
            </div>

        );
    }
}

export default App;
