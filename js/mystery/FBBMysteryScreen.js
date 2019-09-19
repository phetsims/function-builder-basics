// Copyright 2017, University of Colorado Boulder

/**
 * The 'Mystery' screen in 'Function Builder: Basics'.
 * This screen differs significantly from the Mystery screen in Function Builder.
 * Instead of numeric cards and functions, this Mystery screen uses pattern (image) cards and functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBBMysteryModel = require( 'FUNCTION_BUILDER_BASICS/mystery/model/FBBMysteryModel' );
  const FBBMysteryScreenView = require( 'FUNCTION_BUILDER_BASICS/mystery/view/FBBMysteryScreenView' );
  const FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  const FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  const functionBuilderBasics = require( 'FUNCTION_BUILDER_BASICS/functionBuilderBasics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenMysteryString = require( 'string!FUNCTION_BUILDER/screen.mystery' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function FBBMysteryScreen( tandem ) {

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
      function() { return new FBBMysteryModel(); },
      function( model ) { return new FBBMysteryScreenView( model ); },
      options );
  }

  functionBuilderBasics.register( 'FBBMysteryScreen', FBBMysteryScreen );

  return inherit( Screen, FBBMysteryScreen );
} );