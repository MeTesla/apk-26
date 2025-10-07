premium - modal + commencer - modal (réécris tes infos: nom email num tel) confirme tes
	coordonnées. Nom, numéro de compte. + vidéo

PREMIUM LOGIC 2 :
	modal premium pour les registred
	

- comment ajouter fichier config à l'app : son, confetti, dark mode,
- creerCompte route:
	- Envoyer email verification	FAIT avec OTP
	- verifier-email route:			FAIT
	- Comment répondre le frontEnd ?

- Loader arpès chaque appel au backEnd

MODALS :
--------
	changer modal: locked			FAIT
	devenir premium / 
	premium(feliciter)

Logique freeMins token				FAIT


Connection d'un autre navigateur. ==> ?? créer page login.
 			 compte non expiré vs compte expiré
Sauvgarder (backup) les émails et les tel dans un endroit sûr

payment plans / access denied, not allowed, protected account
- index : inclure section : exercice aléatorie base de français. btn generate


4-AJOUTER :
	- Page pour capture reçu payement
	- DASHBOARD :
		Cards : Fremium [120], Premium [100], Demande Premium [20]
		Filtres : Checkboxes to filter: afficher/masquer : fremium, premium, demande premium
		liste élèves + activer Premium
        SI TOKEN EXPIRE

    - créer une route/fonction backend (isAuthorized) à utilser 
        à chaque fois que je veux interdire l'accès à une section.


        
    - Traduction ar: vf, qcm, figures, 
    - 3 traduction par session
    - ajouter justification en cas de mauvaise réponse. et icône en cas de bonne rép


Guest - registred - registred+token expired (x10)  - Premium

Menus
	Guest			|	Registred	|	Registred(expired)	|	Demande		|PREMIUM
	----------------|---------------|-----------------------|---------------|------------
	Créer compte	|	Premium		|	Premium				|	Code		|Profile
					|	+10 minutes	|	+10 min(estmpé)		|	Profile     |
					|	Profile		|   Profile				
UX / UI
	Guest
	Protected = Modal(icône Cadenas + Créer compte pour pouvoir..... + btn créer compte)
	Créer compte == form register [nom, prenom, email, tel, dateCreation, token, compteur10minutes(10), userType(registred, pending, premium),  ]
	
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
	Activer user PREMIUM
	
	
	localStorage : token, typeaccount(registred, premium), nbr10min(3),
	
	if (nbrconnections <= 10) +10min desabled
	


!!!!!!!!!!! Vérifier : qcm bam; il reste bcp de question commentées


DONE : figure DB : éliminer phrases sans explication
DONE : suggestions : lier à la firebase
DONE : résumé
DONE : nbrQst, nbrSessions
DONE : Loader added