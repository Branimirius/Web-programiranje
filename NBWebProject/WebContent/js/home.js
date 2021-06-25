$(document).ready(function() {

    showChosenRestaurantOption();
    showMostBoughtItems();

});

function showChosenRestaurantOption() {
    showSerbianRestaurants();
    showItalianRestaurants();
    showChineseRestaurants();
    showMexicanRestaurants();
    showGreeceRestaurants();
    showFrenchRestaurants();
}

function showMostBoughtItems() {
    $.ajax ({
        type : "GET",
        url : "rest/article/popularArticles",

        success : function (popularArt) {
            $("#slide-to-opcije").empty();
            $("#ilista-jela-i-pica").empty();
            var num = 0;
            for(var art of popularArt) {
                if(num == 0) {
                    var newLi = $('<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>');
                    var newItem = $('<div class="carousel-item active"><img class="d-block w-100" src="pictures/novaind.png"><div class="carousel-caption d-none d-md-block"><h2>' + art.naziv +'</h2><h4>' + art.jedinicnaCena + '</h4></div></div>');
                } else {
                    var newLi = $('<li data-target="#carouselExampleIndicators" data-slide-to="' + num + '" ></li>');
                    var newItem = $('<div class="carousel-item"><img class="d-block w-100" src="pictures/novaind.png"><div class="carousel-caption d-none d-md-block"><h2>' + art.naziv +'</h2><h4>' + art.jedinicnaCena + '</h4></div></div>');
                }
                $("#slide-to-opcije").append(newLi);
                
                $("#lista-jela-i-pica").append(newItem);
                num++;
            }
        }
    });
}

//klik na prikaz restorana srpske kuhinje
function showSerbianRestaurants() {
    $('#serbia-restaurant').click(function(e) {
		
        e.preventDefault();
        
        window.location.href='http://localhost:3665/NBWebProject/restaurants.html?type=serbia';
	});
}
//klik na prikaz restorana italijanske kuhinje
function showItalianRestaurants() {
    $('#italy-restaurant').click(function(e) {
		
        e.preventDefault();
        
        window.location.href='http://localhost:3665/NBWebProject/restaurants.html?type=italy';
	});
}
//klik na prikaz restorana grcke kuhinje
function showGreeceRestaurants() {
    $('#greece-restaurant').click(function(e) {
		
        e.preventDefault();
        
        window.location.href='http://localhost:3665/NBWebProject/restaurants.html?type=greece';
	});
}
//klik na prikaz restorana kineske kuhinje
function showChineseRestaurants() {
    $('#china-restaurant').click(function(e) {
		
        e.preventDefault();
        
        window.location.href='http://localhost:3665/NBWebProject/restaurants.html?type=chinese';
	});
}
//klik na prikaz restorana francuske kuhinje
function showFrenchRestaurants() {
    $('#france-restaurant').click(function(e) {
		
        e.preventDefault();
        
        window.location.href='http://localhost:3665/NBWebProject/restaurants.html?type=serbian';
	});
}
// klik na prikaz restorana meksicke kuhinje
function showMexicanRestaurants() {
    $('#mexico-restaurant').click(function(e) {
		
        e.preventDefault();
        
        window.location.href='http://localhost:3665/NBWebProject/restaurants.html?type=mexican';
	});
}