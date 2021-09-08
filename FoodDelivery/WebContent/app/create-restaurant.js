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
			username: '',		    			    	
		    password:'',
		    name:'',
		    surname:'',		    			    	
		    gender:'',
		    date:'',
			role:'',
			managers: [],
			manager: '',
			logo: '',
			id: '',
			type: ''
			
	    }
},
	
template: ` 
	<form class="row g-3" style="background:white" name="form1">
		<template v-if="!hide">
			<div class="col-md-6">
				<label for="validationServer01" class="form-label">Name:</label>
				<input type="text" id="name" class="form-control is-valid" value="" required>
			</div>
			<div class="col-md-6">
				<label for="validationServer01" class="form-label">Menager:</label>
				<div class="input-group mb-3">
					<select id="manager" class="form select form-select-lg" aria-label="Default select example">
						<option v-for="m in managers">@{{ m.username }}</option>
					</select>
					<button class="btn btn-outline-secondary" type="button" v-on:click="registerManager">Add manager</button>
				</div>
			</div>
			<div class="col-6">
				<label for="formFile" class="form-label">Logo:</label>
				<input class="form-control" type="file" id="formFile" name="formFile">
			</div>
			<div class="col-6">
				<label for="type" class="form-label">Type:</label>
				<input class="form-control" type="text" id="type">
			</div>
			<div class="col-md-6">
				<label for="validationServer01" class="form-label">Geographical length:</label>
				<input type="text" class="form-control is-valid" id="geoLength" value="" required>
			</div>
			<div class="col-md-6">
				<label for="validationServer02" class="form-label">Geographical width:</label>
				<input type="text" class="form-control is-valid"  id="geoWidth" value="" required>
			</div>
			<div class="col-md-6">
				<label for="validationServerUsername" class="form-label">City:</label>
				<input type="text" class="form-control is-invalid" id="city" value="" required>
			</div>
			<div class="col-md-6">
				<label for="validationServer05" class="form-label">Adress:</label>
				<input type="text" class="form-control is-invalid"  id="adress" value="" required>
			</div>
			<div class="col-md-3">
				<label for="validationServer02" class="form-label">ZipCode:</label>
				<input type="text" class="form-control is-valid"  id="zipCode" value="" required>
			</div>
			<div class="col-md-3">
				<label for="validationServer05" class="form-label">House number:</label>
				<input type="text" class="form-control is-invalid"  id="number" value="" required>
			</div>
			<div class="col-md-3">
				<label for="validationServer05" class="form-label">ID:</label>
				<input type="text" class="form-control is-invalid"  id="id" value="" required>
			</div>
			<div class="col-md-3">
				<label for="validationServer05" class="form-label">Finish:</label>
				<button class="btn btn-primary" type="button" v-on:click="registerRestaurant">Register</button>
			</div>
		</template>
		<template v-else>
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
				<label for="ddd" class="form-label">Password</label>
				<input type="password" class="form-control is-invalid" v-model="password" id="ddd" required>
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
				<label class="form-label">Role</label>
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
		</template>
		<div class="col-md-12">
				<label for="validationServer05" class="form-label">Map:</label>
				<div id="js-map" style="height: 400px; width: 100%;"></div>
				</div>
		</div>
	</form>
	
	
`
, 
methods : {
	registerRestaurant() {
		
		this.geoLength = document.getElementById("geoLength").value;
		this.geoWidth = document.getElementById("geoWidth").value;
		this.city = document.getElementById("city").value;
		this.adress = document.getElementById("adress").value;
		this.number = document.getElementById("number").value;
		this.zipCode = document.getElementById("zipCode").value;
		this.name = document.getElementById("name").value;
		this.id = document.getElementById("id").value;
		this.type = document.getElementById("type").value;
		this.manager = document.getElementById("manager").value;
		var file = document.forms['form1']['formFile'].files[0];

		let parameters = {
			geoLength : this.geoLength,
			geoWidth : this.geoWidth,
			city : this.city,
			adress : this.adress,
			number : this.number,
			zipCode : this.zipCode,
			manager : this.manager,
			name : this.name,
			id: this.id,
			type: this.type,
			logo: file.name
		};

		axios 
			.post('rest/restaurants/createRestaurant', parameters,{
		        headers: {
		            'Content-Type': 'application/json',
		        }
		    })
		window.location.href = "http://localhost:3665/FoodDelivery/home.html#/create-restaurant";
	}, 

	registerUser() {
		
		let loginParameters = {
			name : this.name,
			surname : this.surname,
			username : this.username,
			password : this.password,
			date : this.date,
			gender : this.gender,
			role : this.role,
			free : false
		};
				
		axios 
			.post('rest/user/createUser', loginParameters,{
		        headers: {
		            'Content-Type': 'application/json',
		        }
		    })
			.then(response =>{
				this.managers = [];
				response.data.forEach(el => {
					this.managers.push(el);
				});
				return this.managers;
			})
		this.hide = false;
	}, 

	registerManager() {
		
		this.hide = true;
	}, 
	
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