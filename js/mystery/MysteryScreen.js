// Copyright 2017, University of Colorado Boulder

/**
 * The 'Mystery' screen in 'Function Builder: Basics'.
 * This screen differs significantly from the Mystery screen in Function Builder.
 * Instead of numeric cards and functions, this Mystery screen uses pattern (image) cards and functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var functionBuilderBasics = require( 'FUNCTION_BUILDER_BASICS/functionBuilderBasics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysteryModel = require( 'FUNCTION_BUILDER_BASICS/mystery/model/MysteryModel' );
  var MysteryScreenView = require( 'FUNCTION_BUILDER_BASICS/mystery/view/MysteryScreenView' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenMysteryString = require( 'string!FUNCTION_BUILDER/screen.mystery' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function MysteryScreen( tandem ) {

    var options = {
      name: screenMysteryString,
      backgroundColorProperty: new Property( FBColors.MYSTERY_SCREEN_BACKGROUND ),
      homeScreenIcon: FBIconFactory.createMysteryScreenIcon( {
        functionFill: 'white',
        questionMarkFill: 'red'
      } ),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new MysteryModel(); },
      function( model ) { return new MysteryScreenView( model ); },
      options );
  }

  functionBuilderBasics.register( 'MysteryScreen', MysteryScreen );

  return inherit( Screen, MysteryScreen );
} );