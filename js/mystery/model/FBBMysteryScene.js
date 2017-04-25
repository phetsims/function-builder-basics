// Copyright 2017, University of Colorado Boulder

/**
 * A scene in the 'Mystery' screen in 'Function Builder: Basics'.
 * This Mystery screen deals with Pattern (image) cards and functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/builder/Builder' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilderBasics = require( 'FUNCTION_BUILDER_BASICS/functionBuilderBasics' );
  var FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysteryChallenges = require( 'FUNCTION_BUILDER/mystery/model/MysteryChallenges' );
  var Property = require( 'AXON/Property' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );
  var Vector2 = require( 'DOT/Vector2' );

  // function modules
  var Erase = require( 'FUNCTION_BUILDER/patterns/model/functions/Erase' );
  var Grayscale = require( 'FUNCTION_BUILDER/patterns/model/functions/Grayscale' );
  var Identity = require( 'FUNCTION_BUILDER/patterns/model/functions/Identity' );
  var InvertRGB = require( 'FUNCTION_BUILDER/patterns/model/functions/InvertRGB' );
  var Mirror = require( 'FUNCTION_BUILDER/patterns/model/functions/Mirror' );
  var Rotate90 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate90' );
  var Rotate180 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate180' );
  var Shrink = require( 'FUNCTION_BUILDER/patterns/model/functions/Shrink' );
  var Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  // card images
  var beakerImage = require( 'image!FUNCTION_BUILDER/cards/beaker.png' );
  var butterflyImage = require( 'image!FUNCTION_BUILDER/cards/butterfly.png' );
  var cherriesImage = require( 'image!FUNCTION_BUILDER/cards/cherries.png' );
  var circleImage = require( 'image!FUNCTION_BUILDER/cards/circle.png' );
  var feetImage = require( 'image!FUNCTION_BUILDER/cards/feet.png' );
  var planetImage = require( 'image!FUNCTION_BUILDER/cards/planet.png' );
  var rectangleImage = require( 'image!FUNCTION_BUILDER/cards/rectangle.png' );
  var snowflakeImage = require( 'image!FUNCTION_BUILDER/cards/snowflake.png' );
  var starImage = require( 'image!FUNCTION_BUILDER/cards/star.png' );
  var stickFigureImage = require( 'image!FUNCTION_BUILDER/cards/stickFigure.png' );
  var sunImage = require( 'image!FUNCTION_BUILDER/cards/sun.png' );
  var triangleImage = require( 'image!FUNCTION_BUILDER/cards/triangle.png' );

  /**
   * @param {ImageFunction[][]} challengePool
   * @param {Object} [options]
   * @constructor
   */
  function FBBMysteryScene( challengePool, options ) {

    options = _.extend( {
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

    // @private
    this.numberOfSlots = options.numberOfSlots;

    // validate the challenge pool
    if ( assert ) {

      // limit scope of for-loop var using IIFE
      (function() {
        for ( var i = 0; i < challengePool.length; i++ ) {

          var challenge = challengePool[ i ]; // {ImageFunction[]}

          // validate challenge
          assert && assert( challenge.length === options.numberOfSlots,
            'incorrect number of functions in challenge: ' + challenge );
        }
      })();
    }

    // @public the challenge that is displayed
    this.challengeProperty = new Property( challengePool[ MysteryChallenges.DEFAULT_CHALLENGE_INDEX ] );
    this.challengePool = challengePool; // (read-only) for debug only, the original challenge pool, do not modify!

    // @private
    this.availableChallenges = challengePool.slice( 0 ); // available challenges
    this.availableChallenges.splice( MysteryChallenges.DEFAULT_CHALLENGE_INDEX, 1 ); // remove the default challenge

    // {HTMLImageElement[]} images for the input cards, in the order that they appear in the carousel
    var cardContent = [
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
    var functionCreators = [
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

    var builderWidth = Scene.computeBuilderWidth( options.numberOfSlots );
    var builderX = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( builderWidth / 2 );
    var builder = new Builder( {
      numberOfSlots: options.numberOfSlots,
      width: builderWidth,
      location: new Vector2( builderX, FBConstants.BUILDER_Y )
    } );

    Scene.call( this, cardContent, functionCreators, builder, options );
  }

  functionBuilderBasics.register( 'FBBMysteryScene', FBBMysteryScene );

  return inherit( Scene, FBBMysteryScene, {

    /**
     * Resets the scene.
     * Resets the challenge to its initial value, restocks the challenge pool.
     *
     * @public
     * @override
     */
    reset: function() {
      Scene.prototype.reset.call( this );

      // force notification when initial challenge is displayed
      if ( this.challengeProperty.get() === this.challengeProperty.initialValue ) {
        this.challengeProperty.notifyObserversStatic();
      }
      else {
        this.challengeProperty.reset();
      }

      // restock the available challenges, with default challenge removed
      this.availableChallenges = this.challengePool.slice( 0 );
      this.availableChallenges.splice( MysteryChallenges.DEFAULT_CHALLENGE_INDEX, 1 );
    },

    /**
     * Advances to the next randomly-selected challenge.  After a challenge has been selected, it is not selected
     * again until all challenges in the pool have been selected.
     *
     * @public
     */
    nextChallenge: function() {

      // available pool is empty
      if ( this.availableChallenges.length === 0 ) {

        // restock the pool
        this.availableChallenges = this.challengePool.slice( 0 );

        // remove the current challenge, so we don't select it twice in a row
        if ( !FBQueryParameters.playAll ) {
          var currentChallengeIndex = this.availableChallenges.indexOf( this.challengeProperty.get() );
          this.availableChallenges.splice( currentChallengeIndex, 1 );
          assert && assert( this.availableChallenges.length === this.challengePool.length - 1 );
        }
      }

      // randomly select a challenge from the available pool
      var challengeIndex = FBQueryParameters.playAll ? 0 : phet.joist.random.nextInt( this.availableChallenges.length );
      assert && assert( challengeIndex >= 0 && challengeIndex < this.availableChallenges.length );
      var challenge = this.availableChallenges[ challengeIndex ];

      // remove the challenge from the available pool
      this.availableChallenges.splice( challengeIndex, 1 );

      this.challengeProperty.set( challenge );
    }
  } );
} );
