// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for the 'Mystery' screen in 'Function Builder: Basics'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBBMysterySceneNode = require( 'FUNCTION_BUILDER_BASICS/mystery/view/FBBMysterySceneNode' );
  var FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  var functionBuilderBasics = require( 'FUNCTION_BUILDER_BASICS/functionBuilderBasics' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {MysteryModel} model
   * @param {Object} [options]
   * @constructor
   */
  function FBBMysteryScreenView( model, options ) {

    options = _.extend( {
      sceneControlYOffset: 535 // offset of scene control's top from top of screen
    }, options );

    FBScreenView.call( this, model, FBBMysterySceneNode, options );
  }

  functionBuilderBasics.register( 'FBBMysteryScreenView', FBBMysteryScreenView );

  return inherit( FBScreenView, FBBMysteryScreenView );
} );