Vue.component("startup", {
	data: function () {
		    return {
		      title: "Start",
		      facilities: null
		    }
	},
	template: ` 
<div>
	<h1>Sportski objekti u našoj ponudi</h1>
	<div v-for="facility in facilities" class="facility_div" v-bind:style="{ background: 'url(' + facility.imageURI + ')' }"> 
		<p>{{facility.name}}</p><br>
		<p>{{facility.rating}}</p>
	</div>
</div>		  
    	`,
    mounted() {
		axios.get('rest/facilities/allFacilities')
			.then(response => (this.facilities = response.data))
	},
    /*methods: {
    	checkUser : function() {
			axios.post('rest/login', this.user).
				then(response => (router.push(`/pocetna`)));
    	}
    }*/
});