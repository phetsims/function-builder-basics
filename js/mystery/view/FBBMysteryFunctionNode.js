// Copyright 2017-2019, University of Colorado Boulder

/**
 * Function for the 'Mystery' screen in 'Function Builder: Basics'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilderBasics = require( 'FUNCTION_BUILDER_BASICS/functionBuilderBasics' );
  const ImageFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/ImageFunctionNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const mysteryCharacterString = require( 'string!FUNCTION_BUILDER/mysteryCharacter' );

  /**
   * @param {MathFunction} functionInstance
   * @param {FunctionContainer} container - container in the function carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   * @constructor
   */
  function FBBMysteryFunctionNode( functionInstance, container, builderNode, dragLayer, options ) {

    options = _.extend( {
      size: FBConstants.FUNCTION_SIZE,
      identityVisible: false, // function's identity is not initially visible
      draggable: false, // {boolean} Mystery functions are not draggable
      hiddenFill: 'white' // {Color|string} fill when identity is hidden
    }, options );

    // Node that is displayed when the function's identity is hidden
    assert && assert( !options.hiddenNode );
    options.hiddenNode = new Text( mysteryCharacterString, {
      font: FBConstants.MYSTERY_FUNCTION_FONT,
      maxWidth: 0.35 * options.size.width,
      maxHeight: 0.9 * options.size.height
    } );

    ImageFunctionNode.call( this, functionInstance, container, builderNode, dragLayer, options );

    // @private
    this.hiddenNode = options.hiddenNode;
  }

  functionBuilderBasics.register( 'FBBMysteryFunctionNode', FBBMysteryFunctionNode );

  return inherit( ImageFunctionNode, FBBMysteryFunctionNode, {

    /**
     * Sets the color of the question mark.
     * @param {Color|string} color
     */
    setQuestionMarkColor: function( color ) {
      this.hiddenNode.fill = color;
    }
  } );
} );
