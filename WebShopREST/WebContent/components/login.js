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
			<tr><td><button value="LogIn" text="LogIn" v-on:click="checkUser" class="loginButton" style="margin-bottom:5px;">Log In</button><br>
			<button value="SignUp" text="SignUp" v-on:click="Register" class="loginButton" style="border-spacing:5em;">Sign Up</button>
			<p style="text-align:center">or</p>
			<button value="Guest" text="Guest" v-on:click="GuestUser" class="loginButton">Enter as guest</button>
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
    	GuestUser : function(){
			//event.preventDefault();
			router.push(`/startup`);
		},
    	Register : function(){
			router.push(`/register`);
		}
    }
});