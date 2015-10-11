Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    
	launch: function() {
		console.log('Our first Rally app');
		
		var myStore = Ext.create('Rally.data.wsapi.Store', {
		model: 'User Story',
		autoLoad: true,
		listeners: {
			load: function(myStore, myData, success) {
			console.log('got data', myStore, myData, success);
			var myGrid = Ext.create('Rally.ui.grid.Grid', {
			store: myStore,
			columnCfgs: [
			'FormattedID', 'Name', 'ScheduleState'
			]
			});
			
			console.log('myGrid', myGrid);
			this.add(myGrid);
			console.log('what is this?', this);

			},
			scope: this
		},
		fetch: ['FormattedID', 'Name', 'ScheduleState']
		});
	 
    }
});
