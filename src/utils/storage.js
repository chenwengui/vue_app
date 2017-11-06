var prefix = 'wg_app_ppx_';

export default{
	//session
	setSstorage(key,val){
		sessionStorage.setItem(prefix+key,JSON.stringify(val));
	},
	getSstorage(key){
		return JSON.parse(sessionStorage.getItem(prefix+key));
	},
	removeSstorage(key){
		sessionStorage.removeItem(prefix+key);
	},
	//local
	setLstorage(key,val){
		localStorage.setItem(prefix+key,JSON.stringify(val));
	},
	getLstorage(key){
		return JSON.parse(localStorage.getItem(prefix+key));
	},
	removeLstorage(key){
		localStorage.removeItem(prefix+key);
	}
}
