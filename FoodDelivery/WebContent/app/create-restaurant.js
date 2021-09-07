Vue.component("create-restaurant", {	
	data: function () {
	    return {	    	
	    	geoLength: 0,
			geoWidth: 0,
		    adress: '',
	        zipCode: '',
			city: '',
			number: '',
			hide: false,
			managers: null
			
	    }
},
	
template: ` 
	<form class="row g-3" style="background:white" v-if="!hide">
			<div class="col-md-6">
				<label for="validationServer01" class="form-label">geoLength</label>
				<input type="text" class="form-control is-valid" id="geoLength" value="" required>
			</div>
			<div class="col-md-6">
				<label for="validationServer02" class="form-label">geoWidth</label>
				<input type="text" class="form-control is-valid"  id="geoWidth" value="" required>
			</div>
			<div class="col-md-6">
				<label for="validationServerUsername" class="form-label">City</label>
				<input type="text" class="form-control is-invalid" id="city" value="" required>
			</div>
			<div class="col-md-6">
				<label for="validationServer05" class="form-label">Adress</label>
				<input type="text" class="form-control is-invalid"  id="adress" value="" required>
			</div>
			<div class="col-md-3">
				<label for="validationServer02" class="form-label">ZipCode</label>
				<input type="text" class="form-control is-valid"  id="zipCode" value="" required>
			</div>
			<div class="col-md-3">
				<label for="validationServer05" class="form-label">House number</label>
				<input type="text" class="form-control is-invalid"  id="number" value="" required>
			</div>
			<select class="form-select" aria-label="Default select example">
				<option selected>Menagers</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
			</select>
			<div class="col-12">
				<button class="btn btn-primary" type="button" v-on:click="registerRestaurant">Register</button>
			</div>
			<div id="js-map" style="height: 400px; width: 100%;"></div>
			</div>
		</div>
	</form>
	<form class="row g-3" style="background:white" v-if="hide">
		<div class="col-md-6">
			<label for="validationServer01" class="form-label">Name</label>
			<input type="text" class="form-control is-valid" v-model="name" id="validationServer01" required>
		</div>
		<div class="col-md-6">
			<label for="validationServer02" class="form-label">Surname</label>
			<input type="text" class="form-control is-valid" v-model="surname" id="validationServer02" required>
		</div>
		<div class="col-md-6">
			<label for="validationServerUsername" class="form-label">Username</label>
			<div class="input-group has-validation">
				<span class="input-group-text" id="inputGroupPrepend3">@</span>
				<input type="text" class="form-control is-invalid" v-model="username" id="validationServerUsername" required>
			</div>
		</div>
		<div class="col-md-6">
			<label for="validationServer05" class="form-label">Password</label>
			<input type="password" class="form-control is-invalid" v-model="password" id="validationServer05" required>
		</div>
		<div class="col-md-3">
			<label for="validationServer02" class="form-label">Gender</label>
			<input type="text" class="form-control is-valid" v-model="gender" id="validationServer03" required>
		</div>
		<div class="col-md-3">
			<label for="validationServer05" class="form-label">Date</label>
			<input type="text" class="form-control is-invalid" v-model="date" id="validationServer05" required>
		</div>
		<div class="col-md-6">
			<label for="validationServer05" class="form-label">Role</label>
			<div class="form-check">
				<input class="form-check-input" type="radio" v-model="role" name="flexRadioDefault" value="manager" id="flexRadioDefault1" checked>
				<label class="form-check-label" for="flexRadioDefault1">
					Menager
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="radio" v-model="role" name="flexRadioDefault" value="deliveryGuy" id="flexRadioDefault2">
				<label class="form-check-label" for="flexRadioDefault2">
					Delivery guy
				</label>
			</div>
		</div>
		<div class="col-12">
			<button class="btn btn-primary" type="button" v-on:click="registerUser">Register</button>
		</div>
	</form>
	
	
`
, 
methods : {
	registerRestaurant : function() {
		
		this.geoLength = document.getElementById("geoLength").value;
		this.geoWidth = document.getElementById("geoWidth").value;
		this.city = document.getElementById("city").value;
		this.adress = document.getElementById("adress").value;
		this.number = document.getElementById("number").value;
		this.zipCode = document.getElementById("zipCode").value;
		
		let parameters = {
			
		};

		axios 
			.post('rest/restaurant/createRestaurant', parameters,{
		        headers: {
		            'Content-Type': 'application/json',
		        }
		    })
	}, 

	registerUser : function() {
		
		let loginParameters = {
			name : this.name,
			surname : this.surname,
			username : this.username,
			password : this.password,
			date : this.date,
			gender : this.gender,
			role : this.role
		};
				
		axios 
			.post('rest/user/createUser', loginParameters,{
		        headers: {
		            'Content-Type': 'application/json',
		        }
		    })
		this.hide = false;
	}, 

	saveLocation(){
		this.geoLength = document.getElementById("geoLength").value;
		this.geoWidth = document.getElementById("geoWidth").value;
		this.city = document.getElementById("city").value;
		this.adress = document.getElementById("adress").value;
		this.number = document.getElementById("number").value;
		this.zipCode = document.getElementById("zipCode").value;

		document.getElementById("geoLength").value = this.geoLength;
		document.getElementById("geoWidth").value = this.geoWidth;
		document.getElementById("city").value = this.city;
		document.getElementById("adress").value = this.adress;
		document.getElementById("number").value = this.number;
		document.getElementById("zipCode").value = this.zipCode;
	}
	
},

mounted () {		
	axios
        .get('rest/user/getManagers')
        .then(response => (this.managers = response.data));
	setTimeout(init, 50);
}

});

function init(){
	const map = new ol.Map({
		view: new ol.View({
			center: [2208254.0327390945,5661276.834908611],
			zoom: 15
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		target: 'js-map'
	})
	var previousLayer = null;
	map.on('click', function(e){
		if(previousLayer!=null) {map.removeLayer(previousLayer)}
		var latLong = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
		console.log(latLong);
		this.geoLength = latLong[0]
		this.geoWidth = latLong[1]
		
		var layer = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [
					new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.fromLonLat(latLong))
					})
				]
			})
		});	
		previousLayer = layer;
		map.addLayer(layer);
		simpleReverseGeocoding(this.geoLength, this.geoWidth)
	})
}

function simpleReverseGeocoding(lon, lat) {
	fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
	  	return response.json();
	}).then(function(json) {
		writeAdress(json, lon, lat);
	})
  }

function writeAdress(json, lon, lat) {
	var adress = json.address;
	document.getElementById("geoLength").value = lon;
	document.getElementById("geoWidth").value = lat;
	var city = adress.city
	if(city.includes("City")){
		city = city.replace(' City', "")
	}else if(city.includes("Municipality")){
		city = city.replace(' Municipality', "")
	}
	document.getElementById("city").value = city;
	document.getElementById("adress").value = adress.road;
	document.getElementById("number").value = adress.house_number;
	document.getElementById("zipCode").value = adress.postcode;
}