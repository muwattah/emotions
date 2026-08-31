const EMOTIONS = [
  { id: "verdriet", name: "Verdriet", face: "😢" },
  { id: "angst", name: "Angst / zorgen", face: "😟" },
  { id: "boos", name: "Boosheid", face: "😠" },
  { id: "eenzaam", name: "Eenzaamheid", face: "🤍" },
  { id: "blij", name: "Blijdschap", face: "😊" },
  { id: "dankbaar", name: "Dankbaarheid", face: "🙏" },
  { id: "spijt", name: "Spijt / schuld", face: "😔" },
  { id: "moe", name: "Moe / overweldigd", face: "😮‍💨" },
  { id: "hoop", name: "Hoop nodig", face: "🌱" },
  { id: "rust", name: "Onrust / zoek rust", face: "🌙" }
];

const TEXTS = {
  verdriet: [
    { arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ", text: "Wees niet zwak en wees niet bedroefd, terwijl jullie de bovenhand hebben als jullie gelovigen zijn.", ref: "Koran 3:139" },
    { arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", text: "Voorwaar, met de moeilijkheid is er verlichting.", ref: "Koran 94:6" },
    { arabic: "وَبَشِّرِ الصَّابِرِينَ الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ", text: "En verkondig goed nieuws aan de geduldigen: zij die, wanneer hen een ramp treft, zeggen: Voorwaar, wij behoren aan Allah en tot Hem keren wij terug.", ref: "Koran 2:155-156" },
    { arabic: "", text: "De Profeet ﷺ zei: Geen vermoeidheid, ziekte, zorg, verdriet, hinder of verdriet treft een moslim — zelfs geen doorn die hem prikt — of Allah wist daarmee een deel van zijn zonden uit.", ref: "Sahih al-Bukhari 5641, Sahih Muslim 2573" },
    { arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", text: "Dus voorwaar, met de moeilijkheid is er verlichting.", ref: "Koran 94:5" }
  ],
  angst: [
    { arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", text: "Weet: door de gedachtenis aan Allah komen de harten tot rust.", ref: "Koran 13:28" },
    { arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", text: "Allah is ons voldoende, en Hij is de beste Beschermer.", ref: "Koran 3:173" },
    { arabic: "قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا", text: "Zeg: Ons zal niets overkomen behalve wat Allah voor ons heeft bepaald.", ref: "Koran 9:51" },
    { arabic: "", text: "De Profeet ﷺ zei: Wie ’s ochtends zegt: ‘O Allah, ik zoek toevlucht bij Jou tegen zorg en verdriet…’ — Allah neemt zijn zorg van hem weg.", ref: "Sunan Abi Dawud 5080 (betekenis)" },
    { arabic: "اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا", text: "Allah is de Beschermer van hen die geloven.", ref: "Koran 2:257" }
  ],
  boos: [
    { arabic: "وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ ۖ وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ", text: "En zij die hun woede inhouden en de mensen vergeven — Allah houdt van de weldoeners.", ref: "Koran 3:134" },
    { arabic: "", text: "De Profeet ﷺ zei: De sterke is niet wie in worstelen wint, maar wie zichzelf beheerst in woede.", ref: "Sahih al-Bukhari 6114, Sahih Muslim 2609" },
    { arabic: "", text: "De Profeet ﷺ zei: Als iemand van jullie woedend wordt terwijl hij staat, laat hij gaan zitten. Als de woede blijft, laat hij gaan liggen.", ref: "Sunan Abi Dawud 4782" },
    { arabic: "وَإِذَا مَا غَضِبُوا هُمْ يَغْفِرُونَ", text: "En wanneer zij woedend zijn, vergeven zij.", ref: "Koran 42:37" },
    { arabic: "", text: "De Profeet ﷺ zei: Woede komt van de shaytan, en de shaytan is geschapen uit vuur. Het vuur wordt geblust met water, dus als een van jullie woedend wordt, laat hij wudu doen.", ref: "Sunan Abi Dawud 4784" }
  ],
  eenzaam: [
    { arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ", text: "En Hij is met jullie waar jullie ook zijn.", ref: "Koran 57:4" },
    { arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ", text: "En Wij zijn dichter bij hem dan de halsslagader.", ref: "Koran 50:16" },
    { arabic: "", text: "De Profeet ﷺ zei: Allah zegt: Ik ben zoals Mijn dienaar over Mij denkt, en Ik ben met hem wanneer hij Mij gedenkt.", ref: "Sahih al-Bukhari 7405, Sahih Muslim 2675" },
    { arabic: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا", text: "Wees niet bedroefd, voorwaar Allah is met ons.", ref: "Koran 9:40" },
    { arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", text: "Voorwaar, Allah is met de geduldigen.", ref: "Koran 2:153" }
  ],
  blij: [
    { arabic: "قُلْ بِفَضْلِ اللَّهِ وَبِرَحْمَتِهِ فَبِذَٰلِكَ فَلْيَفْرَحُوا", text: "Zeg: Door de gunst van Allah en door Zijn barmhartigheid — laat hen zich daarin verheugen.", ref: "Koran 10:58" },
    { arabic: "", text: "De Profeet ﷺ zei: Voor wie de islam prettig is, dat is voldoende. En wie genoeg heeft aan wat Allah hem gaf, is rijk.", ref: "betekenis naar hadith over tevredenheid / rida" },
    { arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", text: "Welke van de gunsten van jullie Heer ontkennen jullie dan?", ref: "Koran 55:13" },
    { arabic: "", text: "De Profeet ﷺ glimlachte vaak. Een glimlach naar je broeder is sadaqa.", ref: "Jami' at-Tirmidhi 1956 (betekenis)" },
    { arabic: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ", text: "En wat betreft de gunst van jouw Heer: spreek erover.", ref: "Koran 93:11" }
  ],
  dankbaar: [
    { arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ", text: "Als jullie dankbaar zijn, zal Ik jullie zeker vermeerderen.", ref: "Koran 14:7" },
    { arabic: "وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ", text: "En wees Mij dankbaar en wees niet ondankbaar.", ref: "Koran 2:152" },
    { arabic: "", text: "De Profeet ﷺ zei: Wie Allah niet dankt, dankt de mensen niet.", ref: "Sunan Abi Dawud 4811, at-Tirmidhi 1954" },
    { arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", text: "Alle lof is aan Allah, de Heer van de werelden.", ref: "Koran 1:2" },
    { arabic: "", text: "De Profeet ﷺ zei: Kijk naar wie onder jullie staat, en kijk niet naar wie boven jullie staat. Dat weerhoudt jullie ervan de gunst van Allah gering te achten.", ref: "Sahih Muslim 2963" }
  ],
  spijt: [
    { arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", text: "Zeg: O Mijn dienaren die tegen zichzelf hebben overdreven, wanhoop niet aan de barmhartigheid van Allah.", ref: "Koran 39:53" },
    { arabic: "إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ", text: "Voorwaar, Allah houdt van hen die berouw tonen.", ref: "Koran 2:222" },
    { arabic: "", text: "De Profeet ﷺ zei: Degene die berouw toont van een zonde is als iemand die geen zonde heeft.", ref: "Sunan Ibn Majah 4250" },
    { arabic: "وَهُوَ الَّذِي يَقْبَلُ التَّوْبَةَ عَنْ عِبَادِهِ", text: "En Hij is Degene Die het berouw van Zijn dienaren aanvaardt.", ref: "Koran 42:25" },
    { arabic: "", text: "De Profeet ﷺ zei: Allah is blijer met het berouw van Zijn dienaar dan iemand van jullie die in de woestijn zijn kameel terugvindt.", ref: "Sahih al-Bukhari 6308, Sahih Muslim 2747" }
  ],
  moe: [
    { arabic: "يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ", text: "Allah wil voor jullie het gemak en Hij wil voor jullie geen moeilijkheid.", ref: "Koran 2:185" },
    { arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", text: "Allah belast geen ziel behalve naar haar vermogen.", ref: "Koran 2:286" },
    { arabic: "", text: "De Profeet ﷺ zei: Maak het de mensen gemakkelijk en maak het hen niet moeilijk. Breng goed nieuws en jaag hen niet weg.", ref: "Sahih al-Bukhari 69, Sahih Muslim 1734" },
    { arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا إِنَّ مَعَ الْعُسْرِ يُسْرًا", text: "Want met de moeilijkheid is er verlichting. Voorwaar, met de moeilijkheid is er verlichting.", ref: "Koran 94:5-6" },
    { arabic: "", text: "De Profeet ﷺ zei: Jullie religie is makkelijk. Wie de religie te zwaar maakt, wordt erdoor overweldigd. Wees daarom gematigd.", ref: "Sahih al-Bukhari 39" }
  ],
  hoop: [
    { arabic: "إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ", text: "Voorwaar, niemand wanhoopt aan de geest (hulp) van Allah behalve het ongelovige volk.", ref: "Koran 12:87" },
    { arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ", text: "Wie Allah vreest, Hem maakt Hij een uitweg, en Hij voorziet hem van waar hij het niet verwacht.", ref: "Koran 65:2-3" },
    { arabic: "إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ", text: "Voorwaar, de barmhartigheid van Allah is nabij de weldoeners.", ref: "Koran 7:56" },
    { arabic: "", text: "De Profeet ﷺ zei: Wees optimistisch, want Allah houdt van optimisme.", ref: "overgeleverd in betekenis; zie ook hadith over fa'l (goede verwachting)" },
    { arabic: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ", text: "En het kan zijn dat jullie iets haten terwijl het goed voor jullie is.", ref: "Koran 2:216" }
  ],
  rust: [
    { arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", text: "Weet: door de gedachtenis aan Allah komen de harten tot rust.", ref: "Koran 13:28" },
    { arabic: "هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ", text: "Hij is Degene Die rust in de harten van de gelovigen nederzond.", ref: "Koran 48:4" },
    { arabic: "يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً", text: "O jij ziel in rust, keer terug naar jouw Heer, tevreden en welgevallig.", ref: "Koran 89:27-28" },
    { arabic: "", text: "De Profeet ﷺ zei: De vergelijking van degene die zijn Heer gedenkt en degene die dat niet doet, is als de levende en de dode.", ref: "Sahih al-Bukhari 6407" },
    { arabic: "وَجَعَلْنَا اللَّيْلَ لِبَاسًا", text: "En Wij maakten de nacht tot een bedekking.", ref: "Koran 78:10" }
  ]
};
