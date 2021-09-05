Vue.component("create-users", {	
	data: function () {
	    return {	    	
	    	error:'',
	    	username: '',		    			    	
		    password:'',
		    name:'',
		    surname:'',		    			    	
		    gender:'',
		    date:'',
			errorMessage:'',
			role:''
			
	    }
},
	
template: ` 
	<form class="row g-3" style="background:white">
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
			<button class="btn btn-primary" type="submit" v-on:click="registerUser">Register</button>
		</div>
	</form>
	
`
, 
methods : {
	registerUser : function() {
		toast(" uslo je ovde admine");
		
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
			.post('rest/user/createUser', JSON.stringify(loginParameters),{
		        headers: {
		            'Content-Type': 'application/json',
		        }
		    })
			.then(response => {
				if (response.data == "Username, password i email su obavezna polja.") {
					this.errorMessage="Username, password i email su obavezna polja.";
				} 
				else if (response.data == "Username koji ste uneli vec je zauzet.") {
					this.errorMessage="Username koji ste uneli vec je zauzet.";
				} 
				
				else {						
					window.location.href = "http://localhost:3665/FoodDelivery/home.html#/";				
				}
			})
		
		
		
		
	}, 
	
	signalChange : function()
	{
		this.errorMessage="";
	},
	
}

});