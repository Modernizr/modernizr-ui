/** @jsx React.DOM */

var ReactTransitionGroup = React.addons.TransitionGroup;

var Cell = React.createClass({
	mixins: [FetchingMixin],
	modelState: ['detect'],
	getDefaultProps: function() {
		return {isCurrent: false};
	},
	getInitialState: function() {
		return {detect: null};
	},
	componentWillMount: function() {
		(this.stateSetter('detect')(this.props.data));
	},
	componentDidMount: function() {
		this.captureDimensions();
	},
	componentDidUpdate: function(oldProps) {
		if(oldProps.windowWidth !== this.props.windowWidth
		|| oldProps.windowHeight !== this.props.windowHeight) {
			this.captureDimensions();
		}
	},
	fetchData: function() {
		// noop — data is set from parent component
		// but fetchData function is required by FetchingMixin
	},
	captureDimensions: function() {
		if(this.props.onCaptureDimensions) {
			var $cell = $(this.getDOMNode());
			this.props.onCaptureDimensions({
				cellWidth: $cell.width(),
				cellHeight: $cell.height()
			});
		}
	},
	handleClick: function() {
		// var shouldBeActive = this.state.detect && !this.state.detect.get('active');
		// this.state.detect.set('active', shouldBeActive);
		if(this.props.onClick) {
			this.props.onClick(this);
		}
	},
	render: function() {
		// TODO — check if these cells are rendering twice each, because of this.state.detect??
		var classes = React.addons.classSet({
			'cell': true,
			'is-active': this.state.detect && this.state.detect.get('active'),
			'is-current': this.props.isCurrent
		});
		return (
			<div className={classes} onClick={this.handleClick}>
				<div className="cell__inner"></div>
				<div className="cell__content">
					{this.state.detect && this.state.detect.get('name')}
				</div>
			</div>
		);
	}
});

var DetailPanel = React.createClass({
	render: function() {
		return (
			<div className="detail-panel" style={{height: this.props.height}}>
				<div className="detail-panel__meta">CSS</div>
				<h1 className="detail-panel__title">{this.props.detect.get('name')}</h1>
				<div className="detail-panel__description">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
					<p>Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
				</div>
			</div>
		);
	}
});

