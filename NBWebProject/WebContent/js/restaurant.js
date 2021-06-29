
$(document).ready(function() {

	showChosenOption();
	showRecivedOption();
	
});

function showSerbianRestaurants() {
    
    $.ajax ({
		type : 'GET',
		url : 'rest/restaurant/restaurants',
		
		success : function(restaurants) {
			
			$('#showAll-serbian-restaurants').empty();
			
			for(var r of restaurants) { 
				if(r.type == "Serbian") {
					
					var newR = $('<div class="col-sm-3"><br><div class="card text-center" style="width: 15rem;"><img class="card-img-top" src="pictures/2_0.png"alt="Card image cap"><div class="card-body"><a href="#" id="serbian-restaurant-id-' + r.id + '"><h5 class="card-title">' + r.name + '</h5></a><p class="card-text">' + r.location.adress + '</p><button id="add-to-favourites-id-' + r.id + '" class="btn btn-primary">OMILJEN</button></div></div></div>');
					$('#showAll-serbian-restaurants').append(newR);

					$('#serbian-restaurant-id-'+ r.id).click(showAllArticlesFromRestaturant(r));
					var buttonId = "add-to-favourites-id-" + r.id;
					checkUserKindFavourite(buttonId);

					$("#add-to-favourites-id-" + r.id).click(addRestaurantToFavourite(r.id));
				}
			}
		},
		
		error : function() {
			alert("Greška pri učitavanju restorana");
		}
	});
}

function showItalianRestaurants() {
    
    $.ajax ({
		type : 'GET',
		url : 'rest/restaurant/restaurants',
		
		success : function(restorani) {
			
			$('#showAll-italian-restaurants').empty();
			
			for(var r of restorani) { 
				if(r.type == "Italian") {
					
					var newR = $('<div class="col-sm-3"><br><div class="card text-center" style="width: 15rem;"><img class="card-img-top" src="pictures/15_0.png"alt="Card image cap"><div class="card-body"><a href="#" id="italian-restaurant-id-' + r.id + '"><h5 class="card-title">' + r.name + '</h5></a><p class="card-text">' + r.location.adress + '</p><button id="add-to-favourites-id-' + r.id + '" class="btn btn-primary">OMILJEN</button></div></div></div>');
					$('#showAll-italian-restaurants').append(newR);

					$('#italian-restaurant-id-'+ r.id).click(showAllArticlesFromRestaturant(r));
					var buttonId = "add-to-favourites-id-" + r.id;
					checkUserKindFavourite(buttonId);

					$("#add-to-favourites-id-" + r.id).click(addRestaurantToFavourite(r.id));
				}
			}
		},
		
		error : function() {
			alert("Greška pri učitavanju restorana");
		}
	});
}

function showGreekRestaurants() {
    
	$.ajax ({
		type : 'GET',
		url : 'rest/restaurant/restaurants',
		
		success : function(restaurants) {
			
			$('#showAll-greek-restaurants').empty();
			
			for(var r of restaurants) { 
				if(r.type == "Greek") {
					
					var newR = $('<div class="col-sm-3"><br><div class="card text-center" style="width: 15rem;"><img class="card-img-top" src="pictures/2_0.png"alt="Card image cap"><div class="card-body"><a href="#" id="greek-restaurant-id-' + r.id + '"><h5 class="card-title">' + r.name + '</h5></a><p class="card-text">' + r.location.adress + '</p><button id="add-to-favourites-id-' + r.id + '" class="btn btn-primary">OMILJEN</button></div></div></div>');
					$('#showAll-greek-restaurants').append(newR);

					$('#greek-restaurant-id-'+ r.id).click(showAllArticlesFromRestaturant(r));
					var buttonId = "add-to-favourites-id-" + r.id;
					checkUserKindFavourite(buttonId);

					$("#add-to-favourites-id-" + r.id).click(addRestaurantToFavourite(r.id));
				}
			}
		},
		
		error : function() {
			alert("Greška pri učitavanju restorana");
		}
	});
}

