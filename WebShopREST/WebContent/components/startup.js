Vue.component("startup", {
	data: function () {
		    return {
		      title: "Start",
		      //value: "Start",
		    }
	},
	template: ` 
<div>
	<p>Dobrodosli</p>
</div>		  
    	`,
    /*methods: {
    	checkUser : function() {
			axios.post('rest/login', this.user).
				then(response => (router.push(`/pocetna`)));
    	}
    }*/
});