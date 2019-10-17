// Copyright 2017-2019, University of Colorado Boulder

/**
 * ScreenView for the 'Mystery' screen in 'Function Builder: Basics'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBBMysterySceneNode = require( 'FUNCTION_BUILDER_BASICS/mystery/view/FBBMysterySceneNode' );
  const FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  const functionBuilderBasics = require( 'FUNCTION_BUILDER_BASICS/functionBuilderBasics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );

  /**
   * @param {MysteryModel} model
   * @param {Object} [options]
   * @constructor
   */
  function FBBMysteryScreenView( model, options ) {

    options = merge( {
      sceneControlYOffset: 535 // offset of scene control's top from top of screen
    }, options );

    FBScreenView.call( this, model, FBBMysterySceneNode, options );
  }

  functionBuilderBasics.register( 'FBBMysteryScreenView', FBBMysteryScreenView );

  return inherit( FBScreenView, FBBMysteryScreenView );
} );