import CategoriesView from './CategoriesView.js';
import Controller from './Controller.js';
const urlList = {
  main: `https://api.themoviedb.org/3/movie/now_playing?api_key=64391ca210dbae0d44b0a622177ef8d3&language=ko&page=1`,
  old: `https://api.themoviedb.org/3/discover/movie?api_key=64391ca210dbae0d44b0a622177ef8d3&language=ko&primary_release_date.lte=2000&sort_by=popularity.desc&vote_count.gte=50`,
  sciFi: `https://api.themoviedb.org/3/discover/movie?api_key=64391ca210dbae0d44b0a622177ef8d3&language=ko&with_genres=878&sort_by=vote_average.desc&vote_count.gte=50`,
  drama: `https://api.themoviedb.org/3/discover/movie?api_key=64391ca210dbae0d44b0a622177ef8d3&language=ko&with_genres=18&primary_release_year=2014`,
  comedy: `https://api.themoviedb.org/3/discover/movie?api_key=64391ca210dbae0d44b0a622177ef8d3&language=ko&with_genres=35&primary_release_year=2014`,
  BradPitt: `https://api.themoviedb.org/3/discover/movie?api_key=64391ca210dbae0d44b0a622177ef8d3&language=ko&with_people=287&vote_count.gte=1000&sort_by=popularity.asc`,
  Kieslowski: `https://api.themoviedb.org/3/discover/movie?api_key=64391ca210dbae0d44b0a622177ef8d3&language=ko&with_crew=1126&sort_by=popularity.desc`,
  DavidLynch: `https://api.themoviedb.org/3/discover/movie?api_key=64391ca210dbae0d44b0a622177ef8d3&language=ko&with_crew=5602&sort_by=popularity.desc`,
  Godard: `https://api.themoviedb.org/3/discover/movie?api_key=64391ca210dbae0d44b0a622177ef8d3&language=ko&with_crew=3776&sort_by=popularity.desc`
}



const categoriesView = new CategoriesView('.left-nav__categories');
const controller = new Controller(urlList, categoriesView);


const setView = () => controller.setView(urlList);
window.addEventListener('load', setView);