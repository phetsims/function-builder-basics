// Copyright 2017-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Function Builder: Basics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FBQueryParameters from '../../function-builder/js/common/FBQueryParameters.js';
import PatternsScreen from '../../function-builder/js/patterns/PatternsScreen.js';
import TestScreen from '../../function-builder/js/test/TestScreen.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import functionBuilderBasicsStrings from './functionBuilderBasicsStrings.js';
import FBBMysteryScreen from './mystery/FBBMysteryScreen.js';

const options = {
  credits: {
    leadDesign: 'Amanda McGarry',
    softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
    team: 'Amy Hanson, Karina K. R. Hensberry, Ariel Paul, Kathy Perkins, Sam Reid, Beth Stade, David Webb',
    qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Ethan Johnson, Andrea Lin, Ben Roberts, ' +
                      'Maggie Wiseman'
  }
};

simLauncher.launch( () => {

  const screens = [
    new PatternsScreen( Tandem.ROOT.createTandem( 'patternsScreen' ) ),
    new FBBMysteryScreen( Tandem.ROOT.createTandem( 'mysteryScreen' ) )
  ];

  if ( FBQueryParameters.testScreen ) {
    screens.push( new TestScreen() );
  }

  const sim = new Sim( functionBuilderBasicsStrings[ 'function-builder-basics' ].title, screens, options );
  sim.start();
} );