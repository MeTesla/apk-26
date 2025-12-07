- Message de bievenue après validation par émail
- PROB : voir obj user in Localstorage. les données ne sont pas de l'utilisateur actuel
- PROB : verifier si onwindow load j'écris ql ch en LocalStorage. la page affiche tjr "en attente" meme après mail verif.
- SUGG : Loader arpès chaque appel au backEnd
- à voir : Connection d'un autre navigateur. ==> ?? créer page login.
- sugg : Sauvgarder (backup) les émails et les tel dans un endroit sûr
- sugg activités:
	- Traduction ar: vf, qcm, figures, 
	- 3 traduction par session
	- ajouter justification en cas de mauvaise réponse. et icône en cas de bonne rép


- comment ajouter fichier config à l'app : son, confetti, dark mode,
- creerCompte route:
	- Envoyer email verification		FAIT
	- verifier-email route:				FAIT
	- Comment répondre le frontEnd ?	FAIT
	- changer modal: locked				FAIT
	- Logique freeMins token			FAIT


	- DASHBOARD :
		Cards : Fremium [120], Premium [100], Demande Premium [20]
		Filtres : Checkboxes to filter: afficher/masquer : fremium, premium, demande premium
		liste élèves + activer Premium
        SI TOKEN EXPIRE

- créer une route/fonction/middleware backend (isAuthorized) à utilser 
  à chaque fois que je veux interdire l'accès à une section.


Menus
	Guest			|	Registred	|	Registred(expired)	|	Demande		|PREMIUM
	----------------|---------------|-----------------------|---------------|------------
	Créer compte	|	Premium		|	Premium				|	Code		|Profile
					|	+10 minutes	|	+10 min(estmpé)		|	Profile     |
					|	Profile		|   Profile				|				|


UX / UI
	Guest
		
		Menu : Créer compte
		btn Hero : 
		Menu : En attente
register :	- clique email verif
			- igonre email verif + deuxième register
			Le menu est généré depuis le backend	
	
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
	
	
	localStorage : token, typeaccount(registred, premium), nbr10min(3),
	
	if (nbrconnections <= 10) +10min desabled
	


!!!!!!!!!!! Vérifier : qcm bam; il reste bcp de question commentées


DONE : figure DB : éliminer phrases sans explication
DONE : suggestions : lier à la firebase
DONE : résumé
DONE : nbrQst, nbrSessions
DONE : Loader added