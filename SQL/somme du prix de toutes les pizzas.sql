create or replace view vues_pizzas as
SELECT p.nom, 
SUM(i.prix) as total
FROM ingredients as i
	JOIN recettes as r
		on i.id = r.id_ingredient
		JOIN pizzas as p
			ON p.id = r.id_pizza
    
GROUP BY r.id_pizza


