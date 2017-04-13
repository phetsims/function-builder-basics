// Copyright 2017, University of Colorado Boulder

/**
 * Scene for the 'Mystery' screen in 'Function Builder: Basics'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardContainer = require( 'FUNCTION_BUILDER/common/view/containers/CardContainer' );
  var Color = require( 'SCENERY/util/Color' );
  var EyeToggleButton = require( 'SCENERY_PHET/buttons/EyeToggleButton' );
  var FBBMysteryFunctionNode = require( 'FUNCTION_BUILDER_BASICS/mystery/view/FBBMysteryFunctionNode' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var functionBuilderBasics = require( 'FUNCTION_BUILDER_BASICS/functionBuilderBasics' );
  var ImageCard = require( 'FUNCTION_BUILDER/common/model/cards/ImageCard' );
  var ImageCardNode = require( 'FUNCTION_BUILDER/common/view/cards/ImageCardNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );

  /**
   * @param {MysteryScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function FBBMysterySceneNode( scene, layoutBounds, options ) {

    options = _.extend( {

      /*
       * Mystery scenes have a hidden function carousel, which is where we get functions for composing challenges.
       * This approach was necessary because the Mystery screen was added late in the development process, and
       * the existence of the function carousel was (by that point) required by too many things.
       */
      functionCarouselVisible: false,

      // Hide the checkbox that lets us show/hide the identify of functions in the builder.
      hideFunctionsCheckBoxVisible: false

    }, options );

    var self = this;

    SceneNode.call( this, scene, layoutBounds, FBBMysteryFunctionNode, options );

    // Toggle buttons below each builder slot, for revealing identity of functions
    this.revealProperties = [];  // {Property.<boolean>[]}
    this.revealButtons = []; // {EyeToggleButton[]}
    for ( var i = 0; i < scene.builder.numberOfSlots; i++ ) {

      // create a closure for slotNumber using an IIFE
      (function() {

        var slotNumber = i;

        // Property associated with the slot
        var revealProperty = new Property( false );
        self.revealProperties.push( revealProperty );

        // wire up Property to control the function that's in the slot
        // unlink unnecessary, instances exist for lifetime of the sim
        revealProperty.link( function( reveal ) {
          var functionNode = self.builderNode.getFunctionNode( slotNumber );
          if ( functionNode ) {
            functionNode.identityVisibleProperty.set( reveal );
          }
        } );

        // button below the slot
        var slotLocation = scene.builder.slots[ slotNumber ].location;
        var revealButton = new EyeToggleButton( revealProperty, {
          baseColor: FBColors.HIDDEN_FUNCTION,
          scale: 0.75,
          centerX: slotLocation.x,
          top: slotLocation.y + 65
        } );
        self.revealButtons.push( revealButton );
        self.controlsLayer.addChild( revealButton );

        // touchArea
        revealButton.touchArea = revealButton.localBounds.dilatedXY( 25, 15 );

      })();
    }

    // button for generating a new challenge
    var generateButton = new RectangularPushButton( {
      content: new FontAwesomeNode( 'refresh' ),
      baseColor: PhetColorScheme.PHET_LOGO_YELLOW,
      listener: function() { scene.nextChallenge(); },
      xMargin: 18,
      yMargin: 10,
      centerX: this.builderNode.centerX,
      top: this.builderNode.bottom + 65
    } );
    this.addChild( generateButton );

    // @private shows the answer below the generate button, for debugging, i18n not required
    this.answerNode = new Text( 'answer', {
      font: new FBFont( 18 ),
      centerX: generateButton.centerX,
      top: generateButton.bottom + 10
    } );
    if ( FBQueryParameters.showAnswers ) {
      this.addChild( this.answerNode );
    }

    // Update when the challenge changes.
    // unlink unnecessary, instances exist for lifetime of the sim
    scene.challengeProperty.lazyLink( function( challenge ) {
      self.updateChallenge();
    } );

    // Enable features based on number of cards that have been moved to the output carousel.
    // unlink unnecessary, instances exist for lifetime of the sim.
    this.outputCarousel.numberOfCardsProperty.link( function( numberOfCards ) {

      // enabled function reveal buttons
      self.revealButtons.forEach( function( revealButton ) {
        revealButton.enabled = revealButton.enabled || ( numberOfCards === 3 );
      } );

      // enable 'See Inside' check box
      self.seeInsideCheckBox.enabled = self.seeInsideCheckBox.enabled || ( numberOfCards === 1 );
    } );

    // @private colors for the '?' on function nodes
    this.questionMarkColors = phet.joist.random.shuffle( FBColors.QUESTION_MARK_COLORS );

    // @private
    this.scene = scene;
  }

  functionBuilderBasics.register( 'FBBMysterySceneNode', FBBMysterySceneNode );

  return inherit( SceneNode, FBBMysterySceneNode, {

    /**
     * @public
     * @override
     */
    reset: function() {
      SceneNode.prototype.reset.call( this );
      this.resetChallengeControls();
    },

    /**
     * Creates the card containers that go in the input and output carousels.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions] - see CardContainer options
     * @returns {CardContainer[]}
     * @protected
     * @override
     */
    createCardContainers: function( scene, containerOptions ) {
      var containers = [];
      scene.cardContent.forEach( function( cardImage ) {
        containers.push( new CardContainer( ImageCard, ImageCardNode, cardImage, containerOptions ) );
      } );
      return containers;
    },

    /**
     * Resets controls that need to be reset each time the challenge changes.
     *
     * @private
     */
    resetChallengeControls: function() {

      // reset Properties for revealing function identity
      this.revealProperties.forEach( function( revealProperty ) {
        revealProperty.reset();
      } );

      // disable buttons for revealing function identity
      this.revealButtons.forEach( function( revealButton ) {
        revealButton.enabled = false;
      } );

      // reset 'See Inside' property
      this.seeInsideProperty.reset();

      // disable 'See Inside' check box
      this.seeInsideCheckBox.enabled = false;
    },

    /**
     * Completes initialization by displaying the first challenge.
     *
     * @public
     * @override
     */
    completeInitialization: function() {
      SceneNode.prototype.completeInitialization.call( this );
      this.updateChallenge();
    },

    /**
     * Synchronizes the displayed challenge with the model.
     *
     * @private
     */
    updateChallenge: function() {

      this.resetCarousels();
      this.builderNode.reset();
      this.resetFunctions();
      this.resetCards();

      var functionConstructors = this.scene.challengeProperty.get(); // {constructor[]}

      var questionMarkColors = this.getQuestionMarkColors( this.scene.builder.numberOfSlots );

      // transfer functions from carousel to builder, configured to match the challenge
      var slotNumber = 0;
      var answerText = '';
      for ( var i = 0; i < functionConstructors.length; i++ ) {

        // get a function node from the carousel
        var functionNode = this.getFunctionNode( functionConstructors[ i ] );

        // change the color of its question mark
        functionNode.setHiddenNodeColor( questionMarkColors[ i ] );

        // move the function to the builder
        functionNode.moveToBuilder( slotNumber );

        // hide the function's identity
        functionNode.identityVisibleProperty.set( false );

        // add to answer text 
        answerText += functionNode.functionInstance.name;
        if ( i < functionConstructors.length - 1 ) {
          answerText += ' > ';
        }

        slotNumber++;
      }

      // Resets controls that need to be reset each time the challenge changes.
      this.resetChallengeControls();

      // show the answer for debugging
      this.answerNode.text = answerText;
      this.answerNode.centerX = this.builderNode.centerX;

      if ( FBQueryParameters.populateOutput ) {
        this.populateOutputCarousel();
      }
    },

    /**
     * Given a function constructor, get a corresponding FunctionNode from the carousel.
     * @param {constructor} functionConstructor - constructor for an ImageFunction
     * @returns {ImageFunctionNode}
     */
    getFunctionNode: function( functionConstructor ) {

      // get the container that has functions of the specified type
      var functionContainer = null;
      for ( var i = 0; i < this.functionContainers.length && !functionContainer; i++ ) {
        if ( this.functionContainers[ i ].getFunctionConstructor() === functionConstructor ) {
          functionContainer = this.functionContainers[ i ];
        }
      }
      assert && assert( functionContainer, 'functionContainer not found' );
      assert && assert( !functionContainer.isEmpty(), 'functionContainer is empty' );

      // get the first item in the container
      return functionContainer.getContents()[ 0 ];
    },

    /**
     * Gets a set of question mark colors, containing no duplicates.
     * @param {number} numberOfColors
     * @returns {Color[]|string[]}
     */
    getQuestionMarkColors: function( numberOfColors ) {

      assert && assert( numberOfColors <= FBColors.QUESTION_MARK_COLORS.length );

      var colors = [];
      while ( colors.length < numberOfColors ) {

        // remove first color from the pool
        var color = this.questionMarkColors[ 0 ];
        this.questionMarkColors.splice( 0, 1 );

        // prevent duplicate colors
        if ( colors.indexOf( color ) === -1 ) {
          colors.push( color );
        }

        // replenish the colors
        if ( this.questionMarkColors.length === 0 ) {
          this.questionMarkColors = phet.joist.random.shuffle( FBColors.QUESTION_MARK_COLORS );

          // prevent choosing the same color consecutively
          if ( this.questionMarkColors[0] === color ) {
            this.questionMarkColors.splice( 0, 1 ); 
          }
        }
      }
      assert && assert( colors.length === numberOfColors );
      return colors;
    }
  } );
} );
