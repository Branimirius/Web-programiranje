Vue.component("register-show", {	
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
			
	    }
},
	
template: ` 
	
	<div class="row">
		<div class="col-md-6 col-md-offset-3">
			<div class="panel panel-login">
				<div class="panel-heading">
					<div class="row">
						<div class="col-xs-6">
							<a href="#/" class="active" id="login-form-link" style="padding-left: 150px">Login</a>
						</div>
						<div class="col-xs-6">
							<a href="#/register" id="register-form-link">Register</a>
						</div>
					</div>
					<hr>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-lg-12">
							<div class="form-group">
								<input type="text" name="username" tabindex="1" class="form-control" v-on:change="signalChange" v-model="username" placeholder="Username" value="" required>
							</div>
							<div class="form-group">
								<input type="password" name="password" tabindex="2" class="form-control" v-on:change="signalChange" v-model="password" placeholder="Password" required>
							</div>
							<div class="form-group">
								<input type="text" name="name" tabindex="3" class="form-control" v-on:change="signalChange" v-model="name" placeholder="Name" value="" required>
							</div>
							<div class="form-group">
								<input type="text" name="surname" tabindex="4" class="form-control" v-on:change="signalChange" v-model="surname" placeholder="Surname" value="" required>
							</div>
							<div class="form-group">
								<input type="text" name="date" tabindex="5" class="form-control" v-on:change="signalChange" v-model="date" placeholder="Date" value="" required>
							</div>
							<div class="form-group">
								<input type="text" name="gender" tabindex="6" class="form-control" v-on:change="signalChange" v-model="gender" placeholder="Gender" value="" required>
							</div>
							<div class="form-group" >
								<div class="row">
									<div class="col-sm-6 col-sm-offset-3">
										<p style="color:red;text-transform:none;">{{errorMessage}}</p>
										<button class="submit-login" v-on:click="registerUser"> Registruj se </button>
									</div>
								</div>
							</div>
							
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`
, 
methods : {
	registerUser : function() {
		toast(" uslo je ovde ");
		if(this.username=='' || this.password=='' || this.name=='' || this.surname=='' || this.gender=='' || this.date=='')
		{
			this.errorMessage="Morate popuniti sva polja.";
		}
		else
		{

			let loginParameters = {
				name : this.name,
				surname : this.surname,
				username : this.username,
				password : this.password,
				date : this.date,
				gender : this.gender
		};
		
		axios 
			.post('rest/user/register', JSON.stringify(loginParameters),{
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
					window.location.href = "http://localhost:3665/FoodDelivery/login.html";				
				}
			})
		}
		
		
		
	}, 
	
	signalChange : function()
	{
		this.errorMessage="";
	},
//	getLoggedUser : function(){
//		axios
//          .get('rest/user/loggedUser')
//          .then(response => (this.loggedUser = response.data));
//        
//	}
	
	
}
});