var Grid = React.createClass({
	getDefaultProps: function() {
		return {
			mobileGridBreakpoint: 400,
			headerHeight: null,
			horizontalPadding: 30,
			detailPanelCells: 2,
			features: []
		};
	},
	getInitialState: function() {
		return {
			crosshairPosition: null,
			currentDetect: null,
			cellWidth: null,
			cellHeight: null,
			isOpen: false,
			direction: 'up'
		};
	},
	componentWillMount: function() {
		this.cacheCalculations();
	},
	componentDidMount: function() {
		this.renderLayout();
		this.scrollIntoPosition();

		// TODO — see why we can't use React onKeyPress event
		$(document).on('keyup', this.handleKeyPress);
	},
	componentWillUpdate: function(nextProps, nextState) {
		this.cacheCalculations(nextProps, nextState);
	},
	componentDidUpdate: function(oldProps, oldState) {
		this.renderLayout();
		this.scrollIntoPosition(oldProps, oldState);
	},
	renderLayout: function() {
		var cssObj, gridCssObj;
		if(this.cellsAreMounted()) {
			// Header is seen as required
			if(this.props.headerHeight === null) {
				return false;
			}



			// Mobile
			if(this.props.windowWidth <= this.props.mobileGridBreakpoint) {
				cssObj = {
					top: this.props.headerHeight,
					height: this.maxGridHeight,
					width: ''
				};
				gridCssObj = {
					paddingTop: '',
					paddingBottom: ''
				};
			}
			// Desktop
			else {
				var visibleHeight = this.cellsPerColumn * this.state.cellHeight;
				var difference = this.maxGridHeight - visibleHeight;
				cssObj = {
					height: this.maxGridHeight,
					width: this.cellsPerRow * this.state.cellWidth,
					top: this.props.headerHeight
				};
				gridCssObj = {
					paddingTop: Math.ceil(difference / 2),
					paddingBottom: Math.floor(difference / 2)
				};
			}

			Events.publish('mod/ui/gridDimensionsSet', cssObj);

			$(this.getDOMNode()).css(cssObj);
			$(this.refs.grid.getDOMNode()).css(gridCssObj);

			this.props.onRenderLayout({
				gridWidth: cssObj.width
			});
		}
	},
	cacheCalculations: function(props, state) {
		props = props || this.props;
		state = state || this.state;
		if(this.cellsAreMounted(state)) {
			this.maxGridHeight = props.windowHeight - props.headerHeight;
			this.cellsPerColumn = Math.floor(this.maxGridHeight / state.cellHeight);
			this.cellsPerRow = Math.floor((props.windowWidth - this.props.horizontalPadding * 2) / state.cellWidth) || 1;
			this.totalRows = Math.ceil(props.features.length / this.cellsPerRow);
			this.currentRow = this.getCurrentRow(props, state);
		}
	},
	scrollIntoPosition: function(oldProps, oldState) {
		var scrollTop, currentScrollTop, currentRowOffset, gridHeight;

		if(this.cellsAreMounted()) {
			currentScrollTop = this.refs.grid.getDOMNode().scrollTop;
			currentRowOffset = this.currentRow * this.state.cellHeight;
			gridHeight = this.cellsPerColumn * this.state.cellHeight;

			if(this.state.isOpen) {
				console.log('old was open');
				// Add the height of the detail panel to the row offset
				// if it comes before it in the DOM

				// TODO - why WOULDN'T there be a detail panel? (TransitionGroup issue)
				// if(this.refs.detailPanel) {
					var rowsBeforeDetailPanel = this.refs.detailPanel.props.index / this.cellsPerRow;
					if(rowsBeforeDetailPanel < this.currentRow) {
						currentRowOffset += this.state.cellHeight * this.props.detailPanelCells;
					}
				// }

			}

			console.log('direction', this.state.direction);

			if(this.state.direction === 'down') {
				// debugger;
				// debugger;
				if(this.state.isOpen || currentRowOffset > currentScrollTop + gridHeight) {
					this.refs.grid.getDOMNode().scrollTop = currentRowOffset - gridHeight;
				}
			}
			else if(this.state.direction === 'up') {
				if(this.state.isOpen || currentRowOffset <= currentScrollTop) {
					this.refs.grid.getDOMNode().scrollTop = currentRowOffset - this.state.cellHeight
				}
			}
		}
	},
	getRowFromIndex: function(index) {
		return Math.ceil((index + 1) / this.cellsPerRow);
	},
	handleCellClick: function(cell) {
		var cid = cell.state.detect.cid;
		if(this.state.isOpen && cell.props.isCurrent) {
			this.setState({
				currentDetect: null,
				isOpen: false
			});
		}
		else if(this.state.isOpen) {
			var currentIndex = this.getIndexByCid(this.state.currentDetect);
			var newIndex = this.getIndexByCid(cid);
			var currentRow = this.getRowFromIndex(currentIndex);
			var newRow = this.getRowFromIndex(newIndex);
			if(newRow > currentRow) {
				this.setState({
					direction: 'down',
					currentDetect: cid
				});
			}
			else if(newRow < currentRow) {
				this.setState({
					direction: 'down',
					currentDetect: cid
				});
			}
		}
		else {
			this.setState({
				// isOpen: true,
				currentDetect: cid,
				direction: 'up' // Reset direction
			});
		}
	},
	handleGridScroll: function() {
		if(this.state.currentDetect !== null) {
			this.setState({
				currentDetect: null,
				isOpen: false
			});
		}
	},
	// TODO — move to Detects.js?
	getIndexByCid: function(cid) {
		var index = null;
		if(this.state.currentDetect) {
			this.props.features.forEach(function(feature, i) {
				if(feature.cid === cid) {
					index = i;
					return false;
				}
			}.bind(this));
		}
		return index;
	},
	// TODO — move to Detects.js?
	getCidByIndex: function(index) {
		var cid;
		this.props.features.forEach(function(feature, i) {
			if(i === index) {
				cid = feature.cid;
				return false;
			}
		}.bind(this));
		return cid;
	},

	// TODO - finalise the behaviour of keyboard shortcuts
	moveCrosshair: function(xVel, yVel) {
		var originalIndex;
		var index = originalIndex = this.getIndexByCid(this.state.currentDetect);
		if(index !== null) {
			if(yVel !== 0) index = index + (this.cellsPerRow * yVel);
			if(xVel !== 0) index = index + xVel;
			if((index + 1) > this.props.features.length) {
				index = originalIndex; // TODO - handle velocities > 1
			}
			if(index < 0) {
				index = originalIndex;
			}
		}
		else {
			index = 0;
		}

		// Resolve the direction the user is interacting in
		// TODO - set this in componentWillUpdate instead...



		var direction = this.state.direction;
		if(yVel > 0) direction = 'down';
		else if(yVel < 0) direction = 'up';
		else {
			var originalRow = this.getRowFromIndex(originalIndex);
			var newRow = this.getRowFromIndex(index);
			if(xVel < 0 && originalRow > newRow) {
				direction = 'up';
			}
			else if(xVel > 0 && originalRow < newRow) {
				direction = 'down';
			}
		}

		this.setState({
			currentDetect: this.getCidByIndex(index),
			direction: direction
		});
	},
	handleKeyPress: function(event) {
		event.preventDefault();
		switch(event.which) {
			case 13:
				if(this.state.currentDetect && !this.state.isOpen) {
					this.setState({
						isOpen: true,
						direction: 'up'
					});
				}
			break;
			case 27: // Escape
				this.setState({
					isOpen: false
				});
			break;
			case 37: // Left arrow
				this.moveCrosshair(-1, 0);
			break;
			case 38: // Up arrow
				this.moveCrosshair(0, -1);
			break;
			case 39: // Right arrow
				this.moveCrosshair(1, 0);
			break;
			case 40: // Down arrow
				this.moveCrosshair(0, 1);
			break;
		}
	},
	cellsAreMounted: function(state) {
		state = state || this.state;
		return !!(state.cellWidth && state.cellHeight);
	},
	cacheCellDimensions: function(props) {
		this.setState({
			cellWidth: props.cellWidth,
			cellHeight: props.cellHeight
		});
	},
	getCurrentRow: function(props, state) {
		var key;
		props = props || this.props;
		state = state || this.state;
		if(state.currentDetect) {
			props.features.forEach(function(feature, i) {
				if(state.currentDetect === feature.cid) {
					key = i;
				}
			}.bind(this));
			return Math.ceil((key + 1) / this.cellsPerRow);
		}
	},
	render: function() {
		var detailPanel, isCurrentDetect, row, feature;
		var rowCounter = 1;
		var items = [];
		var itemCounter = 0;
		var featureCounter = 0;
		var detailPanelAdded = false;
		var detailPanelNeeded = false;
		var itemsTotal = this.props.features.length;
		var currentDetect = _.find(this.props.features, function(feature) {
			return feature.cid === this.state.currentDetect
		}.bind(this));

		if(itemsTotal > 0) {

			// Prepare the detail pnael
			if(this.state.isOpen) {
				detailPanel = <DetailPanel
					height={this.state.cellHeight * this.props.detailPanelCells}
					ref="detailPanel"
					index={itemCounter}
					detect={currentDetect}
					key={this.state.currentDetect + '_detail'} />;
				itemsTotal ++;
			}

			// Loop through all 'items' (features + detail panel)
			while(itemCounter < itemsTotal) {

				detailPanelNeeded = false;

				row = this.cellsAreMounted() ? Math.ceil((featureCounter + 1) / this.cellsPerRow) : null;

				if(row > rowCounter && detailPanel && !detailPanelAdded) { // Is new row
					// A cell on the last row is current, so make sure the detail panel is placed previous
					// Or if the user is travelling 'down' the grid
					if((this.currentRow === this.totalRows || this.state.direction === 'down') && row === this.currentRow) {
						detailPanelNeeded = true;
					}
					// Place the detail panel afterwards
					else if((row - 1) === this.currentRow) {
						detailPanelNeeded = true;
					}
				}

				if(detailPanelNeeded) {
					items.push(detailPanel);
					detailPanelAdded = true;
				} else if(feature = this.props.features[featureCounter]) {
					isCurrentDetect = this.state.currentDetect && feature.cid === this.state.currentDetect;
					console.log('is current detect?', isCurrentDetect, feature.cid)
					items.push(
						<Cell
							data={feature}
							key={feature.cid}
							row={row}
							index={itemCounter}
							isCurrent={isCurrentDetect}
							windowWidth={this.props.windowWidth}
							windowHeight={this.props.windowHeight}
							onCaptureDimensions={featureCounter === 0 ? this.cacheCellDimensions : null}
							onClick={this.handleCellClick} />
					);
					featureCounter ++;
				}
				rowCounter = row;
				itemCounter ++;
			}
		}

		var classes = React.addons.classSet({
			'grid-container': true,
			'is-open': this.state.isOpen
		});

		return (
			<div className={classes}>
				<div className="grid" ref="grid" onWheel={this.handleGridScroll}>

						{items}

				</div>
			</div>
		);
	}
});

