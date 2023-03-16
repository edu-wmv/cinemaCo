import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const BASE_URL = 'https://api-content.ingresso.com/v0';

const event_type = {
	coming_soon: "1",
	now: "2",
	destaque: "3",
	em_alta: "5",
	oscar_2023: "9",
}

async function getData() {
  const city_name = await AsyncStorage.getItem('city_name');
  const city_id = await AsyncStorage.getItem('city_id');

  return {
    city_name: city_name !== null ? city_name : 'São Paulo' ,
    city_id: city_id !== null ? city_id : '1',
  }
}


export async function getStatesAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/states`);

    const states: states[] = response.data.map(
      ({
        name,
        uf,
        cities
      }: states) => ({
        name,
        uf,
        cities
      })
    )

    return states;
  } catch (e) {
    console.log(e);
  }
}

export async function getCarousel(): Promise<topMovie> {
  const response = await axios.get(`${BASE_URL}/carousel/${(await getData()).city_id}/partnership/home`)
  const filteredData = await response.data.filter((data: any) => data.id === event_type.destaque);

  const movie: topMovie[] = filteredData[0].events.map(
    ({
      id,
      title,
      duration,
      contentRating,
      images,
    }: topMovieAPI ) => ({
      id,
      title,
      duration: `${duration} min.`,
      contentRating, 
      poster: (images.filter(img => img.type === 'PosterHorizontal')).map(img => img.url).toString(),
    })
  )

  return movie[0];
}

export async function getNow(limit?: number): Promise<any> {
  const response = await axios.get(`${BASE_URL}/templates/nowplaying/${((await getData()).city_id)}/partnership/home?${limit ? 'limit=' + limit: ''}`)
  const movies: contentScreen[] = response.data.items.map(
    ({
      id,
      images,
      title,
    }: contentAPI ) => ({
      id,
      title,
      poster: (images.filter(img => img.type === 'PosterPortrait')).map(img => img.url).toString(),
    })
  )

  return movies;
}

export async function getOscar(): Promise<contentScreen[]> {
  const response = await axios.get(`${BASE_URL}/carousel/${(await getData()).city_id}/partnership/home`);
  const filteredData = response.data.filter((data: any) => data.id === event_type.oscar_2023);

  const movies: contentScreen[] = filteredData[0].events.map(
    ({
      id,
      title,
      images
    }: contentAPI) => ({
      id,
      title,
      poster: (images.filter(img => img.type === 'PosterPortrait')).map(img => img.url).toString(),
    })
  )

  return movies;
}

export async function getComingSoon(): Promise<contentScreen[]> {
  const response = await axios.get(`${BASE_URL}/carousel/${(await getData()).city_id}/partnership/home`);
  const filteredData = response.data.filter((data: any) => data.id === event_type.coming_soon);

  const movies: contentScreen[] = filteredData[0].events.map(
    ({
      id,
      title,
      images,
      contentRating, 
      director,
      duration,
      premiereDate,
    }: contentAPI) => ({
      id,
      title,
      poster: (images.filter(img => img.type === 'PosterPortrait')).map(img => img.url).toString(),
      contentRating,
      director, 
      duration,
      premiereDate
    })
    )

    return movies;
}

export async function getMovieData(id: string): Promise<movieData> {
  const response = await axios.get(`${BASE_URL}/events/${id}/partnership/home`);
  const filteredData: movieDataAPI = await response.data;

  const movies: movieData = {
      id: filteredData.id,
      title: filteredData.title,
      contentRating: filteredData.contentRating,
      duration: filteredData.duration,
      synopsis: filteredData.synopsis,
      cast: filteredData.cast,
      director: filteredData.director,
      genres: filteredData.genres.slice(0, 2),
      posterP: filteredData.images.filter(img => img.type === 'PosterPortrait').map(img => img.url).toString(),
      posterH: filteredData.images.filter(img => img.type === 'PosterHorizontal').map(img => img.url).toString(),
      trailer: filteredData.trailers.length === 0 ? 'undefined' : filteredData.trailers[0].url,
      rottenTomatoe: filteredData.rottenTomatoe !== null ? filteredData.rottenTomatoe : undefined,
    }

  return movies;
}

export async function getSessionData(id: string): Promise<sessions> {
  const response = await axios.get(`${BASE_URL}/sessions/city/${(await getData()).city_id}/event/${id}/partnership/home/groupBy/sessionType?includeOperationPolicies=false`)
  const filteredData = await response.data;

  const dates: dateAPI[] = filteredData.map(
    ({
      date,
      dateFormatted,
      dayOfWeek
    }: dateAPI) => ({
      date,
      dateFormatted,
      dayOfWeek
    })
  );


  // console.log(response.data);

  return {
    dates
  }
}

export async function getCinemas(): Promise<cinemas[]> {
  const response = await axios.get(`${BASE_URL}/theaters/city/${(await getData()).city_id}/partnership/home`)
  const filteredData = await response.data.items;

  const cinemas: cinemas[] = filteredData.map(
    ({
      id,
      name,
      address,
      number,
      neighborhood,
    }: cinemasAPI) => ({
      id,
      name,
      address: `${address}, ${number} - ${neighborhood}`,
    })
  )

  return cinemas;
} 

