Vue.component("log-in", {	
	data: function () {
		    return {
		    	loggedUser : null,
		    	logged : null,
		    	error:'',
		    	username: '',		    			    	
			    password:'',
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
								<div class="form-group" >
									<div class="row">
										<div class="col-sm-6 col-sm-offset-3">
											<p style="color:red;text-transform:none;">{{errorMessage}}</p>
											<button class="submit-login" v-on:click="tryToLogin"> Prijavi se </button>
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
		tryToLogin : function() {
			toast(" uslo je ovde ");
			if(this.username=='' || this.password=='')
			{
				this.errorMessage="Morate popuniti sva polja.";
			}
			else
			{

				let loginParameters = {
    				username : this.username,
    				password : this.password
    		};
    		
    		axios 
    			.post('rest/user/login', JSON.stringify(loginParameters),{
    		        headers: {
    		            'Content-Type': 'application/json',
    		        }
    		    })
    			.then(response => {
    				if (response.data == "Pogresan password!") {
						this.errorMessage="Neispravno korisničko ime ili lozinka.";
					} 
					else if (response.data == "Logovanje nije uspesno!") {
						this.errorMessage="Ne znam sto.";
					} 
					
					else {						
						window.location.href = "http://localhost:3665/FoodDelivery/home.html";				
					}
				})
			}
			
    		
    		
    	}, 
    	registerUser : function() {
			let flag=true;
			
			if(this.nameRegister=="" ||this.surnameRegister=="" ||this.usernameRegister=="" ||this.passwordRegister=="" || this.genderRegister=="")
			{
				registrationError="Morate popuniti sva polja u formi.";
				flag=false;
			}
			else if(this.passwordRegister!=this.passwordRepeat)
			{
				registrationError="Lozinke se ne slažu.";
				flag=false;
			}
			if(flag)
			{
				let genderReg;
				if (this.genderRegister == 'Musko') {
					genderReg = 'Male';
				} else if(this.genderRegister == 'Zensko'){
					genderReg = 'Female';
				} else {
					genderReg = 'Other';
				}
				this.roleRegister = "Guest";
				let registrationParameters = {
    				name : this.nameRegister,
    				surname : this.surnameRegister,
    				username : this.usernameRegister,
    				password : this.passwordRegister,
    				role : this.roleRegister,
    				gender : genderReg
    		};

    		axios 
    			.post('/user/register', JSON.stringify(registrationParameters))
    			.then(response => {
    				if (response.data == null) {
    					window.location.href = "#/login";
    				} else {
						window.location.href = "http://localhost:8088";
    				}
    			})
			}
    		
		},
		signalChange : function()
		{
			this.errorMessage="";
		},
//		getLoggedUser : function(){
//			axios
//	          .get('rest/user/loggedUser')
//	          .then(response => (this.loggedUser = response.data));
//	        
//		}
		
		
    }
});