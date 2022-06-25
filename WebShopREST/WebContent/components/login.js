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
			<tr><td style="padding-top: 60px;padding-bottom: 17px;padding-left:40px;padding-right:40px"><input type="text" placeholder="Username" v-model="user.username" class="inputFields"></td></tr>
			<tr><td style="padding-bottom: 25px;padding-left:40px;padding-right:40px"><input type="password" placeholder="Password" v-model="user.password" class="inputFields"></td></tr>
			<tr><td style="padding-left:40px;padding-right:40px;padding-bottom: 25px"><button value="LogIn" text="LogIn" v-on:click="checkUser" class="loginButton" style="margin-bottom:5px;width:220px;">Log In</button><br>
			<button value="SignUp" text="SignUp" v-on:click="Register" class="loginButton" style="border-spacing:10px;width:220px;">Sign Up</button>
			<p style="text-align:center;padding-top:5px;margin-bottom:5px">or</p>
			<button value="Guest" text="Guest" v-on:click="GuestUser" class="loginButton" style="width:220px;border-spacing:10px">Enter as guest</button>
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
				.then(response => router.push(`/startpage`))
				.catch(this.error = 'Wrong password/username',
				event.preventDefault());
    	},
    	GuestUser : function(){
			event.preventDefault();
			router.push(`/guestUser`);
			//window.location.href = 'loggedUserIndex.html';
			
		},
    	Register : function(){
			router.push(`/register`);
		}
    }
});