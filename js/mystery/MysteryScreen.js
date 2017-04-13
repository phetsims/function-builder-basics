// Copyright 2017, University of Colorado Boulder

/**
 * The 'Mystery' screen in 'SIM_NAME'.
 * This screen differs significantly from the Mystery screen in Function Builder.
 * Instead of numeric cards and functions, this Mystery screen use pattern (image) cards and functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var functionBasics = require( 'FUNCTION_BASICS/functionBasics' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionBackgroundNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysteryModel = require( 'FUNCTION_BASICS/mystery/model/MysteryModel' );
  var MysteryScreenView = require( 'FUNCTION_BASICS/mystery/view/MysteryScreenView' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var mysteryCharacterString = require( 'string!FUNCTION_BUILDER/mysteryCharacter' );
  var screenMysteryString = require( 'string!FUNCTION_BUILDER/screen.mystery' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function MysteryScreen( tandem ) {

    var options = {
      name: screenMysteryString,
      backgroundColorProperty: new Property( FBColors.MYSTERY_SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon(),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new MysteryModel(); },
      function( model ) { return new MysteryScreenView( model ); },
      options );
  }

  functionBasics.register( 'MysteryScreen', MysteryScreen );

  /**
   * Creates the icon for the 'Mystery' screen.
   * @returns {Node}
   */
  function createScreenIcon() {

    var functionNode = new FunctionBackgroundNode( {
      fill: 'white'
    } );

    var textNode = new Text( mysteryCharacterString, {
      font: new FBFont( 80 ),
      fill: 'red',
      maxWidth: 0.5 * functionNode.width,
      maxHeight: 0.95 * functionNode.height,
      center: functionNode.center
    } );

    var iconNode = new Node( { children: [ functionNode, textNode ] } );

    return new ScreenIcon( iconNode, { fill: FBColors.MYSTERY_SCREEN_BACKGROUND } );
  }

  return inherit( Screen, MysteryScreen );
} );