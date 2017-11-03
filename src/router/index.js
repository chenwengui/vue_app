import Vue from 'vue'
import VueRouter from 'vue-router'

import wg_home from '../components/home/home.vue'
import wg_discovery from '../components/discovery/discovery.vue'
import wg_orders from '../components/orders/orders.vue'
import wg_my from '../components/my/my.vue'

import wg_goods from '../components/good/goods.vue'
import wg_reviews from '../components/review/reviews.vue'
import wg_owner from '../components/owner/owner.vue'

Vue.use(VueRouter)


var router  = new VueRouter({
	linkActiveClass:'active',
	routes:[{
		path:'/',
		component:wg_home,
		children:[{
			path:'goods',
			component:wg_goods
		},{
			path:'reviews',
			component:wg_reviews
		},{
			path:'owner',
			component:wg_owner
		}]
	},{
		path:'/discovery',
		component:wg_discovery
	},{
		path:'/orders',
		component:wg_orders
	},{
		path:'/my',
		component:wg_my
	}]
});

export default router;
