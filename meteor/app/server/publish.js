import {CAdminSettings} from './lib/collections/adminSettings';
import {CAdminSettingsSchema} from './lib/collections/adminSettings';

global.CAdminSettings = CAdminSettings;
Meteor.publish('__cadmin_collection', function (collection, params = {}, find = {}) {
	
	if(!Roles.userIsInRole(this.userId,['admin'])) {
		return this.ready()
	}
	
	let {_id, skip, limit, sort} = params;
	
	let options = {skip: skip || 0, limit: limit|| 10, sort: sort || {}};
	
	
	if(_id) {
		find._id = _id;
	}
	console.log(collection)
	console.log(find)
	console.log(options)
	
	
	return global[collection].find(find,options)
	
})

Meteor.publish('__cadmin_collection_counter', function (collection) {
	
	if(!Roles.userIsInRole(this.userId,['admin'])) {
		return this.ready()
	}
	
  	Counts.publish(this, 'collection-counter', global[collection].find() );
	
})

Meteor.startup(function asd(params) {
	console.log('====+++++====')
	
	
})