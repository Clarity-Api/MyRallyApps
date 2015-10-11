Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    
	launch: function() {
		console.log('Our first Rally app');
		this._loadData();
	},
	
	_loadData: function() {
		var myStore = Ext.create('Rally.data.wsapi.Store', {
		model: 'User Story',
		autoLoad: true,
		listeners: {
			load: function(myStore, myData, success) {
				console.log('got data', myStore, myData, success);
				this._loadgrid(myStore);
			},
			scope: this
		},
		fetch: ['FormattedID', 'Name', 'ScheduleState']
		});
	},
	
	_loadgrid: function(myStoryStore) {
	
		var myGrid = Ext.create('Rally.ui.grid.Grid', {
		store: myStoryStore,
		columnCfgs: ['FormattedID', 'Name', 'ScheduleState']
		});
		
		console.log('myGrid', myGrid);
		this.add(myGrid);
		console.log('what is this?', this);
	}		
});