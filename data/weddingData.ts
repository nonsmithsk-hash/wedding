export interface CeremonyEvent {
  id: string;
  title: string;
  hindiTitle?: string;
  subtitle?: string;
  date?: string;
  time?: string;
  venue: string;
  location: string;
  bgImage: string;
  scheduleItems?: { label: string; timeVenue: string }[];
  themeColor: string;
  accentColor: string;
  badgeText: string;
}

export interface WeddingData {
  couple: {
    groom: {
      name: string;
      fullName: string;
      honorific: string;
      parents: string;
      residence: string;
    };
    bride: {
      name: string;
      fullName: string;
      honorific: string;
      parents: string;
      residence: string;
    };
    monogram: string;
    headline: string;
  };
  invocation: {
    shloka: string;
    blessing: string;
  };
  ceremonies: CeremonyEvent[];
  family: {
    balAagrah: {
      quote: string;
      children: string;
    };
    chachaJi: string;
    brothers: string;
    vineet: {
      family: string;
      address: string;
    };
  };
  venueMapUrl: string;
}

export const weddingData: WeddingData = {
  couple: {
    groom: {
      name: 'राकेश',
      fullName: 'वर पक्ष: राकेश यादव',
      honorific: 'वर पक्ष',
      parents: 'श्रीमती नीलम देवी एवं श्री रामचन्द्र यादव',
      residence: 'ग्राम - पठखौली, पोस्ट - शिवली राशिद गंज, जिला - आजमगढ़',
    },
    bride: {
      name: 'पूजा',
      fullName: 'वधू पक्ष: पूजा यादव',
      honorific: 'वधू पक्ष',
      parents: 'श्रीमती खुशी देवी एवं श्री कर्मजीत यादव',
      residence: 'ग्राम - नाहूपुर, पोस्ट - सोडरी, जिला - आजमगढ़',
    },
    monogram: 'RP',
    headline: 'राकेश संग पूजा',
  },
  invocation: {
    shloka: '॥ श्री गणेशाय नमः ॥',
    blessing:
      'परम पिता परमात्मा की असीम अनुकम्पा एवं पूज्य पूर्वजों के शुभाशीर्वाद से मांगलिक परिणय उत्सव',
  },
  ceremonies: [
    {
      id: 'tilak',
      title: 'तिलक एवं शगुन',
      hindiTitle: '॥ मांगलिक कार्यक्रम ॥',
      subtitle: 'पारंपरिक मांगलिक रीति-रिवाजों एवं लोक गीतों के पावन सानिध्य में तिलक एवं शगुन उत्सव।',
      date: '28 नवंबर 2026',
      time: '',
      venue: 'निज निवास',
      location: 'ग्राम पठखौली, पोस्ट शिवली राशिद गंज, आजमगढ़',
      bgImage: '/images/tilak_palace_bg.jpg',
      themeColor: '#7E1A29',
      accentColor: '#D4AF37',
      badgeText: '॥ मांगलिक कार्यक्रम ॥',
    },
    {
      id: 'sangeet',
      title: 'संगीत एवं स्नेह मिलन',
      hindiTitle: 'Musical Evening',
      subtitle: 'पारिवारिक उल्लास, गीतों की मधुर धुन और खुशियों से सजी एक अविस्मरणीय शाम।',
      date: '28 नवंबर 2026',
      time: 'सायं काल (Evening)',
      venue: 'रंगारंग प्रस्तुतियां एवं प्रीतिभोज',
      location: 'निज निवास प्रांगण',
      bgImage: '/images/sangeet_night_bg.jpg',
      themeColor: '#1A130B',
      accentColor: '#F3E5AB',
      badgeText: 'MUSICAL EVENING',
    },
    {
      id: 'haldi',
      title: 'हल्दी उत्सव',
      hindiTitle: '॥ हल्दी एवं मंडपाच्छादन ॥',
      subtitle: 'पीले गेंदे के फूलों की महक और उबटन के मंगल लेप से सुशोभित वर-वधू का पावन हल्दी संस्कार।',
      time: '11:00 AM ONWARDS',
      venue: 'मातृका पूजन, मंडप एवं हल्दी समारोह',
      location: 'निज निवास',
      bgImage: '/images/haldi_courtyard_bg.jpg',
      themeColor: '#C06A17',
      accentColor: '#FCD34D',
      badgeText: '॥ हल्दी एवं मंडपाच्छादन ॥',
    },
    {
      id: 'wedding',
      title: 'शुभ विवाह',
      hindiTitle: '॥ शुभ परिणय संस्कार ॥',
      subtitle: 'शुभ लग्न एवं पाणिग्रहण संस्कार',
      date: '9 दिसंबर 2026',
      time: 'शुभ बारात',
      venue: 'ग्राम नाहूपुर, सोडरी',
      location: 'आजमगढ़',
      bgImage: '/images/wedding_mandap_clean_hd.jpg',
      scheduleItems: [
        {
          label: 'शुभ बारात प्रस्थान',
          timeVenue: '9 दिसंबर 2026, सायं 5:00 बजे (निज निवास पठखौली, शिवली राशिद गंज से)',
        },
        {
          label: 'द्वारपूजा, जयमाल एवं पाणिग्रहण संस्कार',
          timeVenue: '9 दिसंबर 2026, शुभ लग्न एवं रात्रि बेला (ग्राम नाहूपुर, सोडरी)',
        },
      ],
      themeColor: '#871828',
      accentColor: '#F8E7B4',
      badgeText: '॥ शुभ परिणय संस्कार ॥',
    },
  ],
  family: {
    balAagrah: {
      quote: 'हल्दी है, मेहंदी है, और खुशियों की बहार है,\nमेरे मामा जी की शादी में आपका इंतज़ार है।',
      children: 'शिव्या, पिहू, दिवेश',
    },
    chachaJi: 'सुबेदार, श्रीचंद्र, श्रीराम',
    brothers:
      'चन्द्रभान, उदयभान, संदीप, सदेश, नितेश, रवि, नितिन, अंशु, अमन, आकाश, आदित्य, अर्पित',
    vineet: {
      family: 'समस्त यादव परिवार',
      address: 'ग्राम - पठखौली, पोस्ट - शिवली राशिद गंज, जिला - आजमगढ़',
    },
  },
  venueMapUrl: 'https://maps.app.goo.gl/1GaAcjDZuPvmhGYeA?g_st=aw',
};
