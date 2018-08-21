Vue.component('paginated-list',{
	  data(){
	    return {
	      pageNumber: 0
	    }
	  },
	  props:{
	    listData:{
	      type:Array,
	      required:true
	    },
	    size:{
	      type:Number,
	      required:false,
	      default: 1
	    }
	  },
	  methods:{
	      nextPage(){
	         this.pageNumber++;
	      },
	      prevPage(){
	        this.pageNumber--;
	      },
	      getHotelUrl (hotelNombre) {
				return `/<?= $url1 ?>/hoteles/${hotelNombre.replace(/ /g, '_').toLowerCase()}`
			}
	  },
	  computed:{
	    pageCount(){
	      let l = this.listData.length,
	          s = this.size;
	      return Math.floor(l/s);
	    },
	    paginatedData(){
	      const start = this.pageNumber * this.size,
	            end = start + this.size;
	      return this.listData
	               .slice(start, end);
	    }
	  },
	  template: `<div>
	  				<ul>
	  				<li class="lista-hotel-card" v-for="(hotel, index) in paginatedData">
						<arpen-carousel :size="'small'" :images="hotel.fotos"></arpen-carousel>
						<div v-cloak>
							<p>Piso en {{ hotel.calle }} {{ hotel.numero }}</p>
							<p>{{ hotel.precio_noche }}&euro;/mes</p>
							<div class="servicios-resumidos">
								<template v-for="(servicio, index) in hotel.servicios">
									<p v-if="index === hotel.servicios.length - 1">{{ servicio }}</p>
									<p v-else>{{ servicio }}<span class="servicios-separator">/</span> </p>
								</template>
							</div>
							<a class="hotel-ver-mas" :href="getHotelUrl(hotel.nombre)"><?php echo $txt['usuario-tabs-hosting-ver-mas-button-txt'] ?></a>
						</div>
					</li>
					</ul>
	              <button 
	                  :disabled="pageNumber === 0" 
	                  @click="prevPage">
	                  Previous
	              </button>
	              <button 
	                  :disabled="pageNumber >= pageCount -1" 
	                  @click="nextPage">
	                  Next
	              </button>
	             </div>
	  `
	});