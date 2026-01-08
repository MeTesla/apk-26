- PROB : si verif expire: le route envoie le msg mais la fonction continue de exécuter
- Exercices du jour: envoyer notification, au clique, il passe un exercice. (FB like)
- DailyTopUsers: requête s'execute une fois par jour. envoyé aux connectés. basé sur un score = l'addition de tous les résultats [5+3+5+2+5+8]. !triche du fronteNd
- node-cron pour des tâches d'arrière plan côté serveur.
- SUGG : lancement intelligent, inscription via invitation

- UI : MENU en deux : 
	profile (déconnexion, profile,  free mins) et 
	menu général (Qui sommes-nous ? Nous contacter[email, whats, face, compte banc])


- PROB : après verif, le serveur ne reconnait pas l'élv. je me déconnecte et login
	- problème identifié : le token de verification n'est pas celui dans la BD
	- après chaque exo, la màj ne s'effectue pas; prob de token

- PROB : même sans verification, je peux accéder à mon compte surtout après expiration du token de validation. 
		(entre création compte et vérification)
		Le lien expiré mais je ne connecte avec succès
		mais le token n'est pas valide: pas d'accès aux exo

- PROB : des fois, "en attente" meme après mail verif.

- Sugg : btn vidéo, comment utiliser le site, en arabe.
- Sugg : Most Asked Questions : accordion, des vidéos, Qst rep, 

- Sugg : Message de bievenue après validation par émail

- Sugg : Loader arpès chaque appel au backEnd. De préférence dans le boutton

- Repenser créer compte: nom + email + mot de passe

		PROFILE
#############################
freepik : devenir premium

parent 
------
let reseivedData
function handleData(val)
	{reseivedData = val
}
child(handleData)


child(callBack){
-----
	const data = 34
	callBack(data)
}

### Blocs
	- Image
	- Image profile
	- Nombre de sessions (à Ajouter)
	- Premium if free account || type de compte sous img profile
	- Euduka.com + Logo + Logout
	- Date du jour
Compte (icone avatar)
	info personnels (ajouter : type de compte(gratuit, Premium))
Résultats (icone graphique)
	4 blocs qcm vf remplir ordrePh ordreEven

QCM : 	- QCM
		- 12/10/2026
		- graphique dernière session
		- refaire session
		- graphique 7 sessions
		
		PREMIUM 
#############################
Ajouter vidéo comment

backEnd			: dashboard, envoyer code; réinitialiser compte
	
Il remplit formulaire. paye. envoie reçu, attends. 
Moi, reçu whap, dashboard, je clique: premium, statut change registred=> Premium
Il se déconnecte puis se reconnecte pour màj son statut à "PREMIUM"

Backend : Premium, num reçu, img reçu
					MEME table ou NOUVEAU table premium

	### Etapes :
	1- Créer un compte
	2- Utiliser gratuitement l'application pour une durée limitée
	3- Acheter un compte Premium sans limite
	4- Bonne révision !


- Sugg : comment ajouter fichier config à l'app : son, confetti, dark mode ?
- Sugg : Sauvgarder (backup) les émails et les tel dans un endroit sûr
