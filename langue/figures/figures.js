import {entete} from '../../components/misc/entete.js'
import {closeAct,homeAct} from '../../components/misc/closeAct.js'
import {modalFinSession} from '../../utils.js'
const phrases=[
  {'type':'analogie', 'phrase': `Un pigeon disait des mots si jolis `,'figure':'Une personnification', 'explication':`Un pigeons ne "dit" pas, il ne parle pas, C'est l'homme qui parle`},
  {'phrase': `A dix ans, on est presque un homme. A dix ans on parcourt tout seul le quartier `,'figure':'Une anaphore', 'explication':`L'expression "A dix ans" est répétée au début de plusieurs phrases`},
  {'phrase':`....pour attraper un moineau mais le moineau ne vient jamais. Il désire tant ce petit moineau ! `,'figure':'Une répétition', 'explication':`Le mot "moineau" est répété plusieurs fois dans la phrase (pas au début)`},
  {'phrase':`Ma mémoire était une cire fraiche `,'figure':'Une métaphore','explication':`La mémoire est comparée à une cire fraîche SANS employer un outil de comparaison.`},
  {'phrase':`Pour y renaitre, il fallait d'abord mourir `,'figure':'Une antithèse', 'explication':`Les deux mots "renaître" et "mourir" sont contraires, chacun dans un groupe syntaxique différent`},
  {'phrase':`La bouilloire chantait `,'figure':'Une personnification','explication':`La bouilloire est un objet qui ne chante pas, c'est l'homme qui chante`},
  {'phrase': `Que t'arrive-t-il, chien galeux `,'figure':'Une métaphore', 'explication':`Lalla Zoubida appelle Son fils en le comprant à un chien galeux sans utiliser de moyen de comparaison`},
  {'phrase': `J'attendais un moment avant de voir surgir de la foule les deux haïks `,'figure':'Une synecdoque', 'explication':`Il a dit "deux haïk" au lieu de dire "les deux femmes", il a parlé des haïk à la place des femmes`},
  {'phrase': `Une lampe à pétrole identique à celle de notre voisine `,'figure':'Une comparaison', 'explication':`Le narrateur compare la lampe à pétrol que son père a acheté à la lampe de Rahma en utilisant l'outil "identique à"`},
  {'phrase': `Les femmes, y compris ma mère, crièrent grâce. Elles n'appréciaient pas notre musique. Elles nous conseillèrent de monter sur le belvédère de la terrasse charmer les oreilles des voisins. `,'figure':'Une antiphrase', 'explication':`La musique de Sidi Mohammed et Zineb était désagréable, les femmes leur dit d'aller "chamrer..." ce qui laisse à croire que leur musique était belle.`},
  {'phrase': `Des nuits blanches qu'elle avait passées à gémir `,'figure':'Un oxymore', 'explication':`"Nuit" et "blanche" sont deux mots contradictoires mis dans le même groupe syntaxique`},
  {'phrase': `Sans toi, le soleil deviendra froid `,'figure':'Une antithèse','explication':`"Soleil" et "froid" sont deux mots contradictoires mis chacun dans un groupe syntaxique différent (groupe sujet et groupe verbal)`},
  {'phrase': `Ceux-ci en rient, ceux-là en pleurent `,'figure':'Une antithèse', 'explication':`"Rient" et "pleurent" sont deux mots contraires chacun dans un groupe syntaxique différent`},
  {'phrase': `Elle posait mille questions à ma mère `,'figure':'Une hyperbole', 'explication':`"Mille question" est un chiffre exagéré. Il est impossible de poser mille questions à une personne`},
  {'phrase': `J'ai six ans, l'année prochaine j'en aurai sept et puis huit, neuf et dix `,'figure':'Une gradation', 'explication':`Les mots "six", "sept", "huit ..." sont des mots qui ont un sens croissant`},
  {'phrase': `Dans ma boite à merveilles il y avait des clous, des boules de verre, des anneaux de cuivre, un minuscule cadenas sans clef, des encriers vides,…. `,'figure':'Une énumération'},
  {'phrase': `Le bruit de ses narines me rappela le son de la trompette de Ramadan `,'figure':'Une comparaison', 'explication':`L'énoncé compare "le bruit des narines" à "la trompette de ramadan" en utilisant le verbe "reppeler" comme outil de comparaison`},
  {'phrase': `Le soleil en robe d'or s'attardait à l'horizon `,'figure':'Une personnification', 'explication':`Le soleil est personnifié. Le soleil ne porte pas de robe. Ce sont les femmes qui le font.`},
  {'phrase': `Elle me demanda si j'avais l'intention de braire pendant longtemps encore `,'figure':'Une métaphore', 'explication':`La mère du narrateur le compare à un âne (braire: Crier, en parlant de l'âne) mais sans utiliser d'outil`},
  {'phrase': `Non ! Je ne voulais pas dormir, je ne voulais pas pleurer `,'figure':'Une anaphore', 'explication':`L'expression "je ne voulais pas" est répétée au début de deux phrases`},
  {'phrase': `Autour de moi, rodaient les jnounes, les démons noirs invoqués par la sorcière `,'figure':'Une périphrase', 'explication':`Le narrateur a expliqué le mot "jnounes" par une phrase `},
  {'phrase': `Les femmes continuaient leurs éternels voyages `,'figure':'Une hyperbole', 'explication':`Le mot "éternel" est exagéré. Le narrateur voulait dire que les femmes ne s'arrêtaient pas de marcher dans le bain maure.`},
  {'phrase': `Des siècles passèrent `,'figure':'Une hyperbole', 'explication':`"Des siècles passèrent" est exagéré, il voulait dire que pour lui c'était de longs moments tellement longs qu'il lui semblait des siècles`},
  {'phrase': `Les cris des enfants s'étaient transformés en torrent , en cataracte , en bruit de rafale}, `,'figure':'Une gradation', 'explication':`"Torrent", "cataracte" et ,"bruit de rafale" sont trois mots au sens croissant`},
  {'phrase': `Ma mère m'aspergea alternativement d'eau bouillante et d'eau glacée `,'figure':'Une antithèse', 'explication':`"Eau bouillante" et "eau glacée" sont deux mots contraires mis dans deux groupes syntaxiques différents`},
  {'phrase': `Les petites flammes dansaient `,'figure':'Une personnification','explication':`Les flammes de feu bougent mais ne dansent pas. La danse est un caractère humain.`},
  {'phrase': `Une voisine poussa un cri de joie ou un gémissement de douleur `,'figure':'Une antithèse','explication':`"Cri de joie" et "gémissement de douleur" sont deux idées contraire`},
  {'phrase': `Des torrents de larmes inondèrent son visage `,'figure':'Une hyperbole','explication':`"Des torrents de larmes c'est exagéré pour dire qu'il a beaucoup pleuré. Il est impossible d'imaginer une personne qui pleure des torrents.`},
  {'phrase': `Zineb jouait avec le chat, un chat maladif `,'figure':'Une répétition','explication':`Le mot "chat" est répété dans la phrase aux endroits différent. Si la répétition est au début de plusieurs phrases ce serait une Anaphore`},
  {'phrase': `Tu es un cadavre et je n'aime pas toucher les charognes `,'figure':'Une métaphore','explication':`Il voulait dire : "Tu es comme un cadavre" mais sans utiliser de moyen de comparaison`},
  {'phrase': `J'ai tremblé, comme si j'eusse pensé à autre chose depuis six heures, depuis six semaines, depuis six mois `,'figure':'gradation','explication':`Il y a gradation (heures, semaines, mois) et anaphore ("depuis six" répété trois fois)`},
  {'phrase': `Lui, prolongeant son rire qui ressemblait à un râle `,'figure':'Une comparaison','explication':`Il compare le rire de la personne à un râle (bruit).`},
  {'phrase': `Cet atroce éloge m'a donné du courage `,'figure':'Un oxymore','explication':`"Atroce": terrible, et "éloge": discours favorable. Les deux mots sont contradictoires et ne devrait pas être mis ensemble.`},
  {'phrase': `La camisole de force, une espèce de sac de toile à voilure, emprisonna mes bras `,'figure':'Une périphrase','explication':`"Une espèce de sac...." est l'explication de "camisole".`},
  {'phrase': `C'est lui qui est bon et moi qui suis mauvais `,'figure':'Une antithèse','explication':`"Bon" et "mauvais" sont deux mots contraires.`},
  {'phrase': `L'intelligence doit abdiquer, le carcan du bagne la condamne à mort `,'figure':'Une personnification','explication':`"Le carcan" est la chaîne qui attache les condamnés. Le condamné voulait dire que le carcan condamne l'intelligence. L'intelligence est personnifiée.`},
  {'phrase': `Ils m'ont bien gardé, et puis ils ont été polis à l'arrivée et au départ, ne dois-je pas être content ? `,'figure':'Une antiphrase','explication':`Le condamné se moque lorsqu'il se demande: "ne dois-je pas être content ?"`},
  {'phrase': `La porte s'est ouverte avec la rapidité de l'éclair `,'figure':'Une hyperbole','explication':`"La rapidité d'éclair" est exagéré, il voulait parler de la rapidité avec la quelle la porte est ouverte.`},
  {'phrase': `Le soleil, le printemps, les champs pleins de fleurs, les oiseaux qui s'éveillent le matin, les nuages, les arbres, la nature, la liberté, la vie, tout cela n'est plus à moi ! `,'figure':'Une énumération','explication':`La phrase énumère plusieurs éléments: soleil, printemps, champs, oiseaux....`},
  {'phrase': `On suppose qu'il y a de l'air et du jour dans cette boîte de pierre (La cellule de prison) `,'figure':'Une métaphore','explication':`Le condamné compare la cellule à une boîte de pierre sans moyen de comparaison`},
  {'phrase': `Ma grâce ! Ma grâce ! On me fera, peut-être grâce.`,'figure':'Une répétition','explication':`Le mot "grâce" est répété plusieurs fois, la troisième fois est mis à la fin`},
  {'phrase': `Vêtus des mêmes vêtements pour le soleil de juillet et pour les froides pluies de novembre `,'figure':'Une antithèse','explication':`Deux idées contraires sont présentes dans la phrase: "soleil de juillet" et "pluie de novembre`},
  {'phrase': `Ce bruit sourd de cris que j'entends `,'figure':'Un oxymore','explication':`Dans le même groupe syntaxique, il y a deux mots contradictoires: "bruit" et "sourd"`},
  {'phrase': `Une mer de têtes sur la place `,'figure':'Une hyperbole','explication':`Une mer de tête signifie un grand nombre de personnes. La phrase contient aussi une synecdoque "tête" pour "homme"`},
  {'phrase': `Pas un regard dans l'œil, pas un accent dans la voix, pas un geste dans les mains `,'figure':'Une anaphore','explication':`"Pas un" est répété plusieurs fois aux débuts des phrases.`},
  {'phrase': `Les jours d'exécution, l'hôtel de ville vomit des gendarmes de toutes ses portes `,'figure':'Une personnification','explication':`"Vomir c'est Rejeter par la bouche ce qui est à l'estomac", et un lieu ne vomit pas c'est les êtres humains qui vomissent`},
  {'phrase': `C'est monsieur le procureur général, lui ai-je répondu, qui a demandé si instamment (fermement, résolument), ma tête ? bien de l'honneur pour moi qu'il m'écrive `,'figure':'Une antiphrase', 'explication':`On remarque le décalage entre "Le procureur qui demande la tête du condamné" et "Le condamné qui considère cela comme un honneur"`},
  {'phrase': `Je n'ai qu'une pensé, qu'une conviction, qu'une certitude : condamné à mort `,'figure':'Une gradation', 'explication':`"Pensé", "conviction" et "certitude": c'est une gradation, énumération avec un sens croissant`},
  {'phrase': `C'est du crayon, de la craie, du charbon, des lettres noires, blanches, grises `,'figure':'Une énumération', 'explication':`Il y'a deux énumérations dans la phrase: "crayon, craie, charbon" et "noires, blanches, grises"`},
  {'phrase': `On eut dit des âmes en peine aux soupiraux du purgatoire qui donnent sur l'enfer `,'figure':'Une comparaison', 'explication':`C'est une comparaison avec un outil peu utilisé "On eut dit" qui signifie "ils sont comme des âmes en peine....`},
  {'phrase': `Le pourvoi, c'est une corde qui vous tient au-dessus de l'abîme `,'figure':'Une métaphore', 'explication':`C'est une métaphore. Le pourvoi est comparé à une corde sans utiliser un moyen de comparaison.`},
  {'phrase': `Ainsi après ma mort, trois femmes,trois orphelines de différentes espèces ; trois veuves du fait de la loi `,'figure':'Une anaphore', 'explication':`C'est une anaphore: une répétition au début de plusieurs expressions ou phrases ou vers`},
  {'phrase': `Avant de m'ensevelir dans cette tombe à deux roues, j'ai jeté un regard dans la cour `,'figure':'Une métaphore', 'explication':`Le condamné compare la voiture qui le transporte à une tombe avec des roues sans utiliser de moyen de comparaison. Il y a aussi une métaphore au niveau du verbe ensevelir, dans cette voiture il est comme enseveli`},
  {'phrase': `Ma belle enfance, ma belle jeunesse, étoffe dorée dont l'extrémité est sanglante `,'figure':'métaphore', 'explication':`C'est une métaphore; le condamné compare sa vie à une étoffe dorée mais il n'y a pas d'outil de comparaison`},
  {'phrase': `Je me promenais sous les larges bras des marronniers `,'figure':'Une personnification', 'explication':`C'est une personnification. Le narrateur attribue au marronnier (arbre) des bras. L'arbre a des branches. C'est l'Homme qui a des bras.`},
  {'phrase': `Il est aussi haut que tu es bas `,'figure':'Une antithèse', 'explication':`C'est une antithèse; "haut" et "bas" sont deux mots contraires`},
  {'phrase': `Moi, j'étais là, comme une pierre qu'il mesurait `,'figure':'Une comparaison', 'explication':`C'est une comparaison; le condamné se compare à une pierre.`},
  {'phrase': `Maintenant, tout est déjà rose, jaune, vert. C'est devenu une carte postale. `,'figure':'Une Métaphore', 'explication':`C'est une métaphore; avec plein de couleurs, le lieu est devenu comme une carte postale.`},
  {'phrase': `Le jardin dormait encore. `,'figure':'Une Personnification', 'explication':`C'est une personnification. On a attribué au jardin un trait humain : le sommeil`},
  {'phrase': `C'est beau un jardin qui ne pense pas encore aux hommes. `,'figure':'Une personnification', 'explication':`C'est une personnification; Le jardin est devenu comme une personne qui pense.`},
  {'phrase': `J'ai glissé dans la campagne sans qu'elle s'en aperçoive. `,'figure':'Une personnification', 'explication':`Il s'agit d'une personnification qui fait de la campagne comme une personne qui peut s'apercevoir (voir)`},
  {'phrase': `Ah ! C'est du joli ! C'est du propre ! `,'figure':'Une Antiphrase', 'explication':`Il s'agit d'une antiphrase; la nourrice voulait dire le contraire.`},
  {'phrase': `Allons, ma vieille bonne pomme rouge. `,'figure':'Une Métaphore', 'explication':`Antigone compare sa nourrice à une bonne pomme rouge sans outil de comparaison.`},
  {'phrase': `Et il y aura les gardes…avec leur regard de bœuf. `,'figure':'Une Métaphore', 'explication':`C'est une métaphore; le regard des gardes est comparé au regard d'un boeuf sans employer d'outil de comparaison.`},
  {'phrase': `Et puis partout, des mots bizarres, venus on ne sait d’où : le taule (le bourreau), la cône (la mort), la placarde (la place des exécutions). On dirait des crapauds et des araignées. `,'figure':'Une comparaison', 'explication':`On compare "les mots bizarres" à "des crapauds et araignées"" `},
  {'phrase': `Tu penses que toute la ville hurlante contre toi…C'est assez, `,'figure':'Une métonymie', 'explication':`On parle de "Toute la ville" au lieu de dire "Tous les habitants de lav ille. C'est une métonymie où les habitants sont remplacés par le lieu`},
  {'phrase': `Je suis noire et maigre. Ismène est rose et dorée. `,'figure':'Une Antithèse', 'explication':`C'est une antithèse: "noire et maigre" s'oppose à "rose et dorée".`},
  {'phrase': `Et tu risques la mort maintenant que j'ai refusé à ton frère ce passeport dérisoire, ce bredouillage en série sur sa dépouille.`,'figure':'Une Métaphore', 'explication':`Il s'agit d'une métaphore. L'enterrement est comparé à un passeport dérisoire sans utiliser ni comparé ni outil de comparaison`},
  {'phrase': `J'ai le mauvais rôle et tu as le bon. `,'figure':'Une Antithèse', 'explication':`C'est une antithèse; les mots "mauvais" et "bon" sont des contraires.`},
  {'phrase': `Tu as toute la vie devant toi….Tu as ce trésor, toi. `,'figure':'Une Métaphore', 'explication':`C'est une métaphore; Créon parle à Antigone de la vie. Il compare la vie à un trésor mais sans utilser de moyen de comparaison.`},
  {'phrase': `La vie, c'est un livre qu'on aime, c'est un enfant qui joue à vos pieds, un outil qu'on tient bien dans sa main. `,'figure':'Une Métaphore', 'explication':`"La vie" est comparée à "un livre", à "un enfant" et à "un outil" sans moyen de comparaison; c'est une métaphre.`},
  {'phrase': `Vous me dégoûtez tous, avec votre bonheur ! On dirait des chiens qui lèchent tout ce qu’ils trouvent. `,'figure':'Une Comparaison', 'explication':`Il s'agit d'une comparaison. Antigone compare les gens qui voulaient la convaincre de renoncer à son projet (vous) à "des chiens". Le moyen de comparaison est "on dirait"`},
  {'phrase': `Il fallait y aller ce matin, à quatre pattes, dans la nuit.`,'figure':'Une hyperbole', 'explication':`"à quatre pattes" est une exagération, c'est pour dire qu'il fallait enterre le cadavre de Polynice à tout prix.`},
  {'phrase': `Tu es en train de défendre ton bonheur en ce moment comme un os. `,'figure':'Une comparaison', 'explication':`Il s'agit d'une comparaison. Antigone compare "Créon qui défend le bonheur" à "un chien qui défend son os".`},
  {'phrase': `C'est vous qui êtes laids, même les plus beaux. `,'figure':'Une antithèse', 'explication':`Il y a une opposition entre "laids" est "beaux". C'est une antithèse puisque les deux mots sont placés chacun dans un groupe syntaxique différent.`},
  {'phrase': `Allons vite, cuisinier, appelle tes gardes ! `,'figure':'Une métaphore', 'explication':`Antigone appelle Créon par "Cuisinier"; C'est une métaphore puisqu'il n'y a pas d'outil.`},
  {'phrase': `Tu as choisi la vie et moi la mort. `,'figure':'Une Antithèse', 'explication':`Antigone oppose "la vie" et "la mort"; il s'agit d'une antithèse.`},
  {'phrase': `Ne laisse pas mourir Antigone, Créon ! Nous allons tous porter cette plaie au côté, pendant des siècles.`,'figure':'Une Métaphore', 'explication':`Le choeur compare l'execution d'Antigone à "une plaie"(une blessure). Il s'agit d'une métaphore en l'absence d'outil.`},
  {'phrase': `Oublie-la, Hémon ; oublie-la, mon petit. `,'figure':'Une Anaphore', 'explication':`Il y a répétition de "oublie-là" deux fois au début de deux phrases; il s'agit d'une anaphore.`},
  {'phrase': `Tout Thèbes sait ce qu'elle a fait. `,'figure':'Une Métonymie', 'explication':`C'est une métonymie: on a remplacé "les habitants de Thèbes" par "Thèbes".`},
  {'phrase': `Antigone ne peut plus vivre. Antigone nous a déjà quittés, tous. `,'figure':'Un euphémisme', 'explication':`Créon dit qu'Antigone a déjà quitté; au lieu de dire qu'elle est morte. Il a utilisé un mot moins choquant: quitter car il sait combien son fils aime Antigone.`},
  {'phrase': `Créon, il est sorti comme un fou. (Il:Hémon)`,'figure':'Une Comparaison', 'explication':`Il compare "Hémon" qui est sorti en courant à "un fou".`},
  {'phrase': `Ce dieu géant qui m'enlevait dans ses bras et me sauvait des monstres et des ombres, c'était toi ? `,'figure':'Une métaphore', 'explication':`Hémon compare "son père, Créon" à "un dieu géant" sans utiliser de comparatif.`},
  {'phrase': `Ô tombeau ! Ô lit nuptial ! Ô demeure souterraine ! `,'figure':'Une métaphore', 'explication':`Antigone appelle "le tombeau" et le compare à un "lit nutial" et à "une demeure souterraine". Il s'agit d'une métaphore puisqu'il n'y pas de comparatif`},
  {'phrase': `Il faut pourtant qu'il y en ait qui mènent la barque. `,'figure':'Une Métaphore', 'explication':`"La barque" désigne ici "le pays". Créon compare l'Etat à une barque (un bateau) qui a besoin de gouverneur.`},
  {'phrase': `Et il se lève, tranquille, comme un ouvrier au seuil de sa journée. `,'figure':'Une Comparaison', 'explication':`C'est une comparaison, Créon est comparé à "un ouvrier".`},
  {'phrase':`La planète est une poubelle.`, 'figure':'Une métaphore', 'explication':`Il s’agit d’une métaphore : on établit un lien entre deux réalités (planète et poubelle) sans terme explicite de comparaison (comme, tel que, ainsi que...).`},
  {'phrase':`Vous aimez votre café noir et vos dents blanches.`, 'figure':'Une antithèse', 'explication':`C’est une antithèse : on rapproche deux contraires (café noir et dents blanches) dans une même phrase pour créer un effet de contraste.`},
  {'phrase':`Revenir d’exil comporte des risques. Comme rentrer une aiguille dans un vieux disque.`, 'figure':'Une comparaison', 'explication':`Il s’agit d’une comparaison, car on rapproche deux réalités à l’aide d’un terme explicite de comparaison (comme).`},
  {'phrase':`Des faits divers semblables à des tragédies grecques`, 'figure':'Une comparaison', 'explication':`C’est une comparaison, parce qu’on rapproche deux réalités à l’aide d’un terme explicite de comparaison (semblables à).`},
  {'phrase':`J’ai tout perdu : mes vêtements, ma maison, ma famille.`, 'figure':'Une gradation', 'explication':`C’est une gradation ascendante : on énumère des termes selon un ordre croissant, du plus faible (vêtements) au plus fort (famille).`},
  {'phrase':`Interami : quand vos proches sont loin.`, 'figure':'Une antithèse', 'explication':`C’est une antithèse : on rapproche deux contraires (proches et loin) dans un même énoncé pour créer un jeu de mots.`},
  {'phrase':`Je l’aime un peu, beaucoup, passionnément.`, 'figure':'Une gradation', 'explication':`C’est une gradation ascendante : on présente des termes selon un ordre de valeur croissant, du plus faible (un peu) au plus fort (passionnément).`},
  {'phrase':`Ô beauté? Ton regard, infernal et divin, Verse confusément le bienfait et le crime`, 'figure':'', 'explication':`Cet exemple présente deux antithèses, parce qu’on rapproche les expressions contraires suivantes : infernal/divin et bienfait/crime. Cet exemple présente aussi une métaphore (le regard qui verse), mais les antithèses ressortent davantage.`},
  {'phrase':`Quand il éternuait, la montagne entière tonnait.`, 'figure':'Une hyperbole', 'explication':`Il s’agit d’une hyperbole puisqu’il y a une nette exagération de la réalité. (Tonner: faire du bruit de tonner)`},
  {'phrase':`C’est une dame d’un certain âge.`, 'figure':'Une euphémisme', 'explication':`C’est un euphémisme, parce qu’on remplace un terme qui pourrait être jugé offensant (vieille) par un terme atténué (certain âge).`},
  {'phrase':`Qu’avec toutes les larmes qui tombent. J’ai pensé calmer mes remords. Et fournir en eau le Tiers-Monde`, 'figure':'Une hyperbole', 'explication':`C’est une hyperbole : prétendre pouvoir fournir en eau le Tiers-Monde avec des larmes parait largement exagéré.`},
  {'phrase':`Les femmes le disent. Les tests le prouvent.`, 'figure':'Un parallélisme', 'explication':`Il s’agit d’un parallélisme, car les deux phrases sont construites de la même façon (même syntaxe) et portent sur un même objet : l’efficacité d’un produit de beauté.`},
  {'phrase':`Il était prêt pour le dernier voyage de la vie.`, 'figure':'Une euphémisme', 'explication':`Il s’agit d’un euphémisme utilisé pour atténuer la douloureuse réalité qu’est la mort.`},
  {'phrase':`Mon sillon? Le voilà. Ma gerbe? La voici.`, 'figure':'Un parallélisme', 'explication':`Les deux premières phrases sont construites comme les deux dernières. Il s’agit donc d’un parallélisme.`},
  {'phrase':`Et passent des cocotiers. Qui écrivent des chansons d’amour`, 'figure':'Une personnification', 'explication':`C’est une personnification, car on prête une capacité humaine (écrire) à un arbre.`},
  {'phrase':`Elle travaille vingt-six heures par jour, huit jours sur sept.`, 'figure':'Une hyperbole', 'explication':`C’est une hyperbole, car la réalité est exagérée, voire impossible.`},
  {'phrase':`Des trains sifflaient de temps à autre et des chiens hurlaient de temps en temps.`, 'figure':'Un parallélisme', 'explication':`C’est un parallélisme, car les deux phrases syntaxiques (de chaque côté du et) sont construites de la même façon et portent sur un même objet : le bruit.`},
  {'phrase':`Je suis d’Amérique et de France<br/>Je suis de chômage et d’exil<br/>Je suis d’octobre et d’espérance<br/>Je suis une race en péril`, 'figure':'Une anaphore', 'explication':`Parce que les mêmes mots se répètent au début des vers, il s’agit d’une anaphore.`},
  {'phrase':`Manger pour vivre ou vivre pour manger.`, 'figure':'Un chiasme', 'explication':`Il s’agit d’un chiasme, car les termes sont inversés d’une phrase à l’autre : Manger pour vivre / vivre pour manger.`},
  {'phrase':`le soleil noir de la mélancolie`, 'figure':'Un oxymore', 'explication':`C'est un oxymore : l’auteur unit deux mots apparemment contradictoires (soleil et noir) pour parler d’une seule et même réalité, d’un seul et même objet.`},
  {'phrase':`Les mariniers me voient vieillir<br/>Je vois vieillir les mariniers`, 'figure':'Un chiasme', 'explication':`C’est un chiasme : l’auteur dispose les termes de ces deux vers de façon inversée, croisée.`},
  {'phrase':`Ce dessert n’est pas mauvais du tout.`, 'figure':'Une litote', 'explication':`C’est une litote puisqu’on atténue une réalité positive. En fait, on veut dire que ce dessert est très bon.`},
  {'phrase':`Je sais que c’est la coutume<br/>D’adorer ces nains géants`, 'figure':'Un oxymore', 'explication':`C’est un oxymore : l’auteur unit deux mots apparemment contradictoires (nains et géants) en les plaçant côte à côte pour parler d’une seule et même réalité.`},
  {'phrase':`Un roi chantait en bas, en haut mourait un Dieu.`, 'figure':'Un chiasme', 'explication':`C’est un chiasme : dans un même vers, l’auteur dispose les termes de manière inversée, croisée. Attention ce n'est pas un parallélisme. Si c'était le cas on aurait dit: «Un roi chantait en bas, un Dieu mourait en haut.»`},
  {'phrase':`Pas de cuillère. Pas de mélange. Pas d’excuse.`, 'figure':'Un anaphore', 'explication':`C’est une anaphore, parce que les trois phrases de l’exemple commencent par les mêmes mots. Comme ces phrases sont construites de la même façon, on pourrait aussi parler de parallélisme.`},
  {'phrase':`J’ai lu un Guy de Maupassant pendant mes vacances.`, 'figure':'Une métonymie', 'explication':`C’est une métonymie, parce qu’on peut lier les mots substitués (un livre) aux mots employés (un Guy de Maupassant) dans un rapport logique (on prend l’auteur pour le livre).`},
  {'phrase':`De vieilles mains attendent une lettre.`, 'figure':'Une synecdoque', 'explication':`C’est une synecdoque, parce qu’on remplace le tout (la personne) par l’une de ses parties (les mains); on relie ces termes dans un rapport d’inclusion.`},
  {'phrase':`Il est difficile d’obtenir un volant en course automobile.`, 'figure':'Une métonymie', 'explication':`C’est une métonymie, car il existe un lien logique entre les mots substitués (un poste de pilote) et le terme employé (volant).`},
  {'phrase':`Ce gâteau n’est pas mauvais`, 'figure':'Une litote', 'explication':`C'est une litote qui est une figure d’atténuation. On dit moins pour suggérer davantage. Elle se reconnaît à sa forme négative.`},
  {'phrase':`Ma jeunesse ne fut qu’un ténébreux orage`, 'figure':'Une métaphore', 'explication':`C'est une métaphore; l'auteur compare 'ma jeunesse' à un 'ténébreux orage' sans moyen de comparaison`},
  {'phrase':`Ah ! Quelle cruauté, qui tout en un jour tue Le père par le fer, la fille par la vue`, 'figure':'Une métonymie', 'explication':`Il s'agit d'une métonymie. On utilise un mot à la place d'un autre. Les deux mots doivent avoir une relation logique; Ici, 'le fer' à la place de 'l’épée'.`},
  {'phrase': `Va, je ne te hais point !`, 'figure':'Une litote', 'explication':`C'est une litote où on dit moins pour dire plus. Le personnage voulait dire: "Je t'aime beaucoup"`},
  {'phrase': `Le soleil aussi attendait Chloé,`, 'figure':'Une personnification', 'explication':`C'est une personnification; on a attribué au soleil un caractère humain 'attendre'`},
  {'phrase': `Cette obscure clarté qui tombe des étoiles`, 'figure':'Un oxymore', 'explication':`C'est un oxymore; 'obscure' et 'clarté' sont deux mots contradictoires`},
  {'phrase': `Voilà des bontés dont vous m’avez toujours honoré ! », dit Figaro dans Le Barbier de Séville, après s’être fait insulter.`, 'figure':'Une antiphrase', 'explication':`Le personnage, insulté, dit qu'il est 'honoré'. Il signifie le contaire.`},
  {'phrase': `Un souffle, une ombre, un rien, tout lui donnait la fièvre.`, 'figure':'Une gradation', 'explication':`C'est une gradation. Les trois mots 'souffle', 'ombre' et 'rien' ont un sens qui se développent de manière descendante`},
  {'phrase': `Paris a froid. Paris a faim. Paris ne mange plus de marrons dans la rue.`, 'figure':'Une synecdoque', 'explication':`C'est une synecdoque; le lieu (Paris) est mis à la place des habitants: ce sont les habitants de Paris qui ont faim`},
  {'phrase': `Une personne à la mode ressemble à une fleur bleue`, 'figure':'Une comparaison', 'explication':`Il s'agit d'une comparaison car on compare 'une personne à la mode' à 'une fleur bleue'`},
  {'phrase': `Je vis les arbres s’éloigner en agitant leurs bras désespérés.`, 'figure':'Une personnification', 'explication':`On personnifie l'arbre en lui attribuant 'des bras';`},
  {'phrase': `Le bonheur est une perle rare `, 'figure':'Une métaphore', 'explication':`C'est une métaphoreLe bonheur est comparé à une perle rare mais sans utiliser de comparatif.`},
  {'phrase': `Cosette n’était pas laide`, 'figure':'Une litote', 'explication':`"n'est pas laide' signifie que Cosette était 'très belle'; on dit moins pour signifier plus.`},
  {'phrase': `La montagne s’ennuie toute seule`, 'figure':'Une personnification', 'explication':`C'est une personnification: on a attribué une émotion 'l'ennui' à un objet 'l'arbre'`},
  {'phrase': `Il est touché, il est blessé, il est mort`, 'figure':'Une gradation', 'explication':`Il s'agit d'une gradation: le sens se développe du début à la fin de la phrase: touché < blessé < mort.`},
  {'phrase': `Cette petite grande âme venait de s’envoler »`, 'figure':'Un oxymore', 'explication':`Il s'agit d'un oxymore car les mots 'petite' et 'grande' sont contraires`},
  {'phrase': `La vie de l’homme est un combat.`, 'figure':'Une métaphore', 'explication':`Une métaphore: 'la vie' est comparée à 'un combat' sans comparatif`},
  {'phrase': `Ces cocotiers qui écrivent des chansons d’amour`, 'figure':'Une personnification', 'explication':`C'est une personnification. On attribue un caractère humain "l'écriture" à un objet "l'arbre".`},
  {'phrase': `Elle a une langue de vipère.`, 'figure':'Une métaphore', 'explication':`Le narrateur signifie : "Elle a une langue comme la langue de vipère". C'est une métaphore puisqu'il y a une comparaison sans outil`},
  {'phrase': `L’avion est tel un oiseau perdu dans le ciel bleu.`, 'figure':'Une comparaison', 'explication':`C'est une comparaison avec l'outil : "tel". On compare l'avion à un oiseau`},
  {'phrase': `La petite fleur ouvre ses bras et esquisse un joli sourire.`, 'figure':'Une personnification', 'explication':`On donne à la fleur des bras et un sourire.`},
  /*{'phrase': `Elle versait des torrents de larmes.`, 'figure':'Une hyperbole', 'explication':``},
  {'phrase': `Il se conduit comme un fou.`, 'figure':'Une comparaison', 'explication':`C'est une comparaison : On compare le conduite de la personne à celle d'un fou`},
  {'phrase': `Ses cheveux, on dirait une forêt amazonienne.`, 'figure':'Une comparaison', 'explication':``},
  {'phrase': `Le pays était plongé dans des ruisseaux de sang.`, 'figure':'Une hyperbole', 'explication':``},
  {'phrase': `Le ciel était un plafond de diamants rayonnants.`, 'figure':'Une métaphore', 'explication':``},
  {'phrase': `Notre maison était triste, je croyais entendre ses plaintes.`, 'figure':'Une personnification', 'explication':``},
  {'phrase': `Ce bruit aurait réveillé un mort !`, 'figure':'Une hyperbole', 'explication':``},
  {'phrase': `Le vent hurlait sous les portes.`, 'figure':'', 'explication':``},
  {'phrase': `Ton cœur est un coffre-fort.`, 'figure':'Une métaphore', 'explication':``},
  {'phrase': `Le ciel était clair, mes pensées étaient sombres.`, 'figure':'Une antithèse', 'explication':``},
  {'phrase': `Tes yeux sont deux poèmes qui se lisent en silence.`, 'figure':'Une métaphore', 'explication':``},
  {'phrase': `Je vous l'ai déjà répété cinquante millions de fois.`, 'figure':'Une hyperbole', 'explication':``},
  {'phrase': `Il vit dans un océan de bonheur.`, 'figure':'Une hyperbole', 'explication':``},
  {'phrase': `Elle était aussi belle que la lune.`, 'figure':'Une comparaison', 'explication':``},
  {'phrase': `Ces bourreaux sont des hommes très doux.`, 'figure':'Une antithèse', 'explication':``},
  {'phrase': `Plutôt cent fois la mort !`, 'figure':'Une hyperbole', 'explication':`Le condamné exagère son idée : il est impossible de mourir cent fois.`},
  {'phrase': `Cette pensée infernale, me secouant de ses deux mains.`, 'figure':'Une personnification', 'explication':`Le narrateur donne à l'idée deux mains qui secouent : C'est une personnification de l'idée de mort`},
  /*{'phrase': ``, 'figure':'', 'explication':``}*/
]

