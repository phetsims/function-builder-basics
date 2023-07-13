// Copyright 2017-2023, University of Colorado Boulder

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
import FunctionBuilderBasicsStrings from './FunctionBuilderBasicsStrings.js';
import FBBMysteryScreen from './mystery/FBBMysteryScreen.js';
import { AnyScreen } from '../../joist/js/Screen.js';

simLauncher.launch( () => {

  const titleStringProperty = FunctionBuilderBasicsStrings[ 'function-builder-basics' ].titleStringProperty;

  const screens: AnyScreen[] = [
    new PatternsScreen( Tandem.ROOT.createTandem( 'patternsScreen' ) ),
    new FBBMysteryScreen( Tandem.ROOT.createTandem( 'mysteryScreen' ) )
  ];

  if ( FBQueryParameters.testScreen ) {
    screens.push( new TestScreen() );
  }

  const sim = new Sim( titleStringProperty, screens, {
    credits: FBConstants.CREDITS
  } );
  sim.start();
} );