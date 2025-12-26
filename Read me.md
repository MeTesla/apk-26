PROB : après verif, le serveur ne reconnait pas l'élv. je me déconnecte et login

-Sugg : resultats, 
	login: charger res de BD (elv),
	màj (BD)? fermeture list act.
	màj (LS) verfication quiz.
const eleveSchema = new mongoose.Schema({
  nom: String,
  email: String,
  resultats: {
    qcm: {score: Number, date: Date, lastSession: Array},
    vf:{score: Number, date: Date, lastSession: Array},
    remplir: {score: Number, date: Date, lastSession: Array},
  }
});

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

		PREMIUM 
#############################
Accueil 	: boutton devenir
Menu 		: Premium
page premium 	: présentation, avantages, vidéo comment
CTA button		: processe payment; entrer ses coordonnées, afficher mes coordonnées bancaires
backEnd			: dashboard, envoyer code; réinitialiser compte

Coordonnées ACCESSIBLES à tout moment mais comment ? boutton nos coordonnées dans la page PREMIUM
SOLUTION : 	L'inclure dans la page : ## Nous contacter
			Séparer le menu en deux : profile (déconnexion, profil, ...) et menu général (Qui sommes-nous ? Nous contacter[email, whats, face, compte banc])

Il remplit formulaire. paye. attends. Moi, J'attends la preuve du payment. 
reçu, dashboard, je clique: premium, son statut change registred=>Premium
BD : 	Premium, num reçu, img reçu
		MEME table ou NOUVEAU table premium

	Modal vs page
	index : Section carrousel Premium

	Modal (avantages - devenir Premium) == page payment
	Page payment == info utilisateur + info Amdin (compte bancaire)
	OK== envoyer émail et msg whatsApp (coordonnées bancaires)
	Ajout l'Utilisateur à BD : reçut de payment || msg banque



	### Sections :
		Navbar
		Hero + Vidéo
		Vos Avantages
		Qst fréquemment posées

	### Etapes :
	1- Créer un compte
	2- Utiliser gratuitement l'application pour une durée limitée
	3- Acheter un compte Premium sans limite
	4- Bonne révision !

	###Devenir PREMIUM || Passer PREMIUM
		## Préparez-vous à l'examen régional || Bénéficier d'un accès illimité à tout le matériel pour préparer votre régional
		## image
		## boutton 

	### Vos avantages (centre)
		+600 questions sur les oeuvres
		+300 exemples de figures de style
		+50 productios écrites expiquées
		+20 examens régionaux expliqués et corrigés
		Un simulateur de l'examen régional
	
	### Comment passer PREMIUM ? 
		icone vidéo youtube
	
	### Questions fréquement posées :
		- Combien de temps j'utilise mon compte premium ?
		- Est-ce qu'il y a moyen de vous contacter ?
		- Ce site est-il suffisant pour bien préparer mon régional ?
		- En cas de perte de mon compte, comment puis-je le récupérer ?
		- Le contenu d'Euduka.com est-il conforme au programme du Ministère de l'Education Nationale ?

---------------------------------------------------------

- re-register avec le même émail.	Fait : système login
- ignorer l'émail de vérif			Fait : Token expire 3 jours
- Prob multi browser : sign-in sign-up			Fait : système Login 