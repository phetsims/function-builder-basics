// Copyright 2015-2016, University of Colorado Boulder

/**
 * Main entry point for the 'SIM_NAME' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var MysteryScreen = require( 'FUNCTION_BASICS/mystery/MysteryScreen' );
  var PatternsScreen = require( 'FUNCTION_BUILDER/patterns/PatternsScreen' );
  var Property = require( 'AXON/Property' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var TestScreen = require( 'FUNCTION_BUILDER/test/TestScreen' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var functionBasicsTitleString = require( 'string!FUNCTION_BASICS/function-basics.title' );

  // constants
  var tandem = Tandem.createRootTandem();
  var SCREEN_COLOR = '#E1F7FF'; // see issue #12

  var options = {
    credits: {
      leadDesign: 'Amanda McGarry',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Amy Hanson, Karina K. R. Hensberry, Ariel Paul, Kathy Perkins,\nSam Reid, Beth Stade, David Webb',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Andrea Lin, Ben Roberts'
    }
  };

  SimLauncher.launch( function() {

    var screens = [
      new PatternsScreen( tandem.createTandem( 'patternsScreen' ), {
        backgroundColorProperty: new Property( SCREEN_COLOR ),
        homeScreenIcon: FBIconFactory.createPatternsScreenIcon( { fill: SCREEN_COLOR } )
      } ),
      new MysteryScreen( tandem.createTandem( 'mysteryScreen' ) )
    ];

    if ( FBQueryParameters.testScreen ) {
      screens.push( new TestScreen() );
    }

    var sim = new Sim( functionBasicsTitleString, screens, options );
    sim.start();
  } );
} );