const l=console.log
export function qcmFigures(bloc){
  const div = document.createElement('div')
  div.innerHTML = codeHtml()
  div.classList.add('qcm')
  bloc.appendChild(div)

   // entete close / home
    let home = document.querySelector('.home')
    home.onclick = () => { homeAct(div) }
    
    let close=document.querySelector('.close')
    close.onclick = () => { closeAct(div); }
  
    const listFigures=['Une comparaison', 'Une métaphore', 'Une personnification', 'Un oxymore', 'Une antithèse', 'Une antiphrase', 'Une métonymie', 'Une synecdoque', 'Une hyperbole', 'Une anaphore']
    const wrapper=document.querySelector('.wrapper')
    const qst = document.querySelector('.qst')
    const c1 = document.querySelector('.c1')
    const c2 = document.querySelector('.c2')
    const c3 = document.querySelector('.c3')
    const cs=document.querySelectorAll('.les-choix div')
    
    const valider = document.querySelector('.valider')
    const suivant = document.querySelector('.suivant')
    const myScore = document.querySelector('.score')
    
    const explication=document.querySelector('.explication')
    const explicationMsg=document.querySelector('.explication-msg')
    
    let currentPhrase = 0, choosenRep, reponse, score= 0
    let index=0, nbrQst =10, nbrSession=1, questions=[]
    let enableClick=true
    
    // shuffle phrases
    phrases.sort(function(a, b){return 0.5 - Math.random()})
    
    //charger n questions dans un tableau
    for (let i = index; i < index + nbrQst; i++) {questions.push(phrases[i])}
  
    
    loadPhrase()
    function loadPhrase(){
      choosenRep=undefined
      enableClick=true
      // supprimer toutes les classes
      for(let i=0; i<3; i++){
        cs[i].className="choix c" + (i+1)
      }
      explication.style.left="-50%"
    
      qst.innerHTML=questions[currentPhrase].phrase
      reponse=questions[currentPhrase].figure
      
      //creer tableau de trois figures uniques
      let arrayThreeFig=[questions[currentPhrase].figure]
      for(let m=0; m<2; m++){
        let randIndex=Math.floor(Math.random()*listFigures.length)
        arrayThreeFig.includes(listFigures[randIndex]) ? m-- : arrayThreeFig.push(listFigures[randIndex])
      }
      // shuffle choices
      arrayThreeFig.sort(function(a, b){return 0.5 - Math.random()})
      c1.innerHTML=arrayThreeFig[0]
      c2.innerHTML=arrayThreeFig[1]
      c3.innerHTML=arrayThreeFig[2]
    }
    
    // gestion des sélections
    cs.forEach((item,i)=>{
      item.addEventListener('click', ()=>{
        if(!enableClick) return
        for(let i=0; i<3; i++){cs[i].classList.remove('selected')}
          item.classList.add('selected')
          choosenRep=item     
      })
    })
    
    // Verifier la réponse
    valider.addEventListener('click',()=>{
      if(!choosenRep || !enableClick) return
      enableClick = false
      //valider.removeEventListener('click',valid)
      if(choosenRep.innerText == reponse){
        choosenRep.classList.add('correct')
        score+=10;
        myScore.innerText= score  
      } else{
        choosenRep.classList.add('incorrect')
        const reponseCorrect = Array.from(cs).filter(rep=>{return rep.innerText==reponse})[0]
        reponseCorrect.classList.add('correct')    
      }
      explicationMsg.innerHTML = questions[currentPhrase].explication
      explication.style.left="50%"
      explication.style.opacity=1
    
      // Afficher stats
      let resultat={
        score : score / 10,
        nbrQst: nbrQst,
        end:nbrSession
      }
    
      if (currentPhrase+1 == nbrQst) modalFinSession(div, reinitialiser, resultat)
    })
    
    suivant.addEventListener('click', ()=>{
      if (currentPhrase+1==nbrQst) return
      currentPhrase++
      loadPhrase()
    })
    
    function reinitialiser(re){  
      currentPhrase = 0
      score = 0
      questions = []      
      myScore.innerText = "00"
      
      if (re) {
        index += nbrQst;
        nbrSession+=1
      }

      for (let i = index; i < index + nbrQst; i++) {questions.push(phrases[i])}
      loadPhrase()  
    }
    
    function codeHtml(){
      const html =`${entete()}
  <div class="figure-wrapper">
    
    <div class="qst">
      <p></p>
    </div>
    <div class="les-choix">
      <div class="choix c1"></div>
      <div class="choix c2"></div>
      <div class="choix c3"></div>
    </div>

    <div class="explication">
      <div class="explication-msg"> </div>
      <div class="suivant"></div>
    </div>
    
    <div class="score">00</div>

    <div class="q-foot"> 
      <div class="valider">Valider</div>    
    </div>
  </div>
  <style>
.fermerImg{
  width: 30px;
  height: 30px;
  background: url('../../assets/img/home.svg');
  background-repeat: no-repeat;
  background-size: contain;
}


.qst{
  font-size: 1.3rem;
  margin: 20px 15px;
  padding: 10px;
  color: var(--secf);
  text-align: left;
  width: 90%;
  height: 140px;
  border: 1px solid var(--comp);
  border-radius: 10px;
  min-height: 80px;
  overflow-y: auto;
}
.c1, .c2, .c3{
  color: #fff;
  width: 90%;
  padding: 8px 15px ;
  margin: 10px auto;
  border: 1px solid var(--comp);
  border-radius: 28px;
  font-size: 1.1rem;
  color: var(--secf)
  transition: .3s;
}

.selected{
   background-color: var(--secc);
}
.correct{
   background-color: var(--correct);
}
.incorrect{
  background-color: var(--incorrect);
}

.score{
 font-size: 2rem;
 margin: 0px auto;
 width: 80px;
 height: 80px;
 line-height: 80px;
 text-align: center;
 border-radius: 50%;
 border: 3px solid var(--secf);
}
.q-foot{
  display: flex;
  justify-content: center ;
  align-items: center;
  margin: 40px auto 0;
  width: 100%;
}

.valider{
   background-color: var(--comp);
   color: var(--pr);
   border-radius: 30px;
   width: 250px;
   height: 60px;
   line-height: 60px;
   text-align: center;
   font-weight: bold;
   font-size : 1rem;
   transition: .3s;
   margin: 15px auto ;
}

.explication{
  position: absolute;
  bottom: 40px; left: -50%;
  opacity: 0;
  transform: translate(-50%,-5%);
  width: 90%;
  min-height: 150px;
  padding: 10px 5px 15px 10px;
  color: white;
  background-color: #3ab0ff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 20px;
  transition: .2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.explication-msg{
flex-basis: 90%}

.suivant{
  width: 30px; 
  height: 30px;
 background-image: url(../../assets/img/next.svg);
 background-size: 20px;
 background-repeat: no-repeat; 
 flex-basis: 10%;
}
      </style>`
      return html
    } 
}
