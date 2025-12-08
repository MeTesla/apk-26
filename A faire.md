- Message de bievenue après validation par émail
- Sugg : Tous les ETATS sont gérés par le backend (menu ....)
- PROB : voir obj user in Localstorage. les données ne sont pas de l'utilisateur actuel
- PROB : verifier si onwindow load j'écris ql ch en LocalStorage. la page affiche tjr "en attente" meme après mail verif.
- SUGG : Loader arpès chaque appel au backEnd
- à voir : Connection d'un autre navigateur. ==> ?? créer page login.
- sugg : Sauvgarder (backup) les émails et les tel dans un endroit sûr
- sugg activités:
	- Traduction ar: vf, qcm, figures, 
	- 3 traduction par session
	- ajouter justification en cas de mauvaise réponse. et icône en cas de bonne rép

- Traiter les cas de : 	re-register avec le même émail.
						ignorer l'émail de vérif
						Freemium épuisé : afficher btn supprimer mon compte + devenir premium + autres possibilités
						Prob multi browser : sign-in sign-up
						Repenser créer compte: nom + email + mot de passe

- Sugg : comment ajouter fichier config à l'app : son, confetti, dark mode ?


Menus :
	|Guest			|	Registred	|	Registred(expired)	|	Demande		|PREMIUM	|
	|---------------|---------------|-----------------------|---------------|---------	|
	|Créer compte	|	Premium		|	Premium				|	Code		|Profile	|
	|				|	+10 minutes	|	+10 min(estmpé)		|	Profile     |			|
	|				|	Profile		|   Profile				|				|			|


UX / UI
	Guest		
		Menu : Créer compte
		btn Hero : 
		Menu : En attente
		register :	- clique email verif
					- igonre email verif + deuxième register
					- Le menu est généré depuis le backend
	
	Registred
		Reçoi token	 ==	LocalStorage({type:'registred', token : 'ey...'})
		Menu [Premium - Profile - +10 minutes]
		Demande 10 minutes, accordées - Activer compteur (10-1)
		Menu [Premium - +10min (estompé) - Profile]
		Token expire après 10 minutes
		protected	==	Modal(Votre session a pris fin. demain tu peux... + OFFRE Premium)
		+ backEnd : isRegistred(email) + 24h = non autorisé
		x10 TIMES
	
	Premium
		Modal (avantages - devenir Premium) == page payent
		Page payment == info utilisateur + info Amdin (compte bancaire)
		OK== envoyer émail et msg whatsApp (coordonnées bancaires)
		Ajout l'Utilisateur à BD : reçut de payment || msg banque
		Activer user PREMIUM	Mais COMMENT ?
	
!!!!!!!!!!! Vérifier : qcm bam; il reste bcp de question commentées


DONE : figure DB : éliminer phrases sans explication
DONE : suggestions : lier à la firebase
DONE : résumé
DONE : nbrQst, nbrSessions
DONE : Loader added

- creerCompte route:
	- Envoyer email verification		FAIT
	- verifier-email route:				FAIT
	- Comment répondre le frontEnd ?	FAIT
	- changer modal: locked				FAIT
	- Logique freeMins token			FAIT
