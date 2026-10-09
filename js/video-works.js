/* Видео-витрина. Одна запись — одна работа. В этот файл кладутся только пути, не сами ролики.

Куда класть файлы:
- ролик: video/media/имя.mp4  (на сайте это /video/media/имя.mp4)
- постер, если нужен: video/media/posters/имя.webp

Новая работа — объект в VIDEO_WORKS:
{
  id: "latin-id",
  src: "/video/media/имя.mp4",
  categories: ["short-video"],
  order: 10,
  poster: "/video/media/posters/имя.webp"
}
poster можно не указывать.
id — латинский и уникальный. categories — id из VIDEO_CATEGORIES.
order — число: меньшее показывается раньше.
categoryOrder — необязательный порядок внутри отдельной категории.
Одна работа может сочетать формат (короткое / горизонтальное видео) и технику (2D / 3D).

Новая категория — объект в VIDEO_CATEGORIES:
{ id: "latin-id", labelKey: "video.cat.latin-id" }
Тот же ключ нужно добавить в ru, en и uk внутри I18N в js/video-page.js.
preview — лёгкая версия для витрины, src — версия для полного просмотра.
original — исходник. title — подпись работы, aspect: "landscape" — широкий формат, "square" — квадратный.
*/

const VIDEO_CATEGORIES = [
    {
        "id": "short-video",
        "labelKey": "video.cat.short-video"
    },
    {
        "id": "2d-animation",
        "labelKey": "video.cat.2d-animation"
    },
    {
        "id": "3d-animation",
        "labelKey": "video.cat.3d-animation"
    },
    {
        "id": "youtube-format",
        "labelKey": "video.cat.youtube-format"
    },
    {
        "id": "youtube-video",
        "labelKey": "video.cat.youtube-video"
    },
    {
        "id": "ai-video",
        "labelKey": "video.cat.ai-video"
    }
];

