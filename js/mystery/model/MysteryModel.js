// Copyright 2017, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen in 'SIM_NAME'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  var functionBasics = require( 'FUNCTION_BASICS/functionBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysteryChallenges = require( 'FUNCTION_BASICS/mystery/model/MysteryChallenges' );
  var MysteryScene = require( 'FUNCTION_BASICS/mystery/model/MysteryScene' );

  /**
   * @constructor
   */
  function MysteryModel() {
    FBModel.call( this, [
      new MysteryScene( MysteryChallenges.POOL1, { functionsPerChallenge: 1 } ),
      new MysteryScene( MysteryChallenges.POOL2, { functionsPerChallenge: 2 } ),
      new MysteryScene( MysteryChallenges.POOL3, { functionsPerChallenge: 3 } )
    ] );
  }

  functionBasics.register( 'MysteryModel', MysteryModel );

  return inherit( FBModel, MysteryModel );
} );
