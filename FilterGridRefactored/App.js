Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    
	launch: function() {
		console.log('Our second Rally app');
		//this._loadData();
		this.pulldownContainer = Ext.create('Ext.container.Container', {
			id: 'pulldown-container-id',
			layout: {
			type: 'hbox',
			align: 'stretch'
			}
		});
		
		this.add(this.pulldownContainer);

		this._loadIterations();
	},
	
	_loadIterations: function() {
		this.iterComboBox = Ext.create('Rally.ui.combobox.IterationComboBox', {
		fieldLabel: 'Iteration',
		labelAlign: 'right',
		width: 450,
		listeners: {
			scope: this,
			ready: function(combobox) {
				// console.log('ready', combobox);
				this._loadSeverities();
			},
			select: function(combobox, records) {
				// console.log('select', this, combobox, records);
				this._loadData();
			}
		}
		});
		this.pulldownContainer.add(this.iterComboBox);
	},
	
	_loadSeverities: function() {
		this.sevComboBox = Ext.create('Rally.ui.combobox.FieldValueComboBox', {
		model: 'Defect',
		field: 'Severity',			
		fieldLabel: 'Severity',
		labelAlign: 'right',
		listeners: {
			scope: this,
			ready: function(combobox) {
				// console.log('ready', combobox);
				this._loadData();
			},
			select: function(combobox, records) {
				// console.log('select', this, combobox, records);
				this._loadData();
			}
		}
		});
		this.pulldownContainer.add(this.sevComboBox);

	},
	
	_loadData: function() {
		
		var selectedIterRef = this.iterComboBox.getRecord().get('_ref');
		var selectedSevValue = this.sevComboBox.getRecord().get('value');

		console.log('selected iteration', selectedIterRef);
		console.log('selected severity', selectedSevValue);

		var myFilters = [
        {
            property: 'Iteration',
			operator: '=',
            value: selectedIterRef
        },
		{
            property: 'Severity',
			operator: '=',
            value: selectedSevValue
        }
		];
		
		if (this.defectStore) {
			console.log('store exists');
			this.defectStore.setFilter(myFilters);
			this.defectStore.load();
		}
		else { 
			console.log('creating store');
			this.defectStore = Ext.create('Rally.data.wsapi.Store', {
			model: 'Defect',
			autoLoad: true,
			filters: myFilters,
			listeners: {
				load: function(myStore, myData, success) {
				// console.log('got data', myStore, myData, success);
					if (!this.myGrid) {
					this._creategrid(myStore);
				}
			},
			scope: this
		},
		fetch: ['FormattedID', 'Name', 'Severity', 'Iteration']
		});
		}
	},
	
	_creategrid: function(myStoryStore) {
	
		this.myGrid = Ext.create('Rally.ui.grid.Grid', {
		store: myStoryStore,
		columnCfgs: ['FormattedID', 'Name', 'Severity', 'Iteration']
		});
		
		// console.log('myGrid', myGrid);
		this.add(this.myGrid);
		// console.log('what is this?', this);
	}		
});