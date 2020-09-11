const apiKey = 'd0ae3fc6217c3a4d09217fb5c8685a5d';
const searchbox = document.querySelector('.searchbox')	

function saveSearch(location){
	localStorage.setItem('city',location)
}

function updateForecast(data){
	const location = document.querySelector('.location > span')
	const datetimenow = document.querySelector('.datetimenow > span')
	const currenttemp = document.querySelector('.currenttemp')
	const description = document.querySelector('.description')
	const extradetails = document.querySelector('.extradetails > span')
	const weathericon = document.querySelector('.weathericon')
	const humidity = document.querySelector('.humidity')
	
	location.innerText = data.name + ', ' + data.sys.country;

	let unix_timestamp = data.dt + data.timezone
	unix_timestamp = moment.unix(unix_timestamp).tz('GMT').format('LLL')
	
	datetimenow.innerText = unix_timestamp

	currenttemp.innerText = data.main.temp.toFixed();	

	description.innerText = data.weather[0].description.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

	extradetails.innerText = data.main.feels_like.toFixed();

	const weatherIconId = data.weather[0].icon;
	const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconId}@2x.png`;
	weathericon.src = weatherIconUrl

	humidity.innerText = data.main.humidity
}

function showContent(){
	const loader = document.querySelector('.loader')
	const content = document.getElementsByTagName('article')[0]

	loader.style.display = 'none';
	content.style.display = 'block';

}

function hideContent(){
	const loader = document.querySelector('.loader')
	const content = document.getElementsByTagName('article')[0]
  
	loader.style.display = 'block';
	content.style.display = 'none';
}

function callWeatherApi(location){
	let request = new XMLHttpRequest()
	const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}&units=metric`
	
	request.open('GET', apiWeather, true)

	request.onload = function () {
	  
	  if (request.status >= 200 && request.status < 400) {
	    const data = JSON.parse(this.response)
		updateForecast(data)
		saveSearch(location)
	 } else {
	    console.log('error')
	  }
	  showContent()
	
	}

	request.send()
}


searchbox.addEventListener('change',function(){
	callWeatherApi(this.value)
})

if(localStorage.city){
	callWeatherApi(localStorage.getItem('city'))
}else{
	callWeatherApi('new york')
}