function showFrenchRestaurants() {
    
	$.ajax ({
		type : 'GET',
		url : 'rest/restaurant/restaurants',
		
		success : function(restaurants) {
			
			$('#showAll-french-restaurants').empty();
			
			for(var r of restaurants) { 
				if(r.type == "French") {
					
					var newR = $('<div class="col-sm-3"><br><div class="card text-center" style="width: 15rem;"><img class="card-img-top" src="pictures/2_0.png"alt="Card image cap"><div class="card-body"><a href="#" id="french-restaurant-id-' + r.id + '"><h5 class="card-title">' + r.name + '</h5></a><p class="card-text">' + r.location.adress + '</p><button id="add-to-favourites-id-' + r.id + '" class="btn btn-primary">OMILJEN</button></div></div></div>');
					$('#showAll-french-restaurants').append(newR);

					$('#french-restaurant-id-'+ r.id).click(showAllArticlesFromRestaturant(r));
					var buttonId = "add-to-favourites-id-" + r.id;
					checkUserKindFavourite(buttonId);

					$("#add-to-favourites-id-" + r.id).click(addRestaurantToFavourite(r.id));
				}
			}
		},
		
		error : function() {
			alert("Greška pri učitavanju restorana");
		}
	});
}

function showMexicanRestaurants() {
    
	$.ajax ({
		type : 'GET',
		url : 'rest/restaurant/restaurants',
		
		success : function(restaurants) {
			
			$('#showAll-mexican-restaurants').empty();
			
			for(var r of restaurants) { 
				if(r.type == "Mexican") {
					
					var newR = $('<div class="col-sm-3"><br><div class="card text-center" style="width: 15rem;"><img class="card-img-top" src="pictures/2_0.png"alt="Card image cap"><div class="card-body"><a href="#" id="mexican-restaurant-id-' + r.id + '"><h5 class="card-title">' + r.name + '</h5></a><p class="card-text">' + r.location.adress + '</p><button id="add-to-favourites-id-' + r.id + '" class="btn btn-primary">OMILJEN</button></div></div></div>');
					$('#showAll-mexican-restaurants').append(newR);

					$('#mexican-restaurant-id-'+ r.id).click(showAllArticlesFromRestaturant(r));
					var buttonId = "add-to-favourites-id-" + r.id;
					checkUserKindFavourite(buttonId);

					$("#add-to-favourites-id-" + r.id).click(addRestaurantToFavourite(r.id));
				}
			}
		},
		
		error : function() {
			alert("Greška pri učitavanju restorana");
		}
	});
}

function showChineseRestaurants() {
    
	$.ajax ({
		type : 'GET',
		url : 'rest/restaurant/restaurants',
		
		success : function(restaurants) {
			
			$('#showAll-chinese-restaurants').empty();
			
			for(var r of restaurants) { 
				if(r.type == "Chinese") {
					
					var newR = $('<div class="col-sm-3"><br><div class="card text-center" style="width: 15rem;"><img class="card-img-top" src="pictures/2_0.png"alt="Card image cap"><div class="card-body"><a href="#" id="chinese-restaurant-id-' + r.id + '"><h5 class="card-title">' + r.name + '</h5></a><p class="card-text">' + r.location.adress + '</p><button id="add-to-favourites-id-' + r.id + '" class="btn btn-primary">OMILJEN</button></div></div></div>');
					$('#showAll-chinese-restaurants').append(newR);

					$('#chinese-restaurant-id-'+ r.id).click(showAllArticlesFromRestaturant(r));
					var buttonId = "add-to-favourites-id-" + r.id;
					checkUserKindFavourite(buttonId);

					$("#add-to-favourites-id-" + r.id).click(addRestaurantToFavourite(r.id));
				}
			}
		},
		
		error : function() {
			alert("Greška pri učitavanju restorana");
		}
	});
}

function addRestaurantToFavourite(restaurantId) {
	return function(e) {
		e.preventDefault();

		$.ajax ({
			type : 'PUT',
			url : "rest/user/favourite/" + restaurantId,
			
			success : function() {
				alert("Restoran je uspešno dodat u listu omiljenih!");
			},
			
			error : function(message) {
				alert(message.responseText);
			}
		});
	}
}

