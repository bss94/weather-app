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
                    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apikey}&units=metric`)
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
                                <h1 className={'weather-prop'}>Температура:{this.state.data.main.temp} C</h1>
                                <h1 className={'weather-prop'}>Ощущается:{this.state.data.main.feels_like} C</h1>
                                {this.state.data.weather.map((item) => (
                                    <div className={'image-box'}><img key={item.id}
                                                                      src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                                                      alt=""/></div>))}
                            </div>
                        ) : (<h4 align={'center'} className={'enter-tag'}>Введите название города</h4>)}
                    </div>
                </div>
            </div>

        );
    }
}

export default App;
