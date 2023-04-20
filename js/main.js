class Api {
    data = null;
    async getData() {
        await fetch("../data/games.json").then(response => {
            return response.json();
        }).then(newData => {
            this.data = newData.games;
        });
    }
}

class Filter {
    filterdResult = [];
    filter(platform, data) {
        for(let i = 0; i < data.length; i++){
            if(data[i].platform === platform){
                this.filterdResult.push(data[i]);
            }
        }
    }
    randomFromResult(){
        let randomNumber = Math.floor(Math.random() * this.filterdResult.length);
        return this.filterdResult[randomNumber]
    }
}
class URLScraper{
    currentURL;
    platform;
    pretty;
    constructor(){
        this.currentURL = window.location.href;
    }
    getDataFromUrl(){    
        this.platform = (window.location.href.split("platform=")[1]);
        this.pretty = new PrettyPlatform(this.platform);
        this.platform = this.pretty.platform;
    }
}

class PrettyPlatform{
    platform;
    constructor(platform){
        this.platform = platform;
        this.platformToUpperCase();
        this.removeSpaces();
    }
    platformToUpperCase(){
        this.platform = this.platform.toUpperCase();
    }

    removeSpaces(){
        this.platform = this.platform.replaceAll(" ", "");
        this.platform = this.platform.replaceAll("%20", "");
    }
}
class Render{

    render(randomResult){
    const articleToBeRenderd = document.createElement("article");
    articleToBeRenderd.classList = "card";
    document.getElementsByTagName("body")[0].appendChild(articleToBeRenderd);

    const headingToBeRendered = document.createElement("h1");
    headingToBeRendered.classList ="card__heading";
    document.getElementsByTagName("article")[0].appendChild(headingToBeRendered);
    
    headingToBeRendered.innerText = randomResult.title;
    }
}
class App {
    api;
    filter;
    urlScraper;
    render;
    constructor() {
        this.api = new Api();
        this.filter = new Filter();
        this.urlScraper = new URLScraper();
        this.render = new Render();

        this.urlScraper.getDataFromUrl();

        this.api.getData().then(
            () => {
                this.filter.filter(this.urlScraper.platform, this.api.data);
                this.render.render(this.filter.randomFromResult());
            }
        );
        
    }
}

const app = new App();