var FeatureSearch = React.createClass({
	handleChange: function(event) {
		var value = event.target.value;
		Events.publish('mod/ui/searchValueChanged', event.target.value);
	},
	render: function() {
		return (<input className="feature-search" type="text" placeholder="Search browser features" onChange={this.handleChange} />);
	}
});

var SelectionCount = React.createClass({
	render: function() {
		return (
			<span className="selection-count">
				{this.props.count}
			</span>
		);
	}
});

var Header = React.createClass({
	getInitialState: function() {
		return {
			width: 'auto'
		};
	},
	componentDidMount: function() {
		this.props.onMount && this.props.onMount(this);
		Events.subscribe('mod/ui/gridDimensionsSet', function(cssObj) {
			this.setState({
				width: cssObj.width
			})
		}.bind(this));
	},
	render: function() {
		return (
			<div className="header cf" style={{width: this.state.width}}>
				<div className="header__inner">
					<div className="header__left">
						<div className="header__logo">Modernizr</div>
						{this.props.left}
					</div>
					<div className="header__right">
						{this.props.right}
					</div>
				</div>
			</div>
		);
	}
});

var App = React.createClass({
	mixins: [FetchingMixin],
	modelState: ['detects', 'results', 'selection'],
	getInitialState: function() {
		return {
			isSearching: false,
			headerHeight: null
		};
	},
	fetchData: function() {
		Events.publish('mod/ui/appLoaded');
	},
	componentWillMount: function() {
		this.cacheWindowDimensions();
	},
	componentDidMount: function() {
		Events.subscribe('mod/data/detectsFetched', this.stateSetter('detects'));
		Events.subscribe('mod/data/resultsFound', this.stateSetter('results'));
		Events.subscribe('mod/data/selectionChanged', this.stateSetter('selection'));
		Events.subscribe('mod/ui/searchValueChanged', this.resolveSearching);
		this.debouncedResize = _.debounce(this.cacheWindowDimensions, 100);
		$(window).on('resize', this.debouncedResize);
	},
	componentWillUnmount: function() {
		$(window).off('resize', this.debouncedResize);
	},
	cacheWindowDimensions: function() {
		this.setState({
			windowWidth: $(window).width(),
			windowHeight: $(window).height()
		});
	},
	resolveSearching: function(value) {
		this.setState({
			isSearching: !!value
		});
	},
	captureHeaderHeight: function(header) {
		this.setState({
			headerHeight: $(header.getDOMNode()).height()
		});
	},
	handleGridRenderLayout: function(props) {
		// console.log('handle grid layout')
		// this.setState({
			// gridWidth: props.gridWidth
		// });
	},
	render: function() {
		var results = this.state.isSearching ? this.state.results : this.state.detects;
		var selectionCount = this.state.selection ? this.state.selection.length : 0;
		return (
			<div className="outer">
				<Header
					onMount={this.captureHeaderHeight}
					width={this.state.gridWidth}
					left={<FeatureSearch />}
					right={<SelectionCount count={selectionCount} />} />
				<Grid
					onRenderLayout={this.handleGridRenderLayout}
					features={results && results.models || []}
					windowWidth={this.state.windowWidth}
					windowHeight={this.state.windowHeight}
					headerHeight={this.state.headerHeight} />
			</div>
		);
	}
});

React.renderComponent((<App />), document.getElementById('app-container'));