function showAllArticlesFromRestaturant(r) {
	return function(e) {
		e.preventDefault();

		var listaJela = r.listaJela;
		var listaPica = r.listaPica;

		hideRestaurantsAndTitles();
		$('#tabela-artikala-svi').show();
		
		$.ajax ({
			type : 'GET',
			url : 'rest/article/articles',
			
			success : function(artikli) {
				
				var num = 0;
				checkUserKind();
				// setovanje h3 - naslov za artikle restorana
				var header = document.getElementById("naslov-restorana-meni");
				header.innerHTML = "Meni restorana: \"" + r.naziv + "\"";
				
				$('#artikli-tbody-id').empty();
				
				for(var a of artikli) { 
					if(a.obrisan == false ) {
						if(listaPica.includes(a.id) || listaJela.includes(a.id)) {
							num++;
							var tr = $('<tr></tr>');
							var number = $('<td>' + num + '</td>');
							var naziv = $('<td>' + a.naziv + '</td>');
		
							var mera;
							if (a.tipJela == "jelo") {
								mera = "g";
							} else {
								mera = "ml";
							}
		
							var kolicina = $('<td>' + a.kolicina + mera + '</td>');
						
							var opis = $('<td>' + a.opis + '</td>');
							var cena = $('<td>' + a.jedinicnaCena + '</td>');

							var komada =$('<td><select class="form-control" id="kolicina-artikla-' + a.id + '" name="kolicina-artikla-' + a.id + '"><option value="1" selected>1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td>');

							var poruci = $('<td><button type="button" class="btn btn-secondary" class="kupac-poruci" id="poruci-artikl-' + a.id + '">Poruči</button></td>');

							tr.append(number).append(naziv).append(kolicina).append(opis).
								append(cena).append(komada).append(poruci);
							$('#artikli-tbody-id').append(tr);
							
							$('#poruci-artikl-' + a.id).click(addToCart(a));
						}
					}
				}
			},
			
			error : function() {
				alert("Greška pri učitavanju tabele artikala!");
			}
		});
	}
}

function addToCart(artikl) {
	return function(e) {
		e.preventDefault();
		
		var kolicina = $("#kolicina-artikla-" + artikl.id).val();

		$.ajax ({
			type : 'POST',
			url : 'rest/user/addToCart',
			data : JSON.stringify({
				kolicina : kolicina,
				artikl : artikl
			}),
			contentType : 'application/json',
			success : function() {
				alert("Dodavanje artikla u korpu je uspešno!");
			},
			
			error : function(message) {
				alert(message.responseText);
			}
		});
		
	}
}

function showChosenOption() {

	hideRestaurantsAndTitles();
	$('#all-articles').hide();

	// klik na restorane domace hrane iz restaurants.html
    $('#serbia-restaurant').click(function(e) {
		
		e.preventDefault();

		$('#all-articles').hide();

		$("#showAll-serbian-restaurants").delay(250).fadeIn(250);
		$('#showAll-italian-restaurants').hide();
		$('#showAll-greek-restaurants').hide();
		$('#showAll-french-restaurants').hide();
		$('#showAll-mexican-restaurants').hide();
		$('#showAll-chinese-restaurants').hide();

		$('#title-serbian').delay(250).fadeIn(250);
		$('#title-italian').hide();
		$('#title-greek').hide();
		$('#title-french').hide();
		$('#title-mexican').hide();
		$('#title-chinese').hide();
		
		showSerbianRestaurants();
	});
	// klik na rostilj restorane iz restaurants.html
	$('#italy-restaurant').click(function(e) {
		
		e.preventDefault();

		$('#all-articles').hide();

		$("#showAll-serbian-restaurants").hide();
		$('#showAll-italian-restaurants').delay(250).fadeIn(250);
		$('#showAll-greek-restaurants').hide();
		$('#showAll-french-restaurants').hide();
		$('#showAll-mexican-restaurants').hide();
		$('#showAll-chinese-restaurants').hide();

		$('#title-serbian').hide();
		$('#title-italian').delay(250).fadeIn(250);
		$('#title-greek').hide();
		$('#title-french').hide();
		$('#title-mexican').hide();
		$('#title-chinese').hide();
		
		
		showItalianRestaurants();
	});
	// klik na kineske restorane iz restaurants.html
	$('#greece-restaurant').click(function(e) {
		
		e.preventDefault();

		$('#all-articles').hide();

		$("#showAll-serbian-restaurants").hide();
		$('#showAll-italian-restaurants').hide();
		$('#showAll-greek-restaurants').delay(250).fadeIn(250);
		$('#showAll-french-restaurants').hide();
		$('#showAll-mexican-restaurants').hide();
		$('#showAll-chinese-restaurants').hide();

		$('#title-serbian').hide();
		$('#title-italian').hide();
		$('#title-greek').delay(250).fadeIn(250);
		$('#title-french').hide();
		$('#title-mexican').hide();
		$('#title-chinese').hide();
		
		
		showGreekRestaurants();
	});
	// klik na indijske restorane iz restaurants.html
	$('#french-restaurant').click(function(e) {
	
		e.preventDefault();
	
		$('#all-articles').hide();
	
		$("#showAll-serbian-restaurants").hide();
		$('#showAll-italian-restaurants').hide();
		$('#showAll-greek-restaurants').hide();
		$('#showAll-french-restaurants').delay(250).fadeIn(250);
		$('#showAll-mexican-restaurants').hide();
		$('#showAll-chinese-restaurants').hide();
	
		$('#title-serbian').hide();
		$('#title-italian').hide();
		$('#title-greek').hide();
		$('#title-french').delay(250).fadeIn(250);
		$('#title-mexican').hide();
		$('#title-chinese').hide();
		
		
		showFrenchRestaurants();
	});
	// klik na poslasticarnice iz restaurants.html
	$('#french-restaurant').click(function(e) {
		
		e.preventDefault();
	
		$('#all-articles').hide();
	
		$("#showAll-serbian-restaurants").hide();
		$('#showAll-italian-restaurants').hide();
		$('#showAll-greek-restaurants').hide();
		$('#showAll-french-restaurants').delay(250).fadeIn(250);
		$('#showAll-mexican-restaurants').hide();
		$('#showAll-chinese-restaurants').hide();
	
		$('#title-serbian').hide();
		$('#title-italian').hide();
		$('#title-greek').hide();
		$('#title-french').delay(250).fadeIn(250);
		$('#title-mexican').hide();
		$('#title-chinese').hide();
		
		
		showFrenchRestaurants();
	});
	// klik na picerije iz restaurants.html
	$('#mexican-restaurant').click(function(e) {
		
		e.preventDefault();

		$('#all-articles').hide();

		$("#showAll-serbian-restaurants").hide();
		$('#showAll-italian-restaurants').hide();
		$('#showAll-greek-restaurants').hide();
		$('#showAll-french-restaurants').hide();
		$('#showAll-mexican-restaurants').delay(250).fadeIn(250);
		$('#showAll-chinese-restaurants').hide();

		$('#title-serbian').hide();
		$('#title-italian').hide();
		$('#title-greek').hide();
		$('#title-french').hide();
		$('#title-mexican').delay(250).fadeIn(250);
		$('#title-chinese').hide();
		
		
		showMexicanRestaurants();
	});
}

