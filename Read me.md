- UI : Séparer le menu en deux : 
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

		PREMIUM 
#############################
Accueil 	: boutton devenir
Menu 		: Premium
page premium 	: présentation, avantages, vidéo comment

backEnd			: dashboard, envoyer code; réinitialiser compte

	
Il remplit formulaire. paye. envoie reçu, attends. 
Moi, reçu whap, dashboard, je clique: premium, statut change registred=> Premium
Il se déconnecte puis se reconnecte pour màj son statut à "PREMIUM"

Backend : Premium, num reçu, img reçu
					MEME table ou NOUVEAU table premium


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
		- Pour combien de temps j'utilise mon compte premium ?
		Vous bénéficier de tous le contenu de notre applciation jusqu'au mois d'août
		- Est-ce qu'il y a moyen de vous contacter ?
		Oui, il y a notre numéro whatapp 087587657 et notre adresse émail : pooka
		- Ce site est-il suffisant pour bien préparer mon régional ?
		Le site est un outils disponible à tout moment mais il ne remplace jamais un prof.
		- En cas de perte de mon compte, comment puis-je le récupérer ?
		Il vous suffit de nous contacter par émail ou sur whatsapp
		- Le contenu d'Euduka.com est-il conforme au programme du Ministère de l'Education Nationale ?
		Oui, le contenu de d'Euduka.com est supervisé par des professeurs de français qui 

---------------------------------------------------------

- re-register avec le même émail.	Fait : système login
- ignorer l'émail de vérif			Fait : Token expire 3 jours
- Prob multi browser : sign-in sign-up			Fait : système Login 


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