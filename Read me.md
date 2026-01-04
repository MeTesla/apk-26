- DailyTopUsers: requête s'execute une fois par jour. envoyé aux connectés
- node-cron pour des tâches d'arrière plan côté serveur.
- SUGG : lancement intelligent, inscription via invitation
- UI : MENU en deux : 
	profile (déconnexion, profile,  free mins) et 
	menu général (Qui sommes-nous ? Nous contacter[email, whats, face, compte banc])


- PROB : après verif, le serveur ne reconnait pas l'élv. je me déconnecte et login


- PROB : même sans verification, je peux accéder à mon compte surtout après expiration du token de validation. 
		(entre création compte et vérification)
		Le lien expiré mais je ne connecte avec succès
		mais le token n'est pas valide: pas d'accès aux exo
- PROB : voir obj ELEVE in Localstorage. les données ne sont pas de l'utilisateur actuel
 		 Vérifier si onwindow load j'écris ql ch en LocalStorage. 
		 la page affiche tjr "en attente" meme après mail verif.

- Sugg : btn vidéo, comment utiliser le site, en arabe.
- Sugg : Most Asked Questions : accordion, des vidéos, Qst rep, 
- Sugg : no free-min : changer menu[profil + Premium]

- Sugg : Message de bievenue après validation par émail
- Sugg : Tous les ETATS sont gérés par le backend (menu ....)

- Sugg : Loader arpès chaque appel au backEnd. De préférence dans le boutton
- Sugg : comment ajouter fichier config à l'app : son, confetti, dark mode ?
- Sugg : Sauvgarder (backup) les émails et les tel dans un endroit sûr

- Repenser créer compte: nom + email + mot de passe

		PROFILE
#############################
freepik : devenir premium

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