const VIDEO_WORKS = [
    {
        "id": "img-6612",
        "src": "/video/media/web/img-6612.mp4",
        "preview": "/video/media/previews/img-6612.mp4",
        "poster": "/video/media/posters/img-6612.jpg",
        "categories": [
            "short-video"
        ],
        "order": 10,
        "title": "Антитренды",
        "duration": 75.65,
        "aspect": "portrait"
    },
    {
        "id": "polygate",
        "src": "/video/media/web/polygate.mp4",
        "preview": "/video/media/previews/polygate.mp4",
        "poster": "/video/media/posters/polygate.jpg",
        "categories": [
            "short-video",
            "2d-animation",
            "3d-animation"
        ],
        "order": 20,
        "title": "300 ms",
        "categoryOrder": {
            "3d-animation": 30
        },
        "duration": 15.02,
        "aspect": "portrait"
    },
    {
        "id": "img-9239",
        "src": "/video/media/web/img-9239.mp4",
        "preview": "/video/media/previews/img-9239.mp4",
        "poster": "/video/media/posters/img-9239.jpg",
        "categories": [
            "short-video",
            "2d-animation"
        ],
        "order": 30,
        "title": "Lie awake",
        "duration": 27.23,
        "aspect": "portrait"
    },
    {
        "id": "img-0632",
        "src": "/video/media/web/img-0632.mp4",
        "preview": "/video/media/previews/img-0632.mp4",
        "poster": "/video/media/posters/img-0632.jpg",
        "categories": [
            "short-video",
            "2d-animation"
        ],
        "order": 40,
        "title": "3 стиля съёмки",
        "duration": 46.51,
        "aspect": "portrait"
    },
    {
        "id": "anastasia-reels-3",
        "src": "/video/media/web/anastasia-reels-3.mp4",
        "preview": "/video/media/previews/anastasia-reels-3.mp4",
        "poster": "/video/media/posters/anastasia-reels-3.jpg",
        "categories": [
            "short-video"
        ],
        "order": 50,
        "title": "Тем, кто ведёт блог",
        "duration": 17.43,
        "aspect": "portrait"
    },
    {
        "id": "anastasia-1",
        "src": "/video/media/web/anastasia-1.mp4",
        "preview": "/video/media/previews/anastasia-1.mp4",
        "poster": "/video/media/posters/anastasia-1.jpg",
        "categories": [
            "short-video",
            "2d-animation"
        ],
        "order": 60,
        "title": "Перестаньте сливать деньги",
        "duration": 24.13,
        "source": "https://media.bypribytkova.com/media/ver_reels.mp4",
        "aspect": "portrait"
    },
    {
        "id": "anastasia-reels-1",
        "src": "/video/media/web/anastasia-reels-1.mp4",
        "preview": "/video/media/previews/anastasia-reels-1.mp4",
        "poster": "/video/media/posters/anastasia-reels-1.jpg",
        "categories": [
            "short-video",
            "2d-animation"
        ],
        "order": 70,
        "duration": 33.93,
        "source": "https://media.bypribytkova.com/media/ver_reels2.mp4",
        "aspect": "portrait"
    },
    {
        "id": "img-8931",
        "src": "/video/media/web/img-8931.mp4",
        "preview": "/video/media/previews/img-8931.mp4",
        "poster": "/video/media/posters/img-8931.jpg",
        "categories": [
            "ai-video"
        ],
        "order": 80,
        "duration": 34.93,
        "source": "https://media.bypribytkova.com/media/ver_cartoon.MP4",
        "aspect": "portrait"
    },
    {
        "id": "img-9243",
        "src": "/video/media/web/img-9243.mp4",
        "preview": "/video/media/previews/img-9243.mp4",
        "poster": "/video/media/posters/img-9243.jpg",
        "categories": [
            "short-video",
            "2d-animation"
        ],
        "order": 90,
        "title": "5 шагов до новой версии себя",
        "duration": 43.2,
        "source": "https://media.bypribytkova.com/media/ver_new_version.mp4",
        "aspect": "portrait"
    },
    {
        "id": "itog",
        "src": "/video/media/web/itog.mp4",
        "preview": "/video/media/previews/itog.mp4",
        "poster": "/video/media/posters/itog.jpg",
        "categories": [
            "short-video",
            "2d-animation"
        ],
        "order": 100,
        "duration": 34.04,
        "aspect": "portrait"
    },
    {
        "id": "stroika",
        "src": "/video/media/web/stroika.mp4",
        "preview": "/video/media/previews/stroika.mp4",
        "poster": "/video/media/posters/stroika.jpg",
        "categories": [
            "ai-video"
        ],
        "order": 110,
        "title": "Строительство · ролик с озвучкой",
        "duration": 30.87,
        "source": "https://media.bypribytkova.com/media/ver_house.MP4",
        "aspect": "portrait"
    },
    {
        "id": "voice",
        "src": "/video/media/web/voice.mp4",
        "preview": "/video/media/previews/voice.mp4",
        "poster": "/video/media/posters/voice.jpg",
        "categories": [
            "3d-animation",
            "youtube-format"
        ],
        "order": 120,
        "title": "3D-интерфейс",
        "aspect": "landscape",
        "categoryOrder": {
            "3d-animation": 20
        },
        "duration": 9.97
    },
    {
        "id": "mr-stephen",
        "src": "/video/media/web/mr-stephen.mp4",
        "preview": "/video/media/previews/mr-stephen.mp4",
        "poster": "/video/media/posters/mr-stephen.jpg",
        "categories": [
            "3d-animation",
            "youtube-format"
        ],
        "order": 130,
        "categoryOrder": {
            "3d-animation": 10
        },
        "title": "Mr. Stephen · 3D-сцена",
        "aspect": "landscape",
        "duration": 16.83,
        "source": "https://cloofen.ru/media/mr-stephen.mp4"
    },
    {
        "id": "wlkey-nebo",
        "src": "/video/media/web/wlkey-nebo.mp4",
        "preview": "/video/media/previews/wlkey-nebo.mp4",
        "poster": "/video/media/posters/wlkey-nebo.jpg",
        "categories": [
            "short-video"
        ],
        "order": 140,
        "title": "Недвижимость",
        "source": "https://wlkey.ru/videos/nebo.mp4",
        "duration": 54.66,
        "aspect": "portrait"
    },
    {
        "id": "wlkey-car",
        "src": "/video/media/web/wlkey-car.mp4",
        "preview": "/video/media/previews/wlkey-car.mp4",
        "poster": "/video/media/posters/wlkey-car.jpg",
        "categories": [
            "short-video"
        ],
        "order": 150,
        "title": "Автосалон",
        "source": "https://wlkey.ru/videos/car.mp4",
        "duration": 21.63,
        "aspect": "portrait"
    },
    {
        "id": "wlkey-sklad",
        "src": "/video/media/web/wlkey-sklad.mp4",
        "preview": "/video/media/previews/wlkey-sklad.mp4",
        "poster": "/video/media/posters/wlkey-sklad.jpg",
        "categories": [
            "short-video",
            "2d-animation"
        ],
        "order": 160,
        "title": "Склады · экспертный ролик",
        "source": "https://wlkey.ru/videos/sklad.mp4",
        "duration": 9.98,
        "aspect": "portrait"
    },
    {
        "id": "wlkey-dubai",
        "src": "/video/media/web/wlkey-dubai.mp4",
        "preview": "/video/media/previews/wlkey-dubai.mp4",
        "poster": "/video/media/posters/wlkey-dubai.jpg",
        "categories": [
            "short-video"
        ],
        "order": 170,
        "title": "Автомобиль · Дубай",
        "source": "https://wlkey.ru/videos/dubai.mov",
        "duration": 21.01,
        "aspect": "portrait"
    },
    {
        "id": "wlkey-interface",
        "src": "/video/media/web/wlkey-interface.mp4",
        "preview": "/video/media/previews/wlkey-interface.mp4",
        "poster": "/video/media/posters/wlkey-interface.jpg",
        "categories": [
            "2d-animation",
            "youtube-format"
        ],
        "order": 180,
        "title": "2D-анимация интерфейса",
        "source": "https://wlkey.ru/videos/motion166.mov",
        "aspect": "landscape",
        "duration": 8.48
    },
    {
        "id": "wlkey-doreels",
        "src": "/video/media/web/wlkey-doreels.mp4",
        "preview": "/video/media/previews/wlkey-doreels.mp4",
        "poster": "/video/media/posters/wlkey-doreels.jpg",
        "categories": [
            "3d-animation",
            "youtube-format"
        ],
        "order": 190,
        "title": "DoReels · 3D-анимация",
        "source": "https://wlkey.ru/videos/motionn.mov",
        "aspect": "landscape",
        "categoryOrder": {
            "3d-animation": 40
        },
        "duration": 8.08
    },
    {
        "id": "cloofen-byreal",
        "src": "/video/media/web/cloofen/byreal.mp4",
        "preview": "/video/media/previews/cloofen/byreal.mp4?v=2",
        "poster": "/video/media/posters/cloofen/byreal.jpg",
        "categories": [
            "3d-animation",
            "youtube-format"
        ],
        "order": 200,
        "title": "Mantle · 3D-ролик",
        "source": "https://cloofen.ru/media/byreal.mp4",
        "duration": 24.28,
        "aspect": "landscape"
    },
    {
        "id": "cloofen-solayer",
        "src": "/video/media/web/cloofen/solayer.mp4",
        "preview": "/video/media/previews/cloofen/solayer.mp4?v=2",
        "poster": "/video/media/posters/cloofen/solayer.jpg",
        "categories": [
            "3d-animation",
            "youtube-format"
        ],
        "order": 210,
        "title": "Solayer · 3D-анимация карты",
        "source": "https://cloofen.ru/media/solayer.mp4",
        "duration": 16.87,
        "aspect": "landscape"
    },
    {
        "id": "cloofen-bleap",
        "src": "/video/media/web/cloofen/bleap.mp4",
        "preview": "/video/media/previews/cloofen/bleap.mp4?v=2",
        "poster": "/video/media/posters/cloofen/bleap.jpg",
        "categories": [
            "2d-animation",
            "3d-animation",
            "youtube-format"
        ],
        "order": 220,
        "title": "Bleap · продуктовая анимация",
        "source": "https://cloofen.ru/media/bleap.mp4",
        "duration": 31.32,
        "aspect": "landscape"
    },
    {
        "id": "cloofen-sentient",
        "src": "/video/media/web/cloofen/sentient.mp4",
        "preview": "/video/media/previews/cloofen/sentient.mp4?v=2",
        "poster": "/video/media/posters/cloofen/sentient.jpg",
        "categories": [
            "3d-animation",
            "youtube-format"
        ],
        "order": 230,
        "title": "Sentient · персонажная анимация",
        "source": "https://cloofen.ru/media/sentient.mp4",
        "duration": 25.24,
        "aspect": "landscape"
    },
    {
        "id": "cloofen-stable",
        "src": "/video/media/web/cloofen/stable.mp4",
        "preview": "/video/media/previews/cloofen/stable.mp4?v=2",
        "poster": "/video/media/posters/cloofen/stable.jpg",
        "categories": [
            "3d-animation",
            "youtube-format"
        ],
        "order": 240,
        "title": "Stable · продуктовый ролик",
        "source": "https://cloofen.ru/media/stable.mp4",
        "duration": 19.93,
        "aspect": "landscape"
    },
    {
        "id": "cloofen-noise",
        "src": "/video/media/web/cloofen/noise.mp4",
        "preview": "/video/media/previews/cloofen/noise.mp4?v=2",
        "poster": "/video/media/posters/cloofen/noise.jpg",
        "categories": [
            "2d-animation",
            "youtube-format"
        ],
        "order": 250,
        "title": "Noise · motion graphics",
        "source": "https://cloofen.ru/media/noise.mp4",
        "duration": 5.06,
        "aspect": "landscape"
    },
    {
        "id": "cloofen-seismic",
        "src": "/video/media/web/cloofen/seismic.mp4",
        "preview": "/video/media/previews/cloofen/seismic.mp4?v=2",
        "poster": "/video/media/posters/cloofen/seismic.jpg",
        "categories": [
            "3d-animation",
            "youtube-format"
        ],
        "order": 260,
        "title": "Seismic · 3D-айдентика",
        "source": "https://cloofen.ru/media/seismic.mp4",
        "duration": 15.02,
        "aspect": "landscape"
    },
    {
        "id": "cloofen-checkout",
        "src": "/video/media/web/cloofen/checkout.mp4",
        "preview": "/video/media/previews/cloofen/checkout.mp4?v=2",
        "poster": "/video/media/posters/cloofen/checkout.jpg",
        "categories": [
            "2d-animation",
            "youtube-format"
        ],
        "order": 270,
        "title": "Stripe · анимация интерфейса",
        "source": "https://cloofen.ru/media/checkout.mp4",
        "duration": 20.55,
        "aspect": "landscape"
    },
    {
        "id": "nessy-ver-car",
        "src": "/video/media/web/nessy/ver-car.mp4",
        "preview": "/video/media/previews/nessy/ver-car.mp4?v=2",
        "poster": "/video/media/posters/nessy/ver-car.jpg",
        "categories": [
            "ai-video"
        ],
        "order": 280,
        "title": "Ретроавтомобиль",
        "source": "https://media.bypribytkova.com/media/ver_car.MP4",
        "duration": 17.71,
        "aspect": "portrait"
    },
    {
        "id": "nessy-hor-map",
        "src": "/video/media/web/nessy/hor-map.mp4",
        "preview": "/video/media/previews/nessy/hor-map.mp4?v=2",
        "poster": "/video/media/posters/nessy/hor-map.jpg",
        "categories": [
            "3d-animation",
            "youtube-format"
        ],
        "order": 290,
        "title": "Карта · объёмная анимация",
        "source": "https://media.bypribytkova.com/media/hor_map.MP4",
        "duration": 14.43,
        "aspect": "landscape"
    },
    {
        "id": "nessy-ver-workflow",
        "src": "/video/media/web/nessy/ver-workflow.mp4",
        "preview": "/video/media/previews/nessy/ver-workflow.mp4?v=2",
        "poster": "/video/media/posters/nessy/ver-workflow.jpg",
        "categories": [
            "short-video",
            "2d-animation"
        ],
        "order": 300,
        "title": "Рабочий процесс · типографика",
        "source": "https://media.bypribytkova.com/media/ver_workflow.MP4",
        "duration": 8.13,
        "aspect": "portrait"
    },
    {
        "id": "nessy-ver-you",
        "src": "/video/media/web/nessy/ver-you.mp4",
        "preview": "/video/media/previews/nessy/ver-you.mp4?v=2",
        "poster": "/video/media/posters/nessy/ver-you.jpg",
        "categories": [
            "short-video",
            "2d-animation"
        ],
        "order": 310,
        "title": "Why not you · мотивационный монтаж",
        "source": "https://media.bypribytkova.com/media/ver_you.MP4",
        "duration": 24.7,
        "aspect": "portrait"
    },
    {
        "id": "ooo-design-7",
        "src": "/video/media/ooo-design/web/ooo-design-7.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-design-7.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-design-7.webp",
        "categories": [
            "2d-animation",
            "3d-animation",
            "youtube-format"
        ],
        "title": "Прокуратура РФ — видеокейс",
        "duration": 44.8,
        "aspect": "landscape",
        "source": "https://t.me/ooo_design/7",
        "concept": false,
        "order": 320
    },
    {
        "id": "ooo-design-14",
        "src": "/video/media/ooo-design/web/ooo-design-14.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-design-14.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-design-14.webp",
        "categories": [
            "2d-animation",
            "3d-animation",
            "youtube-format"
        ],
        "title": "Федерация сумо — видеокейс",
        "duration": 66.502,
        "aspect": "landscape",
        "source": "https://t.me/ooo_design/14",
        "concept": false,
        "order": 330
    },
    {
        "id": "ooo-design-57",
        "src": "/video/media/ooo-design/web/ooo-design-57.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-design-57.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-design-57.webp",
        "categories": [
            "2d-animation",
            "youtube-format"
        ],
        "title": "Югшвейпром — анимация сайта",
        "duration": 38.5,
        "aspect": "landscape",
        "source": "https://t.me/ooo_design/57",
        "concept": false,
        "order": 340
    },
    {
        "id": "ooo-design-102",
        "src": "/video/media/ooo-design/web/ooo-design-102.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-design-102.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-design-102.webp",
        "categories": [
            "2d-animation"
        ],
        "title": "Сектор активных фанатов — логотип",
        "duration": 3.667,
        "aspect": "portrait",
        "source": "https://t.me/ooo_design/102",
        "concept": false,
        "order": 350
    },
    {
        "id": "ooo-design-103",
        "src": "/video/media/ooo-design/web/ooo-design-103.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-design-103.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-design-103.webp",
        "categories": [
            "2d-animation"
        ],
        "title": "Сектор активных фанатов — живой мокап",
        "duration": 5.633,
        "aspect": "portrait",
        "source": "https://t.me/ooo_design/103",
        "concept": false,
        "order": 360
    },
    {
        "id": "ooo-design-104",
        "src": "/video/media/ooo-design/web/ooo-design-104.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-design-104.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-design-104.webp",
        "categories": [
            "2d-animation",
            "3d-animation"
        ],
        "title": "Здоровые Дети — видеокейс",
        "duration": 19.233,
        "aspect": "square",
        "source": "https://t.me/ooo_design/104",
        "concept": false,
        "order": 370
    },
    {
        "id": "ooo-design-107",
        "src": "/video/media/ooo-design/web/ooo-design-107.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-design-107.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-design-107.webp",
        "categories": [
            "ai-video"
        ],
        "title": "Рефлективная одежда — fashion video",
        "duration": 28.567,
        "aspect": "square",
        "source": "https://t.me/ooo_design/107",
        "concept": false,
        "order": 380
    },
    {
        "id": "ooo-design-112",
        "src": "/video/media/ooo-design/web/ooo-design-112.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-design-112.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-design-112.webp",
        "categories": [
            "2d-animation"
        ],
        "title": "Здоровые Дети — 27 лет",
        "duration": 2.388,
        "aspect": "square",
        "source": "https://t.me/ooo_design/112",
        "concept": false,
        "order": 390
    },
    {
        "id": "ooo-brain-fox-67aAsaQTCIC",
        "src": "/video/media/ooo-design/web/ooo-brain-fox-67aAsaQTCIC.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-brain-fox-67aAsaQTCIC.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-brain-fox-67aAsaQTCIC.webp",
        "categories": [
            "ai-video"
        ],
        "title": "Brain Fox — трансформация персонажа",
        "duration": 4.317,
        "aspect": "square",
        "source": "https://www.behance.net/gallery/244597601/Brain-Fox-identity",
        "concept": false,
        "order": 400
    },
    {
        "id": "ooo-brain-fox-ARNjR7F_qdw",
        "src": "/video/media/ooo-design/web/ooo-brain-fox-ARNjR7F_qdw.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-brain-fox-ARNjR7F_qdw.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-brain-fox-ARNjR7F_qdw.webp",
        "categories": [
            "ai-video"
        ],
        "title": "Brain Fox — продуктовые видеомокапы",
        "duration": 10.0,
        "aspect": "square",
        "source": "https://www.behance.net/gallery/244597601/Brain-Fox-identity",
        "concept": false,
        "order": 410
    },
    {
        "id": "ooo-brain-fox-9-tSsPNc3a_",
        "src": "/video/media/ooo-design/web/ooo-brain-fox-9-tSsPNc3a_.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-brain-fox-9-tSsPNc3a_.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-brain-fox-9-tSsPNc3a_.webp",
        "categories": [
            "ai-video"
        ],
        "title": "Brain Fox — рекламные видеомокапы",
        "duration": 31.133,
        "aspect": "square",
        "source": "https://www.behance.net/gallery/244597601/Brain-Fox-identity",
        "concept": false,
        "order": 420
    },
    {
        "id": "ooo-brain-fox-7TCaV-ccnYB",
        "src": "/video/media/ooo-design/web/ooo-brain-fox-7TCaV-ccnYB.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-brain-fox-7TCaV-ccnYB.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-brain-fox-7TCaV-ccnYB.webp",
        "categories": [
            "2d-animation",
            "youtube-format"
        ],
        "title": "Brain Fox — типографика услуг",
        "duration": 6.042,
        "aspect": "landscape",
        "source": "https://www.behance.net/gallery/244597601/Brain-Fox-identity",
        "concept": false,
        "order": 430
    },
    {
        "id": "ooo-vegan-bro-film",
        "src": "/video/media/ooo-design/web/ooo-vegan-bro-film.mp4",
        "preview": "/video/media/ooo-design/previews/ooo-vegan-bro-film.mp4?v=2",
        "poster": "/video/media/ooo-design/posters/ooo-vegan-bro-film.webp",
        "categories": [
            "youtube-format"
        ],
        "title": "Vegan Bro — cinematic video",
        "duration": 48.034,
        "aspect": "landscape",
        "source": "https://www.youtube.com/watch?v=M0jDa752nJQ",
        "concept": false,
        "order": 440
    },
    {
        "id": "ivar-166",
        "src": "/video/media/ivar/web/ivar-166.mp4",
        "preview": "/video/media/ivar/previews/ivar-166.mp4?v=2",
        "poster": "/video/media/ivar/posters/ivar-166.webp",
        "categories": [
            "2d-animation",
            "youtube-format"
        ],
        "title": "Aura Spa Salon — видео",
        "duration": 8.021,
        "aspect": "landscape",
        "source": "https://t.me/designIvar/166",
        "concept": false,
        "order": 450
    },
    {
        "id": "ivar-191",
        "src": "/video/media/ivar/web/ivar-191.mp4",
        "preview": "/video/media/ivar/previews/ivar-191.mp4?v=2",
        "poster": "/video/media/ivar/posters/ivar-191.webp",
        "categories": [
            "2d-animation",
            "youtube-format"
        ],
        "title": "ARCHE — анимация логотипа",
        "duration": 10.033,
        "aspect": "landscape",
        "source": "https://t.me/designIvar/191",
        "concept": false,
        "order": 460
    },
    {
        "id": "ivar-195",
        "src": "/video/media/ivar/web/ivar-195.mp4",
        "preview": "/video/media/ivar/previews/ivar-195.mp4?v=2",
        "poster": "/video/media/ivar/posters/ivar-195.webp",
        "categories": [
            "2d-animation",
            "youtube-format"
        ],
        "title": "ARCHE — рекламный концепт",
        "duration": 18.48,
        "aspect": "landscape",
        "source": "https://t.me/designIvar/195",
        "concept": true,
        "order": 470
    },
    {
        "id": "ivar-209",
        "src": "/video/media/ivar/web/ivar-209.mp4",
        "preview": "/video/media/ivar/previews/ivar-209.mp4?v=2",
        "poster": "/video/media/ivar/posters/ivar-209.webp",
        "categories": [
            "2d-animation"
        ],
        "title": "Небо — моушн-концепт",
        "duration": 8.533,
        "aspect": "portrait",
        "source": "https://t.me/designIvar/209",
        "concept": true,
        "order": 480
    },
    {
        "id": "youtube-_TpUTtvvJtQ",
        "provider": "youtube",
        "youtubeId": "_TpUTtvvJtQ",
        "title": "ПЕЧЕНЬКО ШОУ 🍪 САМЫЙ ПЕРВЫЙ ВЫПУСК (Новки и Крис)",
        "duration": 2429,
        "durationSeconds": 2429,
        "startTime": 1682,
        "poster": "/video/media/youtube/yt-_TpUTtvvJtQ-poster.webp",
        "aspect": "landscape",
        "creatorId": "nowkie",
        "creatorName": "nowkie",
        "category": "youtube",
        "categoryLabel": "YouTube",
        "source": "https://www.youtube.com/watch?v=_TpUTtvvJtQ&t=1682s",
        "description": "Монтаж фрагмента выпуска — с 28:02.",
        "claimScope": "fragment-from-28:02",
        "durationLabel": "40:29",
        "categories": [
            "youtube-video"
        ],
        "order": 5048
    },
    {
        "id": "youtube-XLKW0BNXZN8",
        "provider": "youtube",
        "youtubeId": "XLKW0BNXZN8",
        "title": "СМЕРТЬ ГЛАВНОГО СКВАДА СТРАНЫ",
        "duration": 4297,
        "durationSeconds": 4297,
        "startTime": 0,
        "poster": "/video/media/youtube/XLKW0BNXZN8-poster.webp",
        "aspect": "landscape",
        "creatorId": "shtozatim",
        "creatorName": "Што за Тим",
        "category": "youtube",
        "categoryLabel": "YouTube",
        "source": "https://www.youtube.com/watch?v=XLKW0BNXZN8",
        "description": "YouTube-выпуск. Работа монтажёра нашей команды.",
        "claimScope": "team-editor-prior-work",
        "durationLabel": "71:37",
        "categories": [
            "youtube-video"
        ],
        "order": 5049
    },
    {
        "id": "youtube-Me2c5syhp2U",
        "provider": "youtube",
        "youtubeId": "Me2c5syhp2U",
        "title": "ПАКИСТАН — ФАБРИКА МРАКОБЕСОВ",
        "duration": 2324,
        "durationSeconds": 2324,
        "startTime": 0,
        "poster": "/video/media/youtube/Me2c5syhp2U-poster.webp",
        "aspect": "landscape",
        "creatorId": "tonytut",
        "creatorName": "ТОНИ ТУТ",
        "category": "youtube",
        "categoryLabel": "YouTube",
        "source": "https://www.youtube.com/watch?v=Me2c5syhp2U",
        "description": "YouTube-выпуск. Работа монтажёра нашей команды.",
        "claimScope": "team-editor-prior-work",
        "durationLabel": "38:44",
        "categories": [
            "youtube-video"
        ],
        "order": 5050
    },
    {
        "id": "youtube-Usinu3f0u9A",
        "provider": "youtube",
        "youtubeId": "Usinu3f0u9A",
        "title": "Шоу «Сортировка» — ЯЯНА",
        "duration": 1036,
        "durationSeconds": 1036,
        "startTime": 0,
        "poster": "/video/media/youtube/Usinu3f0u9A-poster.webp",
        "aspect": "landscape",
        "creatorId": "yanazenina",
        "creatorName": "ЯЯНА",
        "category": "youtube",
        "categoryLabel": "YouTube",
        "source": "https://www.youtube.com/watch?v=Usinu3f0u9A",
        "description": "YouTube-выпуск. Работа монтажёра нашей команды.",
        "claimScope": "team-editor-prior-work",
        "durationLabel": "17:16",
        "categories": [
            "youtube-video"
        ],
        "order": 5051
    },
    {
        "id": "youtube-LpEIXL0KHHs",
        "provider": "youtube",
        "youtubeId": "LpEIXL0KHHs",
        "title": "ШУТКИ КОНЧИЛИСЬ",
        "duration": 3604,
        "durationSeconds": 3604,
        "startTime": 0,
        "poster": "/video/media/youtube/LpEIXL0KHHs-poster.webp",
        "aspect": "landscape",
        "creatorId": "shtozatim",
        "creatorName": "Што за Тим",
        "category": "youtube",
        "categoryLabel": "YouTube",
        "source": "https://www.youtube.com/watch?v=LpEIXL0KHHs",
        "description": "YouTube-выпуск. Работа монтажёра нашей команды.",
        "claimScope": "team-editor-prior-work",
        "durationLabel": "60:04",
        "categories": [
            "youtube-video"
        ],
        "order": 5052
    },
    {
        "id": "team-1cZ_gBAD",
        "src": "/video/media/team-projects/web/team-1cZ_gBAD.mp4",
        "preview": "/video/media/team-projects/previews/team-1cZ_gBAD.mp4",
        "poster": "/video/media/team-projects/posters/team-1cZ_gBAD.webp",
        "title": "Послезавтра — фрагмент выпуска",
        "duration": 33.0,
        "aspect": "landscape",
        "categories": [
            "youtube-video"
        ],
        "order": 6000,
        "previewIsExcerpt": true
    },
    {
        "id": "team-13oqX7pB",
        "src": "/video/media/team-projects/web/team-13oqX7pB.mp4",
        "preview": "/video/media/team-projects/previews/team-13oqX7pB.mp4",
        "poster": "/video/media/team-projects/posters/team-13oqX7pB.webp",
        "title": "NoName Pilot — фрагмент об авиации",
        "duration": 31.579002,
        "aspect": "landscape",
        "categories": [
            "youtube-video"
        ],
        "order": 6010,
        "previewIsExcerpt": true
    },
    {
        "id": "team-1CJHHec5",
        "src": "/video/media/team-projects/web/team-1CJHHec5.mp4",
        "preview": "/video/media/team-projects/previews/team-1CJHHec5.mp4",
        "poster": "/video/media/team-projects/posters/team-1CJHHec5.webp",
        "title": "SEVEN FORCE — фрагмент автообзора",
        "duration": 46.2,
        "aspect": "landscape",
        "categories": [
            "youtube-video"
        ],
        "order": 6020,
        "previewIsExcerpt": true
    },
    {
        "id": "team-112DMvdj",
        "src": "/video/media/team-projects/web/team-112DMvdj.mp4",
        "preview": "/video/media/team-projects/previews/team-112DMvdj.mp4",
        "poster": "/video/media/team-projects/posters/team-112DMvdj.webp",
        "title": "Япония — travel-фрагмент",
        "duration": 46.212833,
        "aspect": "landscape",
        "categories": [
            "youtube-video"
        ],
        "order": 6030,
        "previewIsExcerpt": true
    }
];

const VIDEO_CREATORS = [
    {
        "name": "Новки",
        "portrait": "/video/media/youtube/nowkie-portrait.webp",
        "workId": "youtube-_TpUTtvvJtQ"
    },
    {
        "name": "Послезавтра",
        "portrait": "/video/media/youtube/posle-zavtra-portrait.webp",
        "workId": "team-1cZ_gBAD"
    },
    {
        "name": "Што за Тим",
        "portrait": "/video/media/youtube/shtozatim-portrait.webp",
        "workId": "youtube-XLKW0BNXZN8"
    },
    {
        "name": "ТОНИ ТУТ",
        "portrait": "/video/media/youtube/tonytut-portrait.webp",
        "workId": "youtube-Me2c5syhp2U"
    },
    {
        "name": "ЯЯНА",
        "portrait": "/video/media/youtube/yanazenina-portrait.webp",
        "workId": "youtube-Usinu3f0u9A"
    }
];
