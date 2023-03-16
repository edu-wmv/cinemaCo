import React from "react";

declare global {
  interface states { 
    uf: string;
    name: string;
    cities: city[];
  }

  type city = {
    id: string;
    name: string;
  }

  type topMovieAPI = {
    id: string;
    title: string;
    duration: string;
    contentRating: string;
    images: movieImg[];
  }

  type topMovie = {
    id: string;
    title: string;
    duration: string;
    contentRating: string;
    poster: string;
  }

  type movieImg = {
    type: string;
    url: string;
  }

  type contentAPI = {
    id: string;
    title: string;
    images: movieImg[];
    contentRating?: string | undefined;
    duration?: string | undefined;
    director?: string | undefined;
    premiereDate?: premiereDate | undefined;
  }

  interface premiereDate {
    isToday: boolean;
    dayOfWeek: string;
    dayAndMonth: string;
  }

  type contentScreen = {
    id: string;
    title: string;
    poster: string;
    contentRating?: string | undefined;
    duration?: string | undefined;
    director?: string | undefined;
    premiereDate?: premiereDate | undefined;
  }

  type trailers = {
    type: string;
    url: string;
    embeddedUrl: string;
  }

  type movieDataAPI = {
    id: string;
    title: string;
    contentRating: string;
    duration: string;
    synopsis: string;
    cast: string;
    director: string;
    genres: string[];
    images: movieImg[];
    trailers: trailers[];
    rottenTomatoe: rottenTomatoe;
  }

  type movieData = {
    id: string;
    title: string;
    contentRating: string;
    duration: string;
    synopsis: string;
    cast: string;
    director: string;
    genres: string[];
    posterH: string;
    posterP: string;
    trailer?: string;
    rottenTomatoe?: rottenTomatoe;
  }

  type rottenTomatoe = {
    id: string;
    criticsRating: string;
    criticsScore: string;
    audienceRating: string;
    audienceScore: string;
    originalUrl: string;
  }
  
  type dateAPI = {
    date: string;
    dateFormatted: string;
    dayOfWeek: string;
  }

  type sessions = {
    dates: dateAPI[];
  }

  type cinemasAPI = {
    id: string;
    name: string;
    address: string;
    number: string;
    neighborhood: string;
  }

  type cinemas = {
    id: string;
    name: string;
    address: string;
  }
}

export {}