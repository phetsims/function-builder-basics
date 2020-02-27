// Copyright 2017-2019, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen in 'Function Builder: Basics'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBBMysteryChallenges = require( 'FUNCTION_BUILDER_BASICS/mystery/model/FBBMysteryChallenges' );
  const FBBMysteryScene = require( 'FUNCTION_BUILDER_BASICS/mystery/model/FBBMysteryScene' );
  const FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  const functionBuilderBasics = require( 'FUNCTION_BUILDER_BASICS/functionBuilderBasics' );

  class FBBMysteryModel extends FBModel {

    constructor() {
      super( [
        new FBBMysteryScene( FBBMysteryChallenges.POOL1, { numberOfSlots: 1 } ),
        new FBBMysteryScene( FBBMysteryChallenges.POOL2, { numberOfSlots: 2 } ),
        new FBBMysteryScene( FBBMysteryChallenges.POOL3, { numberOfSlots: 3 } )
      ] );
    }
  }

  return functionBuilderBasics.register( 'FBBMysteryModel', FBBMysteryModel );
} );
