Vue.component("users", {
	data: function () {
		    return {
		      user: null,
		      users: null
		    }
	},
	template: ` 
        <tbody>
            <div v-for="s in users">            
                <div class="card-content" >
                    <li class="list-group-item">
                        <p>Username: {{ s.username }}</p>
                        <p>Name: {{ s.name }}</p>
                        <p>Surname: {{ s.surname }}</p>
                    </li>
                </div>                                       
            </div>   
        </tbody>	  
`
	, 
	methods : {
		takeOrder : function(order){
			
			axios
	        .post('rest/user/takeOrder',{"id": order.id})
			.then(response => (alert("Order for " + order.restaurant + " awaiting confirmation from manager.")));
		    location.reload();
		}
	},
		    
	mounted () {		
		axios
        .get('rest/user/loggedUser')
        .then(response => (this.user = response.data));
	    
        axios
        .get('rest/user/users')
        .then(response => (this.users = response.data));
        
        
        
        
    }
});