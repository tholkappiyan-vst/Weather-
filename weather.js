let input = document.getElementById("area");
    let btn = document.getElementById("btn");
    let text = document.getElementById("text");

    btn.addEventListener("click", () => {
      let city = input.value;
      let result = null;

      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(res => res.json())
        .then(geo => {
          const LAT = geo.results[0].latitude;
          const LON = geo.results[0].longitude;

          return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`);
        })
        .then(res => res.json())
        .then(weather => {
          result = weather;

          // Accessing data inside .then because fetch is asynchronous
          let temp = result.current_weather.temperature;
          let humidity = result.current_weather.relative_humidity; // Note: some APIs may not provide humidity

          text.value = `Temperature: ${temp}°C\nHumidity: ${humidity}%`;
        })
        .catch(err => {
          console.error("Weather not found", err);
          text.value = "Weather not found!";
        });
    });
