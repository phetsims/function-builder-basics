// Copyright 2017, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen in 'Function Builder: Basics'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBBMysteryChallenges = require( 'FUNCTION_BUILDER_BASICS/mystery/model/FBBMysteryChallenges' );
  var FBBMysteryScene = require( 'FUNCTION_BUILDER_BASICS/mystery/model/FBBMysteryScene' );
  var FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  var functionBuilderBasics = require( 'FUNCTION_BUILDER_BASICS/functionBuilderBasics' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function FBBMysteryModel() {
    FBModel.call( this, [
      new FBBMysteryScene( FBBMysteryChallenges.POOL1, { numberOfSlots: 1 } ),
      new FBBMysteryScene( FBBMysteryChallenges.POOL2, { numberOfSlots: 2 } ),
      new FBBMysteryScene( FBBMysteryChallenges.POOL3, { numberOfSlots: 3 } )
    ] );
  }

  functionBuilderBasics.register( 'FBBMysteryModel', FBBMysteryModel );

  return inherit( FBModel, FBBMysteryModel );
} );