function hideRestaurantsAndTitles() {

	$("#showAll-serbian-restaurants").hide();
	$('#showAll-italian-restaurants').hide();
	$('#showAll-greek-restaurants').hide();
	$('#showAll-french-restaurants').hide();
	$('#showAll-mexican-restaurants').hide();
	$('#showAll-chinese-restaurants').hide();

	$('#title-serbian').hide();
	$('#title-italian').hide();
	$('#title-greek').hide();
	$('#title-french').hide();
	$('#title-mexican').hide();
	$('#title-chinese').hide();
}

function showRecivedOption() {
	var option = window.location.search;
	var parseOpt = option.split("=");
	var restType = parseOpt[1];

	if(restType == "serbia") {
		
		$('#title-serbian').delay(250).fadeIn(250);
		$("#showAll-serbian-restaurants").delay(250).fadeIn(250);
		showSerbianFoodRestaurants();

	} else if (restType == "italy") {
		
		$('#title-italian').delay(250).fadeIn(250);
		$("#showAll-italian-restaurants").delay(250).fadeIn(250);
		showItalianRestaurants();

	} else if (restType == "greece") {
		
		$('#title-greek').delay(250).fadeIn(250);
		$("#showAll-greek-restaurants").delay(250).fadeIn(250);
		showGreekRestaurants();

	} else if (restType == "france") {
		
		$('#title-french').delay(250).fadeIn(250);
		$("#showAll-french-restaurants").delay(250).fadeIn(250);
		showFrenchRestaurants();

	} else if (restType == "mexico") {
		
		$('#title-mexican').delay(250).fadeIn(250);
		$("#showAll-mexican-restaurants").delay(250).fadeIn(250);
		showMexicanRestaurants();

	} else if (restType == "china") {
		
		$('#title-chinese').delay(250).fadeIn(250);
		$("#showAll-chinese-restaurants").delay(250).fadeIn(250);
		showChineseRestaurants();
	}
}

function checkUserKind() {
	$.ajax({
		url : "rest/user/loginstat"
	}).then(function(user) {

		$('td:nth-child(6),th:nth-child(6)').hide();
		$('td:nth-child(7),th:nth-child(7)').hide();

		if (user != undefined) {
			if (user.uloga == "kupac") {
				$('td:nth-child(6),th:nth-child(6)').show();
				$('td:nth-child(7),th:nth-child(7)').show();
			}
		}
	});
}

function checkUserKindFavourite(buttonId) {
	$.ajax({
		url : "rest/user/loginstat"
	}).then(function(user) {

		$('#' + buttonId ).hide();

		if (user != undefined) {
			if (user.uloga == "kupac") {
				$('#' + buttonId ).show();
			}
		}
	});
}