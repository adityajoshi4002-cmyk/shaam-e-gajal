import { Song } from "@/types/song";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC PLAYLIST
// Replace audioUrl values with your actual Cloudinary URLs.
// To switch to an API source later, replace the entire `songs` export with a
// fetched array — the player only consumes the Song[] interface.
// ─────────────────────────────────────────────────────────────────────────────

const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "doizjszpw";

const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/v1786531262/`;

// Artwork base (Cloudinary image folder or local /images/artwork):
const ARTWORK_BASE = "/images/artwork";

// External link constants — replace with your real URLs:
export const SPOTIFY_URL =
  "https://open.spotify.com/playlist/YOUR_PLAYLIST_ID";
export const YT_MUSIC_URL =
  "https://music.youtube.com/playlist?list=YOUR_PLAYLIST_ID";

export const SITE_URL = "https://shaam-e-gajal.vercel.app/";

// ─────────────────────────────────────────────────────────────────────────────

export const songs: Song[] = [

  {
    id: "1",
    title: "Hosh Walon Ko Khabar Kya",
    singer: "Jagjit Singh",
    album: "Sarfarosh",
    audioUrl: `${CLOUDINARY_BASE}hosh_walon_ko_jagjit_nvqlkx.mp3`,
    artworkUrl: 'https://a10.gaanacdn.com/gn_img/albums/Rz4W8evbxD/z4W8ApX0bx/size_m_1713881133.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "6:15",
  },
  {
    id: "2",
    title: "Tum Itna Jo Muskura Rahe Ho",
    singer: "Jagjit Singh",
    album: "Arth",
    audioUrl: `${CLOUDINARY_BASE}tum_itna_jo_jagjit_spw7wi.mp3`,
    artworkUrl: 'https://c.saavncdn.com/341/Tum-Itna-Jo-Muskura-Rahe-Ho-Hindi-2024-20240427063427-500x500.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:23",
  },
  {
    id: "3",
    title: "Koi Fariyaad",
    singer: "Jagjit Singh",
    album: "Tum Bin",
    audioUrl: `${CLOUDINARY_BASE}koi_fariyaad_b8ayve.mp3`,
    artworkUrl: 'https://i.scdn.co/image/ab67616d0000b2736e0d02da14707d5a4f18b70e',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:04",
    // ----------------

  },
  {
    id: "4",
    title: "Woh Kagaz Ki Kashti",
    singer: "Jagjit Singh",
    album: "Aaeena",
    audioUrl: `${CLOUDINARY_BASE}woh_kagaz_ki_kashti_jagjit_ehcimw.mp3`,
    artworkUrl: 'https://i.ytimg.com/vi/tB0hmrY_s0U/sddefault.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:50",
  },
  {
    id: "5",
    title: "Chitthi Aayi Hai",
    singer: "Pankaj Udhas",
    album: "Naam",
    audioUrl: `${CLOUDINARY_BASE}chitti_aayi_hai_pankaj_hb3qdl.mp3`,
    artworkUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaU5okt8JcNa3GFnIA4S4ObAs3CJGnGtTwfPfROFTV4CU5dnMAkyRQ7Sk&s=10',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:31",
  },
  {
    id: "6",
    title: "Aaj Jaane Ki Zid Na Karo",
    singer: "Farida Khanum",
    album: "Classic Ghazals",
    audioUrl: `${CLOUDINARY_BASE}aaj_jaane_ki_zid_farida_vslgzc.mp3`,
    artworkUrl: 'https://i.scdn.co/image/ab67616d00001e0236277ee30d3f9c4ce611c0b1',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:46",
  },
  {
    id: "7",
    title: "Dil Dhoondta Hai",
    singer: "Bhupinder Singh & Lata Mangeshkar",
    album: "Mausam",
    audioUrl: `${CLOUDINARY_BASE}dil_dhoondta_hai_manna_uwidq3.mp3`,
    artworkUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4wMBK76KqmwjwrSGx-rXIpg6MGHzS69GVUgfbdaEm6cS7L1wIzl6QvTU&s=10',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "4:55",
  },
  {
    id: "8",
    title: "Ranjish Hi Sahi",
    singer: "Mehdi Hassan",
    album: "Ghazal Collection",
    audioUrl: `${CLOUDINARY_BASE}ranjish_hi_sahi_mehdi_bqltwg.mp3`,
    artworkUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSp4U0CB36lqF615I_XgcbDmqo-BxgY0lNhYnT0mpxBUcZxEDmgHTxMug7&s=10',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "7:02",
  },
  {
    id: "9",
    title: "Gulon Mein Rang Bhare",
    singer: "Mehdi Hassan",
    album: "Ghazal Classics",
    audioUrl: `${CLOUDINARY_BASE}gulon_mein_rang_bhare_mehdi_jbmrcm.mp3`,
    artworkUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9w_9AkBxzGoSamdV_bSrYUnhxzYEAmRhmtX_wi-dMGw&s=10',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "6:28",
  },
  {
    id: "10",
    title: "Zindagi Mein To Sabhi",
    singer: "Jagjit Singh",
    album: "Feelings",
    audioUrl: `${CLOUDINARY_BASE}zindagi_mein_to_sabhi_jagjit_z0i47j.mp3`,
    artworkUrl: 'https://i.ytimg.com/vi/QQr7iwpR904/sddefault.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:12",
  },
  {
    id: "11",
    title: "Patta Patta Boota Boota",
    singer: "Mehdi Hassan",
    album: "Ghazal Gems",
    audioUrl: `${CLOUDINARY_BASE}patta_patta_mehdi_tsffsx.mp3`,
    artworkUrl: 'https://i.ytimg.com/vi/J_Hc3V7KII4/sddefault.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "6:44",
  },
  {
    id: "12",
    title: "Ab Ke Hum Bichhde",
    singer: "Mehdi Hassan",
    album: "Classic Mehfil",
    audioUrl: `${CLOUDINARY_BASE}ab_ke_hum_bichde_mehdi_amrxd3.mp3`,
    artworkUrl: 'https://i.ytimg.com/vi/Uyv0hMg_i5c/maxresdefault.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "7:18",
  },
  {
    id: "13",
    title: "Ek Pyar Ka Nagma Hai",
    singer: "Lata Mangeshkar & Mukesh",
    album: "Shor",
    audioUrl: `${CLOUDINARY_BASE}ek_pyaar_ka_nagma_lata_q1pbcl.mp3`,
    artworkUrl: 'https://i.ytimg.com/vi/BnRX3buZVyg/sddefault.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "4:32",
  },
  {
    id: "14",
    title: "Yeh Dil Diwana",
    singer: "Pankaj Udhas",
    album: "Nayaab",
    audioUrl: `${CLOUDINARY_BASE}yeh_dil_diwana_pankaj_nzllkf.mp3`,
    artworkUrl: `${ARTWORK_BASE}/artwork-2.png`,
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:40",
  },
  {
    id: "15",
    title: "Shaam Se Aankh Mein",
    singer: "Jagjit Singh",
    album: "Echoes",
    audioUrl: `${CLOUDINARY_BASE}shaam_se_aankh_mein_jagjit_esnadb.mp3`,
    artworkUrl: 'https://i.ytimg.com/vi/K9BUuz2uqUs/sddefault.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:55",
  },
  {
    id: "16",
    title: "Hazir Hai Mohabbat",
    singer: "Abida Parveen",
    album: "Sufi Collection",
    audioUrl: `${CLOUDINARY_BASE}hazir_hai_mohabbat_abida_dbrzyi.mp3`,
    artworkUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2l5LG6q31Z_E30kPIjVsg6Y8A7GBJFx1y2_oKpvvFlEpkM8Aa7-xQ7HQ&s=10',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "8:10",
  },
  {
    id: "17",
    title: "Aapki Aankhon Mein Kuch",
    singer: "Kishore Kumar & Lata Mangeshkar",
    album: "Ghar",
    audioUrl: `${CLOUDINARY_BASE}aapki_aankhon_mein_kishore_xaq7cg.mp3`,
    artworkUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDWwMWZos5vs3hlloWK8cKbHTIT_PUKurSxW56o690FIxtqWAshz4haGI&s=10',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:06",
  },
  {
    id: "18",
    title: "Meri Awaaz Suno",
    singer: "Lata Mangeshkar",
    album: "Kinara",
    audioUrl: `${CLOUDINARY_BASE}meri_awaz_suno_lata_ivvkx6.mp3`,
    artworkUrl: 'https://c.saavncdn.com/231/Meri-Awaaz-Suno-Lata-Mangeshkar-Hindi-2017-500x500.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "4:48",
  },
  {
    id: "19",
    title: "Tere Bina Zindagi Se",
    singer: "Kishore Kumar & Lata Mangeshkar",
    album: "Aandhi",
    audioUrl: `${CLOUDINARY_BASE}tere_bina_zindagi_kishore_fdzexb.mp3`,
    artworkUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRToBS0nnWzcZmAxjgyJ8r1bjPj89YgvFJH_10j4fgSwA&s=10',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:34",
  },
  {
    id: "20",
    title: "Do Dil Toot Gaye",
    singer: "Ghulam Ali",
    album: "Ghazal Bahar",
    audioUrl: `${CLOUDINARY_BASE}do_dil_toot_gaye_ghulam_aw17om.mp3`,
    artworkUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDFMlzY1U7wxnn0etXGeSUe5AYg0f6bqEyXvwpaqhr4M-cigwmnabUh9Wl&s=10',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "6:02",
  },
  {
    id: "21",
    title: "Hungama Hai Kyun Barpa",
    singer: "Ghulam Ali",
    album: "Live at Mehfil",
    audioUrl: `${CLOUDINARY_BASE}hungama_hai_kyun_barpa_ghulam_q5tnif.mp3`,
    artworkUrl: 'https://i.ytimg.com/vi/xQsMn1kmJs4/sddefault.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "9:15",
  },
  {
    id: "22",
    title: "Mujhe Tum Yaad Aate Ho",
    singer: "Pankaj Udhas",
    album: "Aahista",
    audioUrl: `${CLOUDINARY_BASE}mujhe_tum_yaad_aate_pankaj_pyaopo.mp3`,
    artworkUrl: 'https://c.saavncdn.com/471/Mujhe-Tum-Yaad-Aate-Ho-Hindi-2023-20230417123522-500x500.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:22",
  },
  {
    id: "23",
    title: "Baat Niklegi To Phir Door Talak Jayegi",
    singer: "Ghulam Ali",
    album: "Classic Ghazals",
    audioUrl: `${CLOUDINARY_BASE}baat_niklegi_ghulam_sfm1gx.mp3`,
    artworkUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMU1Dk_3RGQuF34Uml_8y3k4wzkwYzEbzZOBnAAE-gmvA3yqjjHmXSPRQ&s=10',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "6:30",
  },
  {
    id: "24",
    title: "Phir Chhidi Raat",
    singer: "Jagjit Singh & Chitra Singh",
    album: "Mirza Ghalib",
    audioUrl: `${CLOUDINARY_BASE}phir_chidi_raat_jagjit_qgpbqd.mp3`,
    artworkUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT103SLvETTUXvAbeTGqWtTGxt-dwImlTvWge_zOPILd9u_CJR2aQWV4yg&s=10',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "5:18",
  },
  {
    id: "25",
    title: "Dono Ne Kiya Tha Pyar",
    singer: "Jagjit Singh & Chitra Singh",
    album: "Saath Saath",
    audioUrl: `${CLOUDINARY_BASE}dono_ne_kiya_tha_pyar_jagjit_chitra_nlsis5.mp3`,
    artworkUrl: 'https://i.ytimg.com/vi/ghoKJCMcw7I/maxresdefault.jpg',
    backgroundImage: "/images/shaam-e-gajal.png",
    durationLabel: "4:58",
  },
]

