// Copyright 2017-2019, University of Colorado Boulder

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
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenMysteryString = require( 'string!FUNCTION_BUILDER/screen.mystery' );

  class FBBMysteryScreen extends Screen {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      const options = {
        name: screenMysteryString,
        backgroundColorProperty: new Property( FBColors.MYSTERY_SCREEN_BACKGROUND ),
        homeScreenIcon: FBIconFactory.createMysteryScreenIcon( {
          functionFill: 'white',
          questionMarkFill: 'red'
        } ),
        tandem: tandem
      };

      super(
        () => new FBBMysteryModel(),
        model => new FBBMysteryScreenView( model ),
        options
      );
    }
  }

  return functionBuilderBasics.register( 'FBBMysteryScreen', FBBMysteryScreen );
} );