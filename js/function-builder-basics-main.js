// Copyright 2017, University of Colorado Boulder

/**
 * Main entry point for the 'Function Builder: Basics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var MysteryScreen = require( 'FUNCTION_BUILDER_BASICS/mystery/MysteryScreen' );
  var PatternsScreen = require( 'FUNCTION_BUILDER/patterns/PatternsScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var TestScreen = require( 'FUNCTION_BUILDER/test/TestScreen' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var functionBuilderBasicsTitleString = require( 'string!FUNCTION_BUILDER_BASICS/function-builder-basics.title' );

  // constants
  var tandem = Tandem.createRootTandem();

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
      new PatternsScreen( tandem.createTandem( 'patternsScreen' ) ),
      new MysteryScreen( tandem.createTandem( 'mysteryScreen' ) )
    ];

    if ( FBQueryParameters.testScreen ) {
      screens.push( new TestScreen() );
    }

    var sim = new Sim( functionBuilderBasicsTitleString, screens, options );
    sim.start();
  } );
} );