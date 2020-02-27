// Copyright 2017-2020, University of Colorado Boulder

/**
 * The 'Mystery' screen in 'Function Builder: Basics'.
 * This screen differs significantly from the Mystery screen in Function Builder.
 * Instead of numeric cards and functions, this Mystery screen uses pattern (image) cards and functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import FBColors from '../../../function-builder/js/common/FBColors.js';
import FBIconFactory from '../../../function-builder/js/common/view/FBIconFactory.js';
import functionBuilderStrings from '../../../function-builder/js/function-builder-strings.js';
import Screen from '../../../joist/js/Screen.js';
import functionBuilderBasics from '../functionBuilderBasics.js';
import FBBMysteryModel from './model/FBBMysteryModel.js';
import FBBMysteryScreenView from './view/FBBMysteryScreenView.js';

const screenMysteryString = functionBuilderStrings.screen.mystery;

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

functionBuilderBasics.register( 'FBBMysteryScreen', FBBMysteryScreen );
export default FBBMysteryScreen;