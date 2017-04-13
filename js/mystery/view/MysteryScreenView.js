// Copyright 2017, University of Colorado Boulder

/**
 * ScreenView for the 'Mystery' screen in 'Function Builder: Basics'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  var functionBasics = require( 'FUNCTION_BASICS/functionBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysterySceneNode = require( 'FUNCTION_BASICS/mystery/view/MysterySceneNode' );

  /**
   * @param {MysteryModel} model
   * @param {Object} [options]
   * @constructor
   */
  function MysteryScreenView( model, options ) {

    options = _.extend( {
      sceneControlYOffset: 535 // offset of scene control's top from top of screen
    }, options );

    FBScreenView.call( this, model, MysterySceneNode, options );
  }

  functionBasics.register( 'MysteryScreenView', MysteryScreenView );

  return inherit( FBScreenView, MysteryScreenView );
} );