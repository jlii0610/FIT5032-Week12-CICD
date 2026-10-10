<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>

      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />

        <button
          @click="searchByCity"
          class="search-button"
        >
          Search
        </button>
      </div>
    </div>

    <main>
      <div v-if="weatherData">
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>

        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>

        <span>
          {{ weatherData.weather[0].description }}
        </span>
      </div>
    </main>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const apikey = "3ba7735d17d341fdc5b4df171b86d4e3";

// Reactive state (replacing `data()`)
const city = ref("");
const weatherData = ref(null);
const hourlyForecast = ref([]);
const dailyForecast = ref([]);

// Computed properties (replacing `computed:`)
const temperature = computed(() => {
  return weatherData.value
    ? Math.floor(weatherData.value.main.temp - 273)
    : null;
});

const iconUrl = computed(() => {
  return weatherData.value
    ? `https://openweathermap.org/payload/api/media/file/${weatherData.value.weather[0].icon}.png`
    : null;
});

// Methods (defined as standard JavaScript functions)
const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url);
    // Use .value to update ref variables
    weatherData.value = response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}; 

const searchByCity = async () => {
  if (city.value.trim() === "") {
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.value)}&appid=${apikey}`;

  await fetchWeatherData(url);
};

const fetchCurrentLocationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
      await fetchWeatherData(url);
    });
  }
};

// Lifecycle hook (replacing `mounted()`)
onMounted(() => {
  fetchCurrentLocationWeather();
});

</script>