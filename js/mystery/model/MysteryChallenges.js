// Copyright 2017, University of Colorado Boulder

/**
 * Challenges for the 'Mystery' screen in 'SIM_NAME'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBasics = require( 'FUNCTION_BASICS/functionBasics' );
  
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

  var MysteryChallenges = {

    // Index of the challenge in each pool that is display on startup and reset.
    // This provides a reproducible challenge for the teacher.
    DEFAULT_CHALLENGE_INDEX: 0,

    // {constructor[][]} 1-function challenges
    POOL1: [
      [ Grayscale ], // selected on startup and reset
      [ Erase ],
      [ Identity ],
      [ InvertRGB ],
      [ Mirror ],
      [ Rotate90 ],
      [ Rotate180 ],
      [ Shrink ],
      [ Warhol ]
    ],

    // {constructor[][]} 2-function challenges
    POOL2: [
      [ Grayscale, Rotate90 ], // selected on startup and reset
      [ InvertRGB, Rotate180 ]
    ],

    // {constructor[][]} 3-function challenges
    POOL3: [
      [ Grayscale, Rotate90, Shrink ], // selected on startup and reset
      [ InvertRGB, Rotate180, Mirror ]
    ]
  };

  functionBasics.register( 'MysteryChallenges', MysteryChallenges );

  return MysteryChallenges;
} );
