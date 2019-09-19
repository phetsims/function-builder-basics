// Copyright 2017, University of Colorado Boulder

/**
 * Main entry point for the 'Function Builder: Basics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBBMysteryScreen = require( 'FUNCTION_BUILDER_BASICS/mystery/FBBMysteryScreen' );
  const FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  const PatternsScreen = require( 'FUNCTION_BUILDER/patterns/PatternsScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );
  const TestScreen = require( 'FUNCTION_BUILDER/test/TestScreen' );

  // strings
  const functionBuilderBasicsTitleString = require( 'string!FUNCTION_BUILDER_BASICS/function-builder-basics.title' );

  // constants
  const tandem = Tandem.rootTandem;

  const options = {
    credits: {
      leadDesign: 'Amanda McGarry',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Amy Hanson, Karina K. R. Hensberry, Ariel Paul, Kathy Perkins, Sam Reid, Beth Stade, David Webb',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Ethan Johnson, Andrea Lin, Ben Roberts, ' +
                        'Maggie Wiseman'
    }
  };

  SimLauncher.launch( function() {

    const screens = [
      new PatternsScreen( tandem.createTandem( 'patternsScreen' ) ),
      new FBBMysteryScreen( tandem.createTandem( 'mysteryScreen' ) )
    ];

    if ( FBQueryParameters.testScreen ) {
      screens.push( new TestScreen() );
    }

    const sim = new Sim( functionBuilderBasicsTitleString, screens, options );
    sim.start();
  } );
} );
