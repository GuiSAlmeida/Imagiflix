window.onload = function () {

    $(".movies-list__slider").slick({
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>'
    });
    
    const API = "https://api.themoviedb.org/3";
    const KEY = "527fecb66c1463176173eb8a85882ac7";
    const URL_IMAGE = "http://image.tmdb.org/t/p/";
    const BACKDROP = URL_IMAGE + "original";
    const POSTER = URL_IMAGE + "w342";
    
    // AJAX
    
    const getMovies = API + "/discover/movie" + "?api_key=" + KEY + "&language=pt-br";
    const getTV = API + "/discover/tv" + "?api_key=" + KEY + "&language=pt-br";
    const getFamily = getMovies + "&with_genres=10751";
    
    ajax(getMovies)
        .then(function(response) {
            mountFeatured(response.results)
            response.results.shift();
            mountCarousel(response.results, "#movies-slider");
        })
        .catch(function(reject) {
            console.warn(reject);
            console.log("erro requisição");
        });

    ajax(getTV)
        .then(function(response) {
            mountCarousel(response.results, "#series-slider");
        })
        .catch(function(reject) {
            console.warn(reject);
            console.log("erro requisição");
        });

    ajax(getFamily)
        .then(function(response) {
            mountCarousel(response.results, "#family-slider");
        })
        .catch(function(reject) {
            console.warn(reject);
            console.log("erro requisição");
        });
    

    // INTERACTIONS

    document.getElementById("play-featured").onclick = function() {
        let idMedia = this.getAttribute("data-id");
        let type = this.getAttribute("data-type");
        
        fadeIn(document.getElementById("modal"), 0.2);
        
        setTimeout(function() {
            document.getElementById("wrap").classList.add("blur");
        }, 200);

        document.querySelector("body").style.overflow = "hidden";
    
        ajax(API + "/" + type + "/" + idMedia + "?api_key=" + KEY + "&language=pt-br")
            .then(function(response){
                mountModal(response);
            })
            .catch(function(reject) {
                console.warn(reject);
                console.log("erro requisição");
            });        
    };
        
    const listSliderMovies = document.querySelectorAll(".movies-list__slider")[0];
    const listSliderTV = document.querySelectorAll(".movies-list__slider")[1];
    const listSliderFamily = document.querySelectorAll(".movies-list__slider")[2];

    listSliderMovies.onclick = function(e) {
        console.log(e);
        let idMedia, type;

        if (this.hasAttribute("data-id")) {
            idMedia = this.getAttribute("data-id");
            type = this.getAttribute("data-type");
        } else {
            idMedia = e.target.parentNode.parentNode.getAttribute("data-id");
            type = e.target.parentNode.parentNode.getAttribute("data-type");
        };

        if (idMedia) {
            fadeIn(document.getElementById("modal"), 0.2);
            setTimeout(function() {
                document.getElementById("wrap").classList.add("blur");
            }, 200);
            document.querySelector("body").style.overflow = "hidden";
    
            $.ajax(API + "/" + type + "/" + idMedia + "?api_key=" + KEY + "&language=pt-br")
                .done(function(res){
                    mountModal(res);
            });
        };
    };

    listSliderTV.onclick = function(e) {
        console.log(e);
        let idMedia, type;

        if (this.hasAttribute("data-id")) {
            idMedia = this.getAttribute("data-id");
            type = this.getAttribute("data-type");
        } else {
            idMedia = e.target.parentNode.parentNode.getAttribute("data-id");
            type = e.target.parentNode.parentNode.getAttribute("data-type");
        };

        if (idMedia) {
            fadeIn(document.getElementById("modal"), 0.2);
            setTimeout(function() {
                document.getElementById("wrap").classList.add("blur");
            }, 200);
            document.querySelector("body").style.overflow = "hidden";
    
            $.ajax(API + "/" + type + "/" + idMedia + "?api_key=" + KEY + "&language=pt-br")
                .done(function(res){
                    mountModal(res);
            });
        };
    };

    listSliderFamily.onclick = function(e) {
        console.log(e);
        let idMedia, type;

        if (this.hasAttribute("data-id")) {
            idMedia = this.getAttribute("data-id");
            type = this.getAttribute("data-type");
        } else {
            idMedia = e.target.parentNode.parentNode.getAttribute("data-id");
            type = e.target.parentNode.parentNode.getAttribute("data-type");
        };

        if (idMedia) {
            fadeIn(document.getElementById("modal"), 0.2);
            setTimeout(function() {
                document.getElementById("wrap").classList.add("blur");
            }, 200);
            document.querySelector("body").style.overflow = "hidden";
    
            $.ajax(API + "/" + type + "/" + idMedia + "?api_key=" + KEY + "&language=pt-br")
                .done(function(res){
                    mountModal(res);
            });
        };
    };
    
    document.querySelector("#modal .modal__poster").onclick = function() {
        const type = this.getAttribute("data-type");
        const id = this.getAttribute("data-id");

        ajax(API + "/" + type + "/" + id + "/videos?api_key=" + KEY + "&language=pt-br")
            .then(function(response) {
                fadeIn(document.getElementById("player"), 0.2);
                if (response.results[0]) {
                    console.log(response.results.length);
                    const idVideo = response.results[0].key;
                    
                    const video = '<iframe src="https://www.youtube.com/embed/' + idVideo + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    
                    document.querySelector("#player .player-content").innerHTML = video;
                    document.querySelector("#player iframe").style.width = window.innerWidth+"px";
                    document.querySelector("#player iframe").style.height = window.innerHeight+"px";

                } else {
                    document.querySelector("#player .player-content").innerHTML = '<h3>Vídeo indisponivel :(</h3>';
                    console.log(response.results[0]);
                };
            })
            .catch(function(reject) {
                console.warn(reject);
                console.log("erro requisição");
            })
    };

    document.getElementById("close-modal").onclick = function() {
        fadeOut(this.parentElement, 0.2);
        setTimeout(function() {
            document.getElementById("wrap").classList.remove("blur");
        }, 200);
        
        document.querySelector("body").style.overflow = "auto";
    };

    document.getElementById("close-player").onclick = function() {
        let iframe = document.querySelector('.player-content').firstChild;
        iframe.parentNode.removeChild(iframe);
        fadeOut(this.parentElement, 0.2);
    };    
    
    
    window.addEventListener("resize", function() {
        if(document.querySelector("#player iframe")) {
            document.querySelector("#player iframe").style.width = window.innerWidth+"px";
            document.querySelector("#player iframe").style.height = window.innerHeight+"px";
        }
    });
    
    
    //    FUNCTIONS
    
    function mountFeatured(movies) {
        const featured = movies[0];
        const title = featured.title;
        const vote = featured.vote_average;
        const backdrop = BACKDROP + featured.backdrop_path;
        const id = featured.id;
        
        document.getElementById("backdrop").style.backgroundImage = "url("+backdrop+")";
        document.getElementById("featured-title").innerText = title;
        document.getElementById("featured-vote").innerText = vote;
        document.getElementById("play-featured").setAttribute("data-id", id);
        document.getElementById("play-featured").setAttribute("data-type", "movie");
    };

    function mountCarousel(list, slider) {
        list.forEach(function(item) {
            const title = item.title ? item.title : item.name;
            const poster = POSTER + item.poster_path;
            const vote = item.vote_average;
            const id = item.id;
            const type = item.name ? "tv" : "movie";

            let template = `<div class="movies-list__item" data-id=${id} data-type=${type}>
                                <img src="${ poster }">
                                <div class="movies-list__action">
                                    <i class="far fa-play-circle"></i>
                                    <h3>${title}</h3>
                                    <div class="rating">
                                        <div class="rating__score">${vote}</div>
                                    </div>
                                </div>
                            </div>`;

            $(slider).slick("slickAdd", template);
        });
    };

    function mountModal(media) {

        const isTv = !!media.name;
        const poster = POSTER + media.poster_path;
        const title = isTv ? media.name : media.title;
        const original_title = isTv ? "" : media.original_title
        const overview = media.overview;
        const vote = media.vote_average;
        const runtime = isTv ? media.number_of_seasons+" temporada(s)" : media.runtime+" min";
        const homepage = media.homepage;
        const iconRuntime = isTv ? "fas fa-tv" : "far fa-clock"; 
        const id = media.id;
        
        document.querySelector("#modal .modal__poster").setAttribute("data-id", id);
        document.querySelector("#modal .modal__poster").setAttribute("data-type", isTv ? "tv" : "movie");
        document.querySelector("#modal .modal__poster img").setAttribute("src", poster);
        document.querySelector("#modal h2").innerHTML = title;
        document.querySelector("#modal h4").innerHTML = original_title;
        document.querySelector("#modal p").innerHTML = overview;
        document.querySelector("#modal .rating__score").innerHTML = vote;
        document.querySelector("#modal .modal__runtime span").innerHTML = runtime;
        document.querySelector("#modal .modal__runtime i").classList.remove();
        document.querySelector("#modal .modal__runtime i").setAttribute("class", iconRuntime);       
        document.querySelector("#modal a").innerHTML = homepage;
        document.querySelector("#modal a").setAttribute("href", homepage);

    };

    function ajax(url) {
        return new Promise(function (resolve, reject) {
            document.getElementById("loading").style.display = "block";

            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        document.getElementById("loading").style.display = "none";
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.warn(xhr.status);
                        console.log("erro requisição");
                    }
                };
            };
            xhr.send();
        });
    };

    // fadein & fadeout vanilla
    function fadeIn(element, time){
        procedure(element, time, 0, 100);
    }
    
    function fadeOut(element, time){
        procedure(element, time, 100, 0);
    }
    
    function procedure(element, time, initial, end) {
        if(initial == 0) {
            increment = 2;
            element.style.display = "block";
        } else {
            increment = -2;
        };
    
        let opacity = initial;
    
        interval = setInterval(function(){
            if((opacity == end)){
                if(end == 0){
                    element.style.display = "none";
                }
                clearInterval(interval);
            } else {
                opacity += increment;
                element.style.opacity = opacity/100;
                element.style.filter = "alpha(opacity="+opacity+")";
            }
        }, time * 10);
    }
};