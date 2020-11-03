var TelegramBot= require('node-telegram-bot-api')
token="YOUR_TELEGRAM_BOT_TOKEN"  //token obtained from bot father

var bot= new TelegramBot(token, {polling:true});
bot.on("polling_error", (err) => console.log(err));

var reques=require('request')

bot.onText(/\/city (.+)/,function(msg,match){
    var city= match[1];
    var chatId=msg.chat.id
    reques('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=YOUR_WEATHER_API_KEY',function(error,response,body)
	{
		//key obtained from openweathermap api
       
	   if(!error && response.statusCode==200)
        {
            bot.sendMessage(chatId,'_Looking for details of_ '+city+'...',{parse_mode: "Markdown"})
            .then(msg)
            {
                res=JSON.parse(body)
				var temp=Math.round((parseInt(res.main.temp_min)-273.15),2)
				var pressure=Math.round(parseInt(res.main.pressure)-1013.15)
                var rise = new Date(parseInt(res.sys.sunrise)*1000);
				var set = new Date(parseInt(res.sys.sunset)*1000);
				bot.sendMessage(chatId,'**** '+ res.name+' ****\nTemperature: '
				+ String(temp)+'°C\nHumidity: '+ res.main.humidity+' %\nWeather: '
				+ res.weather[0].description+'\nPressure: '+ String(pressure)+' atm\nSunrise: '
				+rise.toLocaleTimeString()+' \nSunset: '+set.toLocaleTimeString()+'\nCountry: '+res.sys.country)
            }
        }
    })

})
