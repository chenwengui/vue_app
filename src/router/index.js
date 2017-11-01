import Vue from 'vue'
import VueRouter from 'vue-router'

import wg_goods from '../components/good/goods.vue'
import wg_reviews from '../components/review/reviews.vue'
import wg_owner from '../components/owner/owner.vue'

Vue.use(VueRouter)


var router  = new VueRouter({
	linkActiveClass:'active',
	routes:[{
		path:'/goods',
		component:wg_goods
	},{
		path:'/reviews',
		component:wg_reviews
	},{
		path:'/owner',
		component:wg_owner
	}]
});

export default router;
