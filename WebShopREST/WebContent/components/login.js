Vue.component("login", {
	data: function () {
		    return {
		      title: "Login",
		      value: "Login",
		      user: { username:null, password:null},
		      error: '',
		    }
	},
	template: ` 
<div>
	<body class="background">
	<form>
		<table style="position:relative;left:150px;top:190px" class="loginTable">
			<tr><td><input type="text" placeholder="Username" v-model="user.username" class="inputFields"></td></tr>
			<tr><td><input type="password" placeholder="Password" v-model="user.password" class="inputFields"></td></tr>
			<tr><td><button value="Login" text="Login" v-on:click="checkUser" class="loginButton">Login</button>
			<p>Don't have account?  <a v-on:click ="Register"><u><span style="cursor:pointer">Register here</span></u></a></p>
			<p id="error">{{error}}</p></td></tr>
		</table>
	</form>
	</body>
</div>		  
    	`,
    methods: {
    	checkUser : function(event) {
			event.preventDefault();
			axios.post('rest/login/', this.user)
				.then(response => window.location.href = 'loggedUserIndex.html')
				.catch(this.error = 'Wrong password/username',
				event.preventDefault());
    	},
    	Register : function(){
			router.push(`/register`);
		}
    }
});