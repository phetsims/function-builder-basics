// Copyright 2017-2020, University of Colorado Boulder

/**
 * A scene in the 'Mystery' screen in 'Function Builder: Basics'.
 * This Mystery screen deals with Pattern (image) cards and functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Builder = require( 'FUNCTION_BUILDER/common/model/builder/Builder' );
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  const FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  const functionBuilderBasics = require( 'FUNCTION_BUILDER_BASICS/functionBuilderBasics' );
  const FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  const merge = require( 'PHET_CORE/merge' );
  const MysteryChallenges = require( 'FUNCTION_BUILDER/mystery/model/MysteryChallenges' );
  const Property = require( 'AXON/Property' );
  const Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );
  const Vector2 = require( 'DOT/Vector2' );

  // function modules
  const Erase = require( 'FUNCTION_BUILDER/patterns/model/functions/Erase' );
  const Grayscale = require( 'FUNCTION_BUILDER/patterns/model/functions/Grayscale' );
  const Identity = require( 'FUNCTION_BUILDER/patterns/model/functions/Identity' );
  const InvertRGB = require( 'FUNCTION_BUILDER/patterns/model/functions/InvertRGB' );
  const Mirror = require( 'FUNCTION_BUILDER/patterns/model/functions/Mirror' );
  const Rotate180 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate180' );
  const Rotate90 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate90' );
  const Shrink = require( 'FUNCTION_BUILDER/patterns/model/functions/Shrink' );
  const Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  // card images
  const beakerImage = require( 'image!FUNCTION_BUILDER/cards/beaker.png' );
  const butterflyImage = require( 'image!FUNCTION_BUILDER/cards/butterfly.png' );
  const cherriesImage = require( 'image!FUNCTION_BUILDER/cards/cherries.png' );
  const circleImage = require( 'image!FUNCTION_BUILDER/cards/circle.png' );
  const feetImage = require( 'image!FUNCTION_BUILDER/cards/feet.png' );
  const planetImage = require( 'image!FUNCTION_BUILDER/cards/planet.png' );
  const rectangleImage = require( 'image!FUNCTION_BUILDER/cards/rectangle.png' );
  const snowflakeImage = require( 'image!FUNCTION_BUILDER/cards/snowflake.png' );
  const starImage = require( 'image!FUNCTION_BUILDER/cards/star.png' );
  const stickFigureImage = require( 'image!FUNCTION_BUILDER/cards/stickFigure.png' );
  const sunImage = require( 'image!FUNCTION_BUILDER/cards/sun.png' );
  const triangleImage = require( 'image!FUNCTION_BUILDER/cards/triangle.png' );

  class FBBMysteryScene extends Scene {

    /**
     * @param {ImageFunction[][]} challengePool
     * @param {Object} [options]
     */
    constructor( challengePool, options ) {

      options = merge( {
        numberOfSlots: 1,
        numberOfEachCard: 1
      }, options );

      // {Node} scene selection icon
      assert && assert( !options.iconNode );
      options.iconNode = FBIconFactory.createSceneIcon( options.numberOfSlots );

      // Create enough instances of each function type to support the case where all functions
      // in a challenge have the same type.
      assert && assert( !options.numberOfEachFunction );
      options.numberOfEachFunction = options.numberOfSlots;

      // validate the challenge pool
      if ( assert ) {

        // limit scope of for-loop var using IIFE
        ( () => {
          for ( let i = 0; i < challengePool.length; i++ ) {

            const challenge = challengePool[ i ]; // {ImageFunction[]}

            // validate challenge
            assert && assert( challenge.length === options.numberOfSlots,
              'incorrect number of functions in challenge: ' + challenge );
          }
        } )();
      }

      // {HTMLImageElement[]} images for the input cards, in the order that they appear in the carousel
      const cardContent = [
        feetImage,
        snowflakeImage,
        butterflyImage,
        stickFigureImage,
        planetImage,
        sunImage,
        beakerImage,
        cherriesImage,
        rectangleImage,
        circleImage,
        triangleImage,
        starImage
      ];

      // {FunctionCreator[]} function creators, in the order that functions appear in the carousel.
      const functionCreators = [
        new FunctionCreator( Mirror ),
        new FunctionCreator( Rotate90 ),
        new FunctionCreator( Grayscale ),
        new FunctionCreator( Rotate180 ),
        new FunctionCreator( Identity ),
        new FunctionCreator( InvertRGB ),
        new FunctionCreator( Erase ),
        new FunctionCreator( Shrink ),
        new FunctionCreator( Warhol )
      ];

      const builderWidth = Scene.computeBuilderWidth( options.numberOfSlots );
      const builderX = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( builderWidth / 2 );
      const builder = new Builder( {
        numberOfSlots: options.numberOfSlots,
        width: builderWidth,
        position: new Vector2( builderX, FBConstants.BUILDER_Y )
      } );

      super( cardContent, functionCreators, builder, options );

      // @private
      this.numberOfSlots = options.numberOfSlots;

      // @public the challenge that is displayed
      this.challengeProperty = new Property( challengePool[ MysteryChallenges.DEFAULT_CHALLENGE_INDEX ] );
      this.challengePool = challengePool; // (read-only) for debug only, the original challenge pool, do not modify!

      // @private
      this.availableChallenges = challengePool.slice( 0 ); // available challenges
      this.availableChallenges.splice( MysteryChallenges.DEFAULT_CHALLENGE_INDEX, 1 ); // remove the default challenge
    }

    /**
     * Resets the scene.
     * Resets the challenge to its initial value, restocks the challenge pool.
     *
     * @public
     * @override
     */
    reset() {
      super.reset();

      // force notification when initial challenge is displayed
      if ( this.challengeProperty.get() === this.challengeProperty.initialValue ) {
        this.challengeProperty.notifyListenersStatic();
      }
      else {
        this.challengeProperty.reset();
      }

      // restock the available challenges, with default challenge removed
      this.availableChallenges = this.challengePool.slice( 0 );
      this.availableChallenges.splice( MysteryChallenges.DEFAULT_CHALLENGE_INDEX, 1 );
    }

    /**
     * Advances to the next randomly-selected challenge.  After a challenge has been selected, it is not selected
     * again until all challenges in the pool have been selected.
     *
     * @public
     */
    nextChallenge() {

      // available pool is empty
      if ( this.availableChallenges.length === 0 ) {

        // restock the pool
        this.availableChallenges = this.challengePool.slice( 0 );

        // remove the current challenge, so we don't select it twice in a row
        if ( !FBQueryParameters.playAll ) {
          const currentChallengeIndex = this.availableChallenges.indexOf( this.challengeProperty.get() );
          this.availableChallenges.splice( currentChallengeIndex, 1 );
          assert && assert( this.availableChallenges.length === this.challengePool.length - 1 );
        }
      }

      // randomly select a challenge from the available pool
      const challengeIndex = FBQueryParameters.playAll ? 0 : phet.joist.random.nextInt( this.availableChallenges.length );
      assert && assert( challengeIndex >= 0 && challengeIndex < this.availableChallenges.length );
      const challenge = this.availableChallenges[ challengeIndex ];

      // remove the challenge from the available pool
      this.availableChallenges.splice( challengeIndex, 1 );

      this.challengeProperty.set( challenge );
    }
  }

  return functionBuilderBasics.register( 'FBBMysteryScene', FBBMysteryScene );
} );
