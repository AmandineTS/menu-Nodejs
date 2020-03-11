create or replace view vues_ingredients as
select p.nom,p.id,
group_concat(i.nom) as ingredients
from ingredients as i
JOIN recettes as r
		on i.id = r.id_ingredient
		JOIN pizzas as p
			ON p.id = r.id_pizza
            
group by r.id_pizza