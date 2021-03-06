// Copyright 2017-2021, University of Colorado Boulder

/**
 * Main entry point for the 'Function Builder: Basics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import FBConstants from '../../function-builder/js/common/FBConstants.js';
import FBQueryParameters from '../../function-builder/js/common/FBQueryParameters.js';
import PatternsScreen from '../../function-builder/js/patterns/PatternsScreen.js';
import TestScreen from '../../function-builder/js/test/TestScreen.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import functionBuilderBasicsStrings from './functionBuilderBasicsStrings.js';
import FBBMysteryScreen from './mystery/FBBMysteryScreen.js';

simLauncher.launch( () => {

  const screens = [
    new PatternsScreen( Tandem.ROOT.createTandem( 'patternsScreen' ) ),
    new FBBMysteryScreen( Tandem.ROOT.createTandem( 'mysteryScreen' ) )
  ];

  if ( FBQueryParameters.testScreen ) {
    screens.push( new TestScreen() );
  }

  const sim = new Sim( functionBuilderBasicsStrings[ 'function-builder-basics' ].title, screens, {
    credits: FBConstants.CREDITS
  } );
  sim.start();
} );