// Copyright 2017, University of Colorado Boulder

/**
 * Challenges for the 'Mystery' screen in 'Function Builder: Basics'.
 * Specified in https://docs.google.com/spreadsheets/d/1_ndx3YmLA2H_w0iFouS6rur3EmDebyjPIf_OTmKy13M/edit#gid=0
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilderBasics = require( 'FUNCTION_BUILDER_BASICS/functionBuilderBasics' );
  
  // function modules
  var Erase = require( 'FUNCTION_BUILDER/patterns/model/functions/Erase' );
  var Grayscale = require( 'FUNCTION_BUILDER/patterns/model/functions/Grayscale' );
  var Identity = require( 'FUNCTION_BUILDER/patterns/model/functions/Identity' );
  var InvertRGB = require( 'FUNCTION_BUILDER/patterns/model/functions/InvertRGB' );
  var Mirror = require( 'FUNCTION_BUILDER/patterns/model/functions/Mirror' );
  var Rotate180 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate180' );
  var Rotate90 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate90' );
  var Shrink = require( 'FUNCTION_BUILDER/patterns/model/functions/Shrink' );
  var Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  var FBBMysteryChallenges = {

    // Index of the challenge in each pool that is display on startup and reset.
    // This provides a reproducible challenge for the teacher.
    DEFAULT_CHALLENGE_INDEX: 0,

    // {constructor[][]} 1-function challenges
    POOL1: [
      [ InvertRGB ], // selected on startup and reset
      [ Erase ],
      [ Grayscale ],
      [ Identity ],
      [ Mirror ],
      [ Rotate90 ],
      [ Rotate180 ],
      [ Shrink ],
      [ Warhol ]
    ],

    // {constructor[][]} 2-function challenges
    POOL2: [
      [ Rotate180, Shrink ], // selected on startup and reset
      [ Mirror, Mirror ],
      [ Rotate90, Rotate90 ],
      [ Rotate180, Rotate180 ],
      [ InvertRGB, InvertRGB ],
      [ Warhol, Warhol ],
      [ Mirror, Rotate180 ],
      [ Mirror, Erase ],
      [ Mirror, Shrink ],
      [ Rotate90, Rotate180 ],
      [ Rotate90, Identity ],
      [ Rotate90, InvertRGB ],
      [ Rotate90, Shrink ],
      [ Rotate90, Warhol ],
      [ Grayscale, Rotate180 ],
      [ Grayscale, Identity ],
      [ Grayscale, InvertRGB ],
      [ Grayscale, Warhol ],
      [ Rotate180, InvertRGB ],
      [ Rotate180, Erase ],
      [ Identity, InvertRGB ],
      [ Identity, Shrink ],
      [ Identity, Warhol ],
      [ InvertRGB, Shrink ],
      [ InvertRGB, Warhol ],
      [ Shrink, Shrink ],
      [ Shrink, Warhol ]
    ],

    // {constructor[][]} 3-function challenges
    POOL3: [
      [ Rotate90, Grayscale, Warhol ], // selected on startup and reset
      [ Mirror, Rotate90, Mirror ],
      [ Mirror, Grayscale, Erase ],
      [ Mirror, Grayscale, Shrink ],
      [ Mirror, Rotate180, InvertRGB ],
      [ Mirror, Identity, Warhol ],
      [ Rotate90, Rotate90, Rotate180 ],
      [ Rotate90, Identity, InvertRGB ],
      [ Rotate90, InvertRGB, Shrink ],
      [ Rotate90, Grayscale, Rotate180 ],
      [ Grayscale, Identity, InvertRGB ],
      [ Grayscale, Identity, Erase ],
      [ Rotate180, Warhol, Rotate180 ],
      [ Rotate180, Mirror, Shrink ],
      [ Rotate180, Shrink, Warhol ],
      [ Identity, Mirror, InvertRGB ],
      [ InvertRGB, Rotate180, Identity ],
      [ InvertRGB, Warhol, Rotate90 ],
      [ Erase, Rotate90, Rotate90 ],
      [ Shrink, Grayscale, Shrink ],
      [ Shrink, InvertRGB, Warhol ],
      [ Warhol, Shrink, Warhol ]
    ]
  };

  functionBuilderBasics.register( 'FBBMysteryChallenges', FBBMysteryChallenges );

  return FBBMysteryChallenges;
} );
