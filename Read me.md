searchInput.addeventlister('input', searchTable)
function serachTable(){
	tableRows.forEach((row,i)={
		let tableData=row.textContent.toLowerCase()
		let searchData = search.value
		
		row.classList.toggle('hide', table_data.indexOf(serachData)<0)
		row.style.setProperty('--delay', i/25 + 's')
	})

}

- après expiration du token verification , supprimer élève de DB || LS.clear||rien faire
- LS || cookies
- validator , hash password, travailler sur mot de passe
- dotenv

- ptt PROB : après expiration des minutes, impossible de mettre à jour "resultats" : unauthorized
- PROB : si verif expire: le route envoie le msg mais la fonction continue de exécuter. PIRE: il devient 'REGISTRED': pas sûr, à verfier le cas de conn de deux compte sur le mem navgateur et gestion de LS

- PROB : après verif, le serveur ne reconnait pas l'élv. je me déconnecte et login
	- problème identifié : le token de verification n'est pas celui dans la BD
	- après chaque exo, la màj ne s'effectue pas; prob de token

- PROB : même sans verification, je peux accéder à mon compte surtout après expiration du token de validation. 
		(entre création compte et vérification)
		Le lien expiré mais je ne connecte avec succès
		mais le token n'est pas valide: pas d'accès aux exo

- PROB : des fois, "en attente" meme après mail verif.


- Exercices du jour: envoyer notification, au clique, il passe un exercice. (FB like)
- DailyTopUsers: requête s'execute une fois par jour. envoyé aux connectés. basé sur un score = l'addition de tous les résultats [5+3+5+2+5+8]. !triche du fronteNd



- UI : MENU en deux : 
	profile (déconnexion, profile,  free mins) et 
	menu général (Qui sommes-nous ? Nous contacter[email, whats, face, compte banc])



- Sugg : btn vidéo, comment utiliser le site, en arabe.

- Sugg : Message de bievenue après validation par émail

- Sugg : Loader arpès chaque appel au backEnd. De préférence dans le boutton

- Repenser créer compte: nom + email + mot de passe

parent 
------
	let reseivedData =""
	function handleData(val)
		{reseivedData = val
	}
	child(handleData)


child(callBack){
-----
	const data = 34
	callBack(data)
}
		
	PREMIUM 
#############################
- UI logic :
	- où mettre les bouttons ? Menu, accueil, profile, => page PREMIUM
	- video premium
	- form premium
Ajouter vidéo comment

backEnd			: dashboard, envoyer code; réinitialiser compte
	
- ETAPES :
	1-Il remplit formulaire. UI : form, vidéo, message émail
	2-Il paye. envoie reçu, attends. 
	3- Je reçois msg sur whap, dashboard, 
	4- je clique: premium, statut change registred=> Premium => 
		MAJ document : Premium, num reçu, img reçu
	5- Il se déconnecte puis se reconnecte pour màj son statut à "PREMIUM"

Backend : 

	### Etapes :
	1- Créer un compte
	2- Utiliser gratuitement l'application pour une durée limitée
	3- Acheter un compte Premium sans limite
	4- Bonne révision !

