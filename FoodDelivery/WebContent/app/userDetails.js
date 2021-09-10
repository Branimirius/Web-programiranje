Vue.component("user-details", {
	props:['id'],
	data: function () {
		    return {
		      users: this.$root.$data.user,
		      username: this.$route.params.id
		    }
	},
		
	template: ` 
        <div v-for="s in users">
            <div class="container emp-profile" v-if="s.username == username">
                <form>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img">
                                <img v-bind:src="user.imagePath" alt=""/>
                                <div class="file btn btn-lg btn-primary">
                                    Change Photo
                                    <input type="file" accept=".jpg, .jpeg, .png" name="file"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="profile-head">
                                        <h5>
                                            {{ user.name }}
                                        </h5>
                                        <h6>
                                            {{ user.role }}
                                        </h6>
                                        <p class="proile-rating">RANKINGS : <span> {{ user.type.name }} </span></p>
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#/profile" role="tab" aria-controls="profile" aria-selected="true">About</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#/customer-orders" role="tab" aria-controls="customer-orders" aria-selected="false">Orders</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button class="profile-edit-btn" name="btnAddMore" value="Edit"/>
                        </div>
                    </div>
                    <div class="row">
                        
                        <div class="col-md-8">
                            <div class="tab-content profile-tab" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Id</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{{ user.username }}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Ime</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{{ user.name }} {{ user.surname }}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Datum rodjenja</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{{ user.dateOfBirth }}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Pol</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{{ user.gender }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>           
            </div>
        </div>	  
		
	
	
`
	, 
	
	mounted () {
        axios
            .get('rest/user/users')
            .then(response => (this.users = response.data))
    }
});