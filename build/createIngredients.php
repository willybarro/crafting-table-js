<?php
class Ingredient {
	public function getIngredient($type, $number)
	{
		$imgUrl = sprintf('http://minecraftdatavalues.com/images/%s/%s.png', $type, $number);
		$url = sprintf('http://minecraftdatavalues.com/ajax.php?t=%s&m=%s&d=', $type, $number);
		$f = file_get_contents($url);
		$ingredient = array();
		if(!empty($f)) {
			$json = json_decode($f);

			$ingredient = array(
				'id_mc' => $json->id_mc,
				'stackable' => $json->stackable,
				'l_name' => $json->l_name,
				'ot_name' => $json->ot_name,
				'id_source_type' => (int) $json->source[0]->id_source_type,
				'image' => sprintf($imgUrl, $type, $json->id_mc),
				'stackable' => (int) $json->stackable
			);

			if(!empty($json->source[0]->recipe)) {
				$ingredient['recipe'] = $this->createPlanifiedRecipe($json->source[0]->recipe);
			}
		}

		return $ingredient;
	}

	public function createPlanifiedRecipe($originalRecipe) {
		$planifiedRecipe = array();
		$recipe = array(
			array(0, 0, 0),
			array(0, 0, 0),
			array(0, 0, 0),
		);

		if(!empty($originalRecipe)) {
			// Convert the original recipe into a [3,3] matrix
			foreach($originalRecipe as $ingredient) {
				$recipe[$ingredient->y][$ingredient->x] = $ingredient->id_mc;
			}

			// Now, we'll planify the recipe
			foreach($recipe as $y => $yIngredients) {
				foreach($yIngredients as $x => $xIngredients) {
					$planifiedRecipe[] = (int) $recipe[$y][$x];
				}
			}
		}

		return $planifiedRecipe;
	}
}

$ingredients = array();
$ingredient = new Ingredient();
// for($i = 0; $i <= 50; $i++) {
// 	echo '.';
// 	$ingredients[(string)$i] = $ingredient->getIngredient(1, $i);

// 	if($i > 0 && $i % 30 === 0) {
// 		echo PHP_EOL;
// 	}
// }

$ingredients[] = $ingredient->getIngredient(1, 17);

echo json_encode($ingredients);