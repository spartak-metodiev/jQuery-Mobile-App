$( document ).one( 'pageinit', function(){

	showRuns();

	$( '#submitAdd' ).on( 'tap', addRun );

	$( '#submitEdit' ).on( 'tap', editRun );

	$( '#stats' ).on( 'tap', '#deleteLink', deleteRun );

	$( '#stats' ).on( 'tap', '#editLink', setCurrent );

	$( '#clearRuns' ).on( 'tap', clearRuns );



		//show all runs

		function showRuns(){
			var runs = getRunsObject();

			if( runs != ''  && runs != 0){
				for( var i = 0; i < runs.length; i++ ){
					$( '#stats' ).append( '<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>' + runs[ i ][ "date" ] +
						'<br/><strong>Distance:</strong>' + runs[ i ][ "miles" ] + 'm<div class="controls">' +
						 '<a href="#edit" id="editLink" data-miles="'+runs[ i ][ "miles" ]+'" data-date="'+runs[ i ][ "date" ]+
						 '">Edit</a> | <a href="#" id="deleteLink" data-miles="'+runs[ i ][ "miles" ]+'" data-date="'+runs[ i ][ "date" ]+
						 '" onclick="return confirm(\'Are you sure?\')">Delete</a></div></li>' );

				}

				$( '#home' ).bind( 'pageinit', function(){
					$( '#stats' ).listview( 'refresh' );
				} );

			}else{
				localStorage.removeItem( 'runs' );
			$( '#stats' ).html( '<p>You have no loged runs</p>' );

			}
		}



		//add a run
	function addRun(){
		var miles = $( '#addMiles' ).val();
		var date = $( '#addDate' ).val();

		// create run object
		var run = {
			date: date,
			miles: parseFloat( miles )
		};

		var runs = getRunsObject();

		//add run to runs Array
		runs.push( run );

		alert( 'Runs Added' );

		localStorage.setItem( 'runs', JSON.stringify( runs ) );

		window.location.href="index.html";

		return false;
	}


	function editRun(){

		//get current dates
		currentMiles = localStorage.getItem( 'currentMiles' );
		currentDate = localStorage.getItem( 'currentDate' );

		var runs = getRunsObject();

		//loop trough runs

		for( var i = 0; i < runs.length; i++ ){
			if( runs[ i ].miles == currentMiles && runs[ i ].date == currentDate ){
				runs.splice( i, 1 );
			}

			localStorage.setItem( 'runs', JSON.stringify( runs ) );


		}
		var miles = $( '#editMiles' ).val();
		var date = $( '#editDate' ).val();

		// create run object
		var update_run = {
			date: date,
			miles: parseFloat( miles )
		};

		runs.push(  update_run);


		alert( 'Run Updated' );

		localStorage.setItem( 'runs', JSON.stringify( runs ) );

		window.location.href="index.html";

		return false;


	}


	function clearRuns(){
		localStorage.removeItem( 'runs' );
		$( '#stats' ).html( '<p>You have no loged runs</p>' );
	}

		//Delete run

		function deleteRun(){

		localStorage.setItem( 'currentMiles', $( this ).data(  'miles' ) );
		localStorage.setItem( 'currentDate', $( this ).data(  'date' ) );

		//get current dates
		currentMiles = localStorage.getItem( 'currentMiles' );
		currentDate = localStorage.getItem( 'currentDate' );

		var runs = getRunsObject();

		//loop trough runs

		for( var i = 0; i < runs.length; i++ ){
			if( runs[ i ].miles == currentMiles && runs[ i ].date == currentDate ){
				runs.splice( i, 1 );
			}

			localStorage.setItem( 'runs', JSON.stringify( runs ) );


		}

	

		alert( 'Run Deleted' );

		window.location.href="index.html";

		return false;
	}


	


		//get runs object

	function getRunsObject(){

		var runs = new Array();

		// get current runs from local storage
		var currentRuns = localStorage.getItem( 'runs' );

		// check local storage

		if( currentRuns != null ){
			var runs = JSON.parse( currentRuns );

		}

		//return runs obj

		return runs.sort( function( a, b ){
			return new Date( b.date ) - new Date( a.date );
		} ); 

	}

	function setCurrent(){
		localStorage.setItem( 'currentMiles', $( this ).data(  'miles' ) );
		localStorage.setItem( 'currentDate', $( this ).data(  'date' ) );

		$( '#editMiles' ).val( localStorage.getItem( 'currentMiles' ) );
		$( '#editDate' ).val( localStorage.getItem( 'currentDate' ) );

	}


} );