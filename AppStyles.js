import { StyleSheet, Dimensions } from 'react-native';

// const CARD_WIDTH = width * 0.64;
// const CARD_ASPECT_RATIO = 240 / 198;
// const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;
// const IMAGE_CONTAINER_ASPECT_RATIO = 240 / 140;
// const IMAGE_CONTAINER_WIDTH = CARD_WIDTH;
// const IMAGE_CONTAINER_HEIGHT =
//   IMAGE_CONTAINER_WIDTH / IMAGE_CONTAINER_ASPECT_RATIO;


// screen sizing
const { width, height } = Dimensions.get('screen');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width :height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 120;
const RECIPE_ITEM_MARGIN = 20;

// 2 photos per width
export const RecipeCard = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 80,
    // marginLeft: RECIPE_ITEM_MARGIN,
    // marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 1)* RECIPE_ITEM_MARGIN) / recipeNumColums,
   // width: 50,
    height: RECIPE_ITEM_HEIGHT+55,
    //height:100,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  }
//   row: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'flex-start'
//   }
});
