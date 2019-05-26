$(function() {

    var API = "https://api.themoviedb.org/3";
    var KEY = "4ba13f07eb7d66f818df7d9bf080d2e8";
    var URL_IMAGE = "http://image.tmdb.org/t/p/";
    var BACKDROP = URL_IMAGE + "original";
    var POSTER = URL_IMAGE + "w342";
    
    var getMovies = API + "/discover/movie" + "?api_key=" + KEY + "&language=pt-br";
    var getTV = API + "/discover/tv" + "?api_key=" + KEY + "&language=pt-br";
    var getFamily = getMovies + "&with_genres=10751";

    ////////////////////////////
    //    REQUISIÇÕES AJAX    //
    ////////////////////////////
    $.ajax(getMovies).done(function(res){
        mountFeatured(res.results);  
        res.results.shift();
        mountCarousel(res.results, "#movies-slider");
    });

    $.ajax(getTV).done(function(res){
        mountCarousel(res.results, "#series-slider");
    });

    $.ajax(getFamily).done(function(res){
        mountCarousel(res.results, "#family-slider");
    });

    /////////////////////
    //    ANIMAÇÕES    //
    /////////////////////

    $("#play-featured").click(function() {
        var idMovie = $(this).data("id");

        $("#modal").fadeIn();
        setTimeout(function() {
            $("#wrap").addClass("blur");
        }, 200)
        $("body").css("overflow", "hidden")

        $.ajax(API + "/movie/" + idMovie + "?api_key=" + KEY + "&language=pt-br")
            .done(function(res){
                mountModal(res);
        });
    })

    $("#close-modal").click(function() {
        $("#modal").fadeOut();
        setTimeout(function() {
            $("#wrap").removeClass("blur");
        }, 200)
        $("body").css("overflow", "auto")
    });


    //////////////////
    //    LOADER    //
    //////////////////  
    $(document).ajaxComplete(function(){
        setTimeout(function(){
            $("#loading").fadeOut();
        }, 300)
    });

    $(document).ajaxStart(function(){
        $("#loading").fadeIn();
    });


    ///////////////////
    //    FUNÇÕES    //
    ///////////////////
    function mountFeatured(movies) {
        var featured = movies[0];
        var title = featured.title;
        var vote = featured.vote_average;
        var backdrop = BACKDROP + featured.backdrop_path;
        var id = featured.id;
        
        $("#backdrop").css("background-image", "url("+backdrop+")");
        $("#featured-title").text(title);
        $("#featured-vote").text(vote);
        $("#play-featured").attr("data-id", id);
    };

    function mountCarousel(list, slider) {
        list.forEach(function(item) {
            var title = item.title ? item.title : item.name;
            var poster = POSTER + item.poster_path;
            var vote = item.vote_average;

            var template = '<div class="movies-list__item">';
                template += '<img src="' + poster + '">';
                template += '<div class="movies-list__action">';
                template += '<i class="far fa-play-circle"></i>';
                template += '<h3>' + title + '</h3>';
                template += '<div class="rating">';
                template += '<div class="rating__score">'+ vote +'</div>';
                template += '</div>';
                template += '</div>';
                template += '</div>';

            $(slider).slick("slickAdd", template);
        });
    };

    function mountModal(movie) {
        console.log(movie);

        var poster = POSTER + movie.poster_path;
        var title = movie.title;
        var original_title = movie.original_title
        var overview = movie.overview;
        var vote = movie.vote_average;
        var runtime = movie.runtime;
        var homepage = movie.homepage;

        $("#modal .modal__poster img").attr("src", poster);
        $("#modal h2").html(title);
        $("#modal h4").html(original_title);
        $("#modal p").html(overview);
        $("#modal .rating__score").html(vote);
        $("#modal .modal__runtime span").html(runtime + "min");
        $("#modal a").html(homepage).attr("href", homepage);
    };

    $(".movies-list__slider").slick({
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>'
    });


});