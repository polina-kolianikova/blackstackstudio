/* Каталог дизайна. Добавляйте работы и дизайнеров здесь.
   id работы должен быть уникальным; categories — id направлений из CATEGORIES.
   designerId связывает работу с id из DESIGNERS. Имя автора указывайте только из его материалов.
   Текущие авторы подтверждены материалами студии. Снятые работы сохранены вне публичной витрины.
   order определяет порядок; меньшие числа идут раньше. kind — image или video.
   Для video укажите poster. link — необязательная ссылка на готовый пак.
*/
export const CATEGORIES = [
  {
    "id": "infographics",
    "label": "Инфографика",
    "description": "Карточки товаров, визуальные объяснения и графики для презентаций."
  },
  {
    "id": "presentations",
    "label": "Презентации",
    "description": "Презентации продуктов, компаний, курсов и партнёрских предложений."
  },
  {
    "id": "ui",
    "label": "Веб-дизайн",
    "description": "Макеты сайтов, приложений и цифровых интерфейсов."
  },
  {
    "id": "identity",
    "label": "Логотипы",
    "description": "Статичные и анимированные логотипы, надписи и знаки."
  },
  {
    "id": "branding",
    "label": "Брендинг",
    "description": "Фирменный стиль, брендбуки, упаковка и носители бренда."
  },
  {
    "id": "social",
    "label": "Соцсети",
    "description": "Посты, серии публикаций и коллажи для соцсетей."
  },
  {
    "id": "posters",
    "label": "Афиши",
    "description": "Афиши событий, мастер-классов и авторские постеры."
  },
  {
    "id": "campaigns",
    "label": "Реклама",
    "description": "Баннеры, постеры, обложки и иллюстрации."
  },
  {
    "id": "print",
    "label": "Полиграфия",
    "description": "Печатные материалы, визитки, буклеты, меню, упаковка и мерч."
  },
  {
    "id": "character",
    "label": "Персонажи",
    "description": "Персонажи, маскоты и их анимация."
  },
  {
    "id": "motion",
    "label": "Анимация",
    "description": "Анимация логотипов, персонажей и рекламных макетов."
  },
  {
    "id": "stickers",
    "label": "Стикеры",
    "description": "Стикеры и эмодзи для Telegram."
  }
];

export const DESIGNERS = [];

export const PACKS = [
  {
    "title": "Side Groups",
    "url": "https://t.me/addstickers/SideGroups1"
  },
  {
    "title": "blinchik",
    "url": "https://t.me/addemoji/blinchikgfx"
  },
  {
    "title": "Epic Legends",
    "url": "https://t.me/addstickers/epiclegends"
  }
];

export const WORKS = [
  {
    "id": "alexander-infographic-vitamins",
    "key": "alexander-infographic-vitamins",
    "title": "Витамины Opti-Men",
    "tag": "Инфографика для карточки товара",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-infographic-vitamins.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "infographics"
    ],
    "order": 10,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-infographic-vitamins.webp",
        "title": "Витамины Opti-Men",
        "width": 467,
        "height": 600
      }
    ]
  },
  {
    "id": "ivar-nature-glow",
    "key": "ivar-nature-glow",
    "title": "NatureGlow",
    "tag": "Концепт брендбука",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-155.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "branding",
      "identity",
      "print",
      "social"
    ],
    "order": 20,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-141.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-143.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-144.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-145.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-146.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-148.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-149.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-150.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-151.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-152.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-153.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-154.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-155.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-156.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-158.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-159.webp",
        "kind": "image",
        "title": "NatureGlow"
      },
      {
        "src": "/portfolio/media/ivar/ivar-nature-glow-image-022-160.webp",
        "kind": "image",
        "title": "NatureGlow"
      }
    ],
    "concept": true
  },
  {
    "id": "ooo-antej",
    "key": "ooo-antej",
    "title": "Антей",
    "tag": "Веб-дизайн и мобильное приложение",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-antej-hero.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "ui"
    ],
    "order": 30,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-antej-0.webp",
        "kind": "image",
        "title": "Интернет-аптека и мобильное приложение"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-antej-1.webp",
        "kind": "image",
        "title": "Система интерфейсов"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-antej-2.webp",
        "kind": "image",
        "title": "Реферальная программа"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-antej-3.webp",
        "kind": "image",
        "title": "Интерфейсы веба и приложения"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-antej-4.webp",
        "kind": "image",
        "title": "Вход в приложение"
      }
    ]
  },
  {
    "id": "lera-vegan-bar",
    "key": "lera-vegan-bar",
    "title": "Vegan Bar",
    "tag": "Айдентика, иллюстрации и печатные материалы",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/vegan-menu.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "identity",
      "branding",
      "print"
    ],
    "order": 40,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/vegan-menu.webp",
        "title": "Меню Vegan Bar",
        "width": 1673,
        "height": 1743
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/vegan-logo.webp",
        "title": "Логотип Vegan Bar",
        "width": 704,
        "height": 524
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/vegan-plate.webp",
        "title": "Vegan Bar — тарелка",
        "width": 754,
        "height": 526
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/vegan-drink.webp",
        "title": "Vegan Bar — иллюстрация напитка",
        "width": 590,
        "height": 722
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/vegan-strawberry.webp",
        "title": "Vegan Bar — персонаж-клубника",
        "width": 177,
        "height": 217
      }
    ]
  },
  {
    "id": "alexander-presentation-iwnl-padel",
    "key": "alexander-presentation-iwnl-padel",
    "title": "IWNL Padel Academy",
    "tag": "Слайды презентации",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-presentation-iwnl-padel-1.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "presentations"
    ],
    "order": 50,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-presentation-iwnl-padel-1.webp",
        "title": "IWNL Padel Academy — слайд 1",
        "width": 623,
        "height": 351
      },
      {
        "src": "/portfolio/media/alexander/alexander-presentation-iwnl-padel-2.webp",
        "title": "IWNL Padel Academy — слайд 2",
        "width": 624,
        "height": 351
      },
      {
        "src": "/portfolio/media/alexander/alexander-presentation-iwnl-padel-3.webp",
        "title": "IWNL Padel Academy — слайд 3",
        "width": 620,
        "height": 351
      }
    ]
  },
  {
    "key": "blinchik-b.webp",
    "title": "Blinchik B",
    "tag": "Хромированный знак",
    "kind": "image",
    "src": "/portfolio/media/blinchik-b.webp",
    "poster": null,
    "link": null,
    "id": "blinchik-b.webp",
    "order": 60,
    "designerId": "blinchik",
    "categories": [
      "identity"
    ]
  },
  {
    "id": "ivar-briosh",
    "key": "ivar-briosh",
    "title": "Briosh",
    "tag": "Фирменный стиль пекарни",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-briosh-tg-111.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "branding",
      "print"
    ],
    "order": 70,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-briosh-tg-110.webp",
        "kind": "image",
        "title": "Briosh"
      },
      {
        "src": "/portfolio/media/ivar/ivar-briosh-tg-111.webp",
        "kind": "image",
        "title": "Briosh"
      },
      {
        "src": "/portfolio/media/ivar/ivar-briosh-tg-112.webp",
        "kind": "image",
        "title": "Briosh"
      },
      {
        "src": "/portfolio/media/ivar/ivar-briosh-tg-113.webp",
        "kind": "image",
        "title": "Briosh"
      },
      {
        "src": "/portfolio/media/ivar/ivar-briosh-tg-114.webp",
        "kind": "image",
        "title": "Briosh"
      },
      {
        "src": "/portfolio/media/ivar/ivar-briosh-tg-115.webp",
        "kind": "image",
        "title": "Briosh"
      }
    ]
  },
  {
    "id": "alexander-website-iron-punch",
    "key": "alexander-website-iron-punch",
    "title": "Iron Punch",
    "tag": "Фрагмент макета сайта",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-website-iron-punch.webp",
    "poster": "/portfolio/media/alexander/alexander-website-iron-punch-preview.webp",
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "ui"
    ],
    "order": 80,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-website-iron-punch.webp",
        "poster": "/portfolio/media/alexander/alexander-website-iron-punch-preview.webp",
        "title": "Iron Punch",
        "width": 695,
        "height": 1341
      }
    ]
  },
  {
    "id": "ooo-brain-fox",
    "key": "ooo-brain-fox",
    "title": "Brain Fox",
    "tag": "Айдентика, реклама и соцсети",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-brain-fox-4.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "identity",
      "branding",
      "campaigns",
      "social",
      "print",
      "motion",
      "character"
    ],
    "order": 90,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-brain-fox-2.webp",
        "kind": "image",
        "title": "Brain Fox"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-brain-fox-3.webp",
        "kind": "image",
        "title": "Brain Fox"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-brain-fox-4.webp",
        "kind": "image",
        "title": "Brain Fox"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-brain-fox-5.webp",
        "kind": "image",
        "title": "Brain Fox"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-brain-fox-6.webp",
        "kind": "image",
        "title": "Brain Fox"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-brain-fox-67aAsaQTCIC.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-brain-fox-67aAsaQTCIC.webp",
        "title": "Brain Fox — персонаж"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-brain-fox-ARNjR7F_qdw.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-brain-fox-ARNjR7F_qdw.webp",
        "title": "Brain Fox — айдентика в движении"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-brain-fox-9-tSsPNc3a_.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-brain-fox-9-tSsPNc3a_.webp",
        "title": "Brain Fox — мокапы"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-brain-fox-7TCaV-ccnYB.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-brain-fox-7TCaV-ccnYB.webp",
        "title": "Brain Fox — типографика услуг"
      }
    ]
  },
  {
    "id": "lera-raskraska",
    "key": "lera-raskraska",
    "title": "Раскраска",
    "tag": "Айдентика, книга и соцсети",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/raskraska-cover.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "branding",
      "print",
      "social"
    ],
    "order": 100,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/raskraska-cover.webp",
        "title": "Обложка книги «Раскраска»",
        "width": 653,
        "height": 873
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/raskraska-project.webp",
        "title": "Раскраска — о проекте",
        "width": 1080,
        "height": 1350
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/raskraska-wordmark.webp",
        "title": "Раскраска — логотип",
        "width": 521,
        "height": 411
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/raskraska-illustrations.webp",
        "title": "Раскраска — иллюстрации",
        "width": 1381,
        "height": 1321
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/raskraska-social-grid.webp",
        "title": "Раскраска — сетка соцсетей",
        "width": 948,
        "height": 1574
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/raskraska-lu.webp",
        "title": "Раскраска — Лу Синицына",
        "width": 312,
        "height": 390
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/raskraska-how.webp",
        "title": "Раскраска — просмотр работ",
        "width": 422,
        "height": 529
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/raskraska-artist.webp",
        "title": "Раскраска — пост для художников",
        "width": 430,
        "height": 522
      }
    ]
  },
  {
    "id": "alexander-infographic-foxy-gloves",
    "key": "alexander-infographic-foxy-gloves",
    "title": "Нитриловые перчатки Foxy Gloves",
    "tag": "Инфографика для карточки товара",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-infographic-foxy-gloves.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "infographics"
    ],
    "order": 110,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-infographic-foxy-gloves.webp",
        "title": "Нитриловые перчатки Foxy Gloves",
        "width": 466,
        "height": 600
      }
    ]
  },
  {
    "key": "knight.webp",
    "title": "The Knight",
    "tag": "Постер",
    "kind": "image",
    "src": "/portfolio/media/knight.webp",
    "poster": null,
    "link": null,
    "id": "knight.webp",
    "order": 120,
    "designerId": "blinchik",
    "categories": [
      "posters"
    ]
  },
  {
    "key": "lera-embroidery-lab",
    "id": "lera-embroidery-lab",
    "title": "Лаборатория вышивки",
    "tag": "Серия афиш мастер-класса",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/embroidery-lab.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters"
    ],
    "order": 130,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/embroidery-lab.webp",
        "kind": "image",
        "poster": null,
        "title": "Лаборатория вышивки"
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/embroidery-lab-blue.webp",
        "title": "Лаборатория вышивки — синяя афиша",
        "width": 682,
        "height": 854
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/embroidery-lab-house.webp",
        "title": "Лаборатория вышивки — домик",
        "width": 683,
        "height": 854
      }
    ]
  },
  {
    "key": "lera-june-digest",
    "id": "lera-june-digest",
    "title": "Дайджест июня",
    "tag": "Афиша событий",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/june-digest.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters"
    ],
    "order": 140
  },
  {
    "key": "lera-garage-sale",
    "id": "lera-garage-sale",
    "title": "Garage sale",
    "tag": "Серия постов для соцсетей",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/garage-sale.webp",
    "poster": "/portfolio/media/lera-nerybka/garage-sale-preview.webp",
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "social"
    ],
    "order": 150,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/garage-sale.webp",
        "kind": "image",
        "poster": "/portfolio/media/lera-nerybka/garage-sale-preview.webp",
        "title": "Garage sale"
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/garage-participants-2.webp",
        "title": "Garage sale — участники",
        "width": 970,
        "height": 572
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/garage-dj.webp",
        "title": "Garage sale — DJ-set",
        "width": 780,
        "height": 1217
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/garage-tarot.webp",
        "title": "Garage sale — таро-зона",
        "width": 971,
        "height": 671
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/garage-lottery.webp",
        "title": "Garage sale — лотерея",
        "width": 951,
        "height": 671
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/garage-collage.webp",
        "title": "Garage sale — коллаж",
        "width": 479,
        "height": 576
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/garage-decoration.webp",
        "title": "Garage sale — оформление",
        "width": 446,
        "height": 678
      }
    ]
  },
  {
    "key": "lezo.mp4",
    "title": "LEZO Group",
    "tag": "3D раскрытие знака",
    "kind": "video",
    "src": "/portfolio/media/lezo.mp4",
    "poster": "/portfolio/media/posters/lezo.webp",
    "link": null,
    "id": "lezo.mp4",
    "order": 160,
    "designerId": "blinchik",
    "categories": [
      "motion",
      "identity"
    ]
  },
  {
    "key": "lera-creative-meeting",
    "id": "lera-creative-meeting",
    "title": "Творческая встреча",
    "tag": "Коллажи и оформление встречи",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/creative-meeting.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "social"
    ],
    "order": 170,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/creative-meeting.webp",
        "kind": "image",
        "poster": null,
        "title": "Творческая встреча"
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/creative-meeting-paper.webp",
        "title": "Творческая встреча — бумажный коллаж",
        "width": 272,
        "height": 340
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/creative-meeting-phone.webp",
        "title": "Творческая встреча — пластилиновый телефон",
        "width": 429,
        "height": 536
      }
    ]
  },
  {
    "key": "fightclub.webp",
    "title": "Fight Club",
    "tag": "Постер",
    "kind": "image",
    "src": "/portfolio/media/fightclub.webp",
    "poster": null,
    "link": null,
    "id": "fightclub.webp",
    "order": 180,
    "designerId": "blinchik",
    "categories": [
      "posters"
    ]
  },
  {
    "key": "atlanta-1.webp",
    "title": "Atlanta Crypt",
    "tag": "Система знака",
    "kind": "image",
    "src": "/portfolio/media/atlanta-1.webp",
    "poster": null,
    "link": null,
    "id": "atlanta-1.webp",
    "order": 190,
    "designerId": "blinchik",
    "categories": [
      "identity"
    ]
  },
  {
    "key": "mcd.mp4",
    "title": "Money Sleep",
    "tag": "Комикс в движении",
    "kind": "video",
    "src": "/portfolio/media/mcd.mp4",
    "poster": "/portfolio/media/posters/mcd.webp",
    "link": null,
    "id": "mcd.mp4",
    "order": 200,
    "designerId": "blinchik",
    "categories": [
      "motion",
      "campaigns"
    ]
  },
  {
    "key": "blinchik.mp4",
    "title": "Blinchik The Design",
    "tag": "Интро знака",
    "kind": "video",
    "src": "/portfolio/media/blinchik.mp4",
    "poster": "/portfolio/media/posters/blinchik.webp",
    "link": null,
    "id": "blinchik.mp4",
    "order": 210,
    "designerId": "blinchik",
    "categories": [
      "motion",
      "identity"
    ]
  },
  {
    "id": "alexander-infographic-wifi-camera",
    "key": "alexander-infographic-wifi-camera",
    "title": "Wi-Fi камера для дома",
    "tag": "Инфографика для карточки товара",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-infographic-wifi-camera.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "infographics"
    ],
    "order": 220,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-infographic-wifi-camera.webp",
        "title": "Wi-Fi камера для дома",
        "width": 465,
        "height": 600
      }
    ]
  },
  {
    "key": "fable.mp4",
    "title": "Fable Telecom",
    "tag": "Петля персонажа",
    "kind": "video",
    "src": "/portfolio/media/fable.mp4",
    "poster": "/portfolio/media/posters/fable.webp",
    "link": null,
    "id": "fable.mp4",
    "order": 230,
    "designerId": "blinchik",
    "categories": [
      "motion",
      "character"
    ]
  },
  {
    "id": "alexander-infographic-juicer",
    "key": "alexander-infographic-juicer",
    "title": "Шнековая соковыжималка",
    "tag": "Инфографика для карточки товара",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-infographic-juicer.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "infographics"
    ],
    "order": 240,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-infographic-juicer.webp",
        "title": "Шнековая соковыжималка",
        "width": 466,
        "height": 600
      }
    ]
  },
  {
    "key": "panda-1.webp",
    "title": "Панда VPN",
    "tag": "Баннер с персонажем",
    "kind": "image",
    "src": "/portfolio/media/panda-1.webp",
    "poster": null,
    "link": null,
    "id": "panda-1.webp",
    "order": 250,
    "designerId": "blinchik",
    "categories": [
      "character",
      "campaigns"
    ]
  },
  {
    "id": "alexander-infographic-microphone",
    "key": "alexander-infographic-microphone",
    "title": "Петличный микрофон",
    "tag": "Инфографика для карточки товара",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-infographic-microphone.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "infographics"
    ],
    "order": 260,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-infographic-microphone.webp",
        "title": "Петличный микрофон",
        "width": 468,
        "height": 600
      }
    ]
  },
  {
    "key": "trump.webp",
    "title": "Blinchik Design",
    "tag": "Рекламный кадр",
    "kind": "image",
    "src": "/portfolio/media/trump.webp",
    "poster": null,
    "link": null,
    "id": "trump.webp",
    "order": 270,
    "designerId": "blinchik",
    "categories": [
      "campaigns"
    ]
  },
  {
    "id": "alexander-infographic-trimmer-duo",
    "key": "alexander-infographic-trimmer-duo",
    "title": "Профессиональный триммер 2 в 1",
    "tag": "Инфографика для карточки товара",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-infographic-trimmer-duo.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "infographics"
    ],
    "order": 280,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-infographic-trimmer-duo.webp",
        "title": "Профессиональный триммер 2 в 1",
        "width": 467,
        "height": 600
      }
    ]
  },
  {
    "key": "giveaway-shoes.webp",
    "title": "Airstep × Чортус",
    "tag": "Розыгрыш кроссовок",
    "kind": "image",
    "src": "/portfolio/media/giveaway-shoes.webp",
    "poster": null,
    "link": null,
    "id": "giveaway-shoes.webp",
    "order": 290,
    "designerId": "blinchik",
    "categories": [
      "campaigns"
    ]
  },
  {
    "id": "alexander-infographic-nike-airforce",
    "key": "alexander-infographic-nike-airforce",
    "title": "Nike Air Force 1",
    "tag": "Инфографика для карточки товара",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-infographic-nike-airforce.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "infographics"
    ],
    "order": 300,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-infographic-nike-airforce.webp",
        "title": "Nike Air Force 1",
        "width": 465,
        "height": 600
      }
    ]
  },
  {
    "key": "billboard.webp",
    "title": "Щит",
    "tag": "Наружная реклама",
    "kind": "image",
    "src": "/portfolio/media/billboard.webp",
    "poster": null,
    "link": null,
    "id": "billboard.webp",
    "order": 310,
    "designerId": "blinchik",
    "categories": [
      "campaigns"
    ]
  },
  {
    "key": "aezakmi.mp4",
    "title": "Aezakmi",
    "tag": "Глитч интро",
    "kind": "video",
    "src": "/portfolio/media/aezakmi.mp4",
    "poster": "/portfolio/media/posters/aezakmi.webp",
    "link": null,
    "id": "aezakmi.mp4",
    "order": 320,
    "designerId": "blinchik",
    "categories": [
      "motion"
    ]
  },
  {
    "id": "alexander-infographic-trimmer-kit",
    "key": "alexander-infographic-trimmer-kit",
    "title": "Триммер — набор 5 в 1",
    "tag": "Инфографика для карточки товара",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-infographic-trimmer-kit.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "infographics"
    ],
    "order": 330,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-infographic-trimmer-kit.webp",
        "title": "Триммер — набор 5 в 1",
        "width": 468,
        "height": 601
      }
    ]
  },
  {
    "key": "panda-2.mp4",
    "title": "Панда VPN",
    "tag": "Персонаж в движении",
    "kind": "video",
    "src": "/portfolio/media/panda-2.mp4",
    "poster": "/portfolio/media/posters/panda-2.webp",
    "link": null,
    "id": "panda-2.mp4",
    "order": 340,
    "designerId": "blinchik",
    "categories": [
      "character",
      "motion"
    ]
  },
  {
    "id": "alexander-banner-marketplace-training",
    "key": "alexander-banner-marketplace-training",
    "title": "Обучение работе с маркетплейсами",
    "tag": "Рекламный баннер",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-banner-marketplace-training.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "campaigns"
    ],
    "order": 350,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-banner-marketplace-training.webp",
        "title": "Обучение работе с маркетплейсами",
        "width": 506,
        "height": 506
      }
    ]
  },
  {
    "id": "alexander-banner-mortgage",
    "key": "alexander-banner-mortgage",
    "title": "Моя ипотека — партнёрство",
    "tag": "Рекламный баннер",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-banner-mortgage.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "campaigns"
    ],
    "order": 360,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-banner-mortgage.webp",
        "title": "Моя ипотека — партнёрство",
        "width": 505,
        "height": 506
      }
    ]
  },
  {
    "id": "alexander-banner-bianca",
    "key": "alexander-banner-bianca",
    "title": "Bianca Townhouses",
    "tag": "Рекламный баннер",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-banner-bianca.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "campaigns"
    ],
    "order": 370,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-banner-bianca.webp",
        "title": "Bianca Townhouses",
        "width": 506,
        "height": 506
      }
    ]
  },
  {
    "id": "alexander-banner-metodfest",
    "key": "alexander-banner-metodfest",
    "title": "Методфест",
    "tag": "Рекламный баннер",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-banner-metodfest.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "campaigns"
    ],
    "order": 380,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-banner-metodfest.webp",
        "title": "Методфест",
        "width": 505,
        "height": 506
      }
    ]
  },
  {
    "id": "alexander-banner-mpstats",
    "key": "alexander-banner-mpstats",
    "title": "MPSTATS PRO",
    "tag": "Рекламный баннер",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-banner-mpstats.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "campaigns"
    ],
    "order": 390,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-banner-mpstats.webp",
        "title": "MPSTATS PRO",
        "width": 1063,
        "height": 580
      }
    ]
  },
  {
    "id": "alexander-banner-telegram-experts",
    "key": "alexander-banner-telegram-experts",
    "title": "Продвижение экспертов в Telegram",
    "tag": "Рекламный баннер",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-banner-telegram-experts.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "campaigns"
    ],
    "order": 400,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-banner-telegram-experts.webp",
        "title": "Продвижение экспертов в Telegram",
        "width": 1053,
        "height": 580
      }
    ]
  },
  {
    "id": "alexander-presentation-blogger-advertising",
    "key": "alexander-presentation-blogger-advertising",
    "title": "Реклама у блогеров",
    "tag": "Слайды презентации",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-presentation-blogger-advertising-1.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "presentations"
    ],
    "order": 410,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-presentation-blogger-advertising-1.webp",
        "title": "Реклама у блогеров — слайд 1",
        "width": 623,
        "height": 350
      },
      {
        "src": "/portfolio/media/alexander/alexander-presentation-blogger-advertising-2.webp",
        "title": "Реклама у блогеров — слайд 2",
        "width": 624,
        "height": 350
      },
      {
        "src": "/portfolio/media/alexander/alexander-presentation-blogger-advertising-3.webp",
        "title": "Реклама у блогеров — слайд 3",
        "width": 620,
        "height": 350
      }
    ]
  },
  {
    "id": "alexander-presentation-relationships-course",
    "key": "alexander-presentation-relationships-course",
    "title": "Презентация курса об отношениях",
    "tag": "Слайды презентации",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-presentation-relationships-course-1.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "presentations"
    ],
    "order": 420,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-presentation-relationships-course-1.webp",
        "title": "Презентация курса об отношениях — слайд 1",
        "width": 403,
        "height": 350
      },
      {
        "src": "/portfolio/media/alexander/alexander-presentation-relationships-course-2.webp",
        "title": "Презентация курса об отношениях — слайд 2",
        "width": 403,
        "height": 350
      },
      {
        "src": "/portfolio/media/alexander/alexander-presentation-relationships-course-3.webp",
        "title": "Презентация курса об отношениях — слайд 3",
        "width": 403,
        "height": 350
      }
    ]
  },
  {
    "id": "alexander-website-olga-marhel",
    "key": "alexander-website-olga-marhel",
    "title": "Команда Ольги Мархель",
    "tag": "Фрагмент макета сайта",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-website-olga-marhel.webp",
    "poster": "/portfolio/media/alexander/alexander-website-olga-marhel-preview.webp",
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "ui"
    ],
    "order": 430,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-website-olga-marhel.webp",
        "poster": "/portfolio/media/alexander/alexander-website-olga-marhel-preview.webp",
        "title": "Команда Ольги Мархель",
        "width": 772,
        "height": 1341
      }
    ]
  },
  {
    "id": "alexander-website-video-course",
    "key": "alexander-website-video-course",
    "title": "Курс создания видео",
    "tag": "Фрагмент макета сайта",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-website-video-course.webp",
    "poster": "/portfolio/media/alexander/alexander-website-video-course-preview.webp",
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "ui"
    ],
    "order": 440,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-website-video-course.webp",
        "poster": "/portfolio/media/alexander/alexander-website-video-course-preview.webp",
        "title": "Курс создания видео",
        "width": 697,
        "height": 1341
      }
    ]
  },
  {
    "id": "alexander-vk-bazooka",
    "key": "alexander-vk-bazooka",
    "title": "Bazooka Store",
    "tag": "Обложка и меню сообщества",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-vk-bazooka-cover.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "social"
    ],
    "order": 450,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-vk-bazooka-cover.webp",
        "title": "Bazooka Store — обложка",
        "width": 954,
        "height": 383
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-bazooka-menu-1.webp",
        "title": "Bazooka Store — меню 1",
        "width": 213,
        "height": 145
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-bazooka-menu-2.webp",
        "title": "Bazooka Store — меню 2",
        "width": 213,
        "height": 145
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-bazooka-menu-3.webp",
        "title": "Bazooka Store — меню 3",
        "width": 213,
        "height": 145
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-bazooka-menu-4.webp",
        "title": "Bazooka Store — меню 4",
        "width": 213,
        "height": 145
      }
    ]
  },
  {
    "id": "alexander-vk-digital",
    "key": "alexander-vk-digital",
    "title": "Digital студия",
    "tag": "Обложка и меню сообщества",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-vk-digital-cover.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "social"
    ],
    "order": 460,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-vk-digital-cover.webp",
        "title": "Digital студия — обложка",
        "width": 954,
        "height": 383
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-digital-menu-1.webp",
        "title": "Digital студия — меню 1",
        "width": 213,
        "height": 145
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-digital-menu-2.webp",
        "title": "Digital студия — меню 2",
        "width": 213,
        "height": 145
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-digital-menu-3.webp",
        "title": "Digital студия — меню 3",
        "width": 213,
        "height": 145
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-digital-menu-4.webp",
        "title": "Digital студия — меню 4",
        "width": 213,
        "height": 145
      }
    ]
  },
  {
    "id": "alexander-vk-seven-seas",
    "key": "alexander-vk-seven-seas",
    "title": "Семь морей",
    "tag": "Обложка и меню сообщества",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-vk-seven-seas-cover.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "social"
    ],
    "order": 470,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-vk-seven-seas-cover.webp",
        "title": "Семь морей — обложка",
        "width": 954,
        "height": 380
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-seven-seas-menu-1.webp",
        "title": "Семь морей — меню 1",
        "width": 213,
        "height": 144
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-seven-seas-menu-2.webp",
        "title": "Семь морей — меню 2",
        "width": 213,
        "height": 144
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-seven-seas-menu-3.webp",
        "title": "Семь морей — меню 3",
        "width": 213,
        "height": 144
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-seven-seas-menu-4.webp",
        "title": "Семь морей — меню 4",
        "width": 213,
        "height": 144
      }
    ]
  },
  {
    "id": "alexander-vk-furniture",
    "key": "alexander-vk-furniture",
    "title": "Мебель на заказ",
    "tag": "Обложка и меню сообщества",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-vk-furniture-cover.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "social"
    ],
    "order": 480,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-vk-furniture-cover.webp",
        "title": "Мебель на заказ — обложка",
        "width": 954,
        "height": 380
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-furniture-menu-1.webp",
        "title": "Мебель на заказ — меню 1",
        "width": 213,
        "height": 144
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-furniture-menu-2.webp",
        "title": "Мебель на заказ — меню 2",
        "width": 213,
        "height": 144
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-furniture-menu-3.webp",
        "title": "Мебель на заказ — меню 3",
        "width": 213,
        "height": 144
      },
      {
        "src": "/portfolio/media/alexander/alexander-vk-furniture-menu-4.webp",
        "title": "Мебель на заказ — меню 4",
        "width": 213,
        "height": 144
      }
    ]
  },
  {
    "id": "alexander-logo-roll-way",
    "key": "alexander-logo-roll-way",
    "title": "Roll Way",
    "tag": "Логотип",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-logo-roll-way.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "identity"
    ],
    "order": 490,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-logo-roll-way.webp",
        "title": "Roll Way",
        "width": 494,
        "height": 494
      }
    ]
  },
  {
    "id": "alexander-logo-stroy-garant",
    "key": "alexander-logo-stroy-garant",
    "title": "Строй Гарант",
    "tag": "Логотип",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-logo-stroy-garant.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "identity"
    ],
    "order": 500,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-logo-stroy-garant.webp",
        "title": "Строй Гарант",
        "width": 494,
        "height": 494
      }
    ]
  },
  {
    "id": "alexander-logo-double-much",
    "key": "alexander-logo-double-much",
    "title": "Double Much",
    "tag": "Логотип",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-logo-double-much.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "identity"
    ],
    "order": 510,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-logo-double-much.webp",
        "title": "Double Much",
        "width": 494,
        "height": 494
      }
    ]
  },
  {
    "id": "alexander-logo-graf-market",
    "key": "alexander-logo-graf-market",
    "title": "Graf Market",
    "tag": "Логотип",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-logo-graf-market.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "identity"
    ],
    "order": 520,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-logo-graf-market.webp",
        "title": "Graf Market",
        "width": 494,
        "height": 494
      }
    ]
  },
  {
    "id": "alexander-logo-web-media",
    "key": "alexander-logo-web-media",
    "title": "Web Media",
    "tag": "Логотип",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-logo-web-media.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "identity"
    ],
    "order": 530,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-logo-web-media.webp",
        "title": "Web Media",
        "width": 494,
        "height": 494
      }
    ]
  },
  {
    "id": "alexander-logo-tech-agency",
    "key": "alexander-logo-tech-agency",
    "title": "Tech Agency",
    "tag": "Логотип",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-logo-tech-agency.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "identity"
    ],
    "order": 540,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-logo-tech-agency.webp",
        "title": "Tech Agency",
        "width": 494,
        "height": 494
      }
    ]
  },
  {
    "id": "alexander-logo-rental-car",
    "key": "alexander-logo-rental-car",
    "title": "Rental Car",
    "tag": "Логотип",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-logo-rental-car.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "identity"
    ],
    "order": 550,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-logo-rental-car.webp",
        "title": "Rental Car",
        "width": 494,
        "height": 494
      }
    ]
  },
  {
    "id": "alexander-logo-turbo-service",
    "key": "alexander-logo-turbo-service",
    "title": "Turbo Service",
    "tag": "Логотип",
    "kind": "image",
    "src": "/portfolio/media/alexander/alexander-logo-turbo-service.webp",
    "poster": null,
    "link": null,
    "designerId": "alexander-ladinskii",
    "categories": [
      "identity"
    ],
    "order": 560,
    "gallery": [
      {
        "src": "/portfolio/media/alexander/alexander-logo-turbo-service.webp",
        "title": "Turbo Service",
        "width": 494,
        "height": 494
      }
    ]
  },
  {
    "id": "lera-triglinki-office",
    "key": "lera-triglinki-office",
    "title": "Office — Triglinki × Blank",
    "tag": "Афиша и посты вечеринки",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-office-1.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters",
      "social"
    ],
    "order": 570,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-office-1.webp",
        "title": "Афиша Office",
        "width": 734,
        "height": 917
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-office-2.webp",
        "title": "Special Guests",
        "width": 373,
        "height": 467
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-office-3.webp",
        "title": "Line Up Office",
        "width": 542,
        "height": 677
      }
    ]
  },
  {
    "id": "lera-triglinki-coffee",
    "key": "lera-triglinki-coffee",
    "title": "Subbotnik Coffee Party",
    "tag": "Серия афиш и постов",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-coffee-1.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters",
      "social"
    ],
    "order": 580,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-coffee-1.webp",
        "title": "Subbotnik Coffee Party",
        "width": 1436,
        "height": 1800
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-coffee-2.webp",
        "title": "DJ Sets и интерактивные зоны",
        "width": 594,
        "height": 742
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-coffee-3.webp",
        "title": "Subbotnik — Back to 2007",
        "width": 263,
        "height": 391
      }
    ]
  },
  {
    "id": "lera-triglinki-market",
    "key": "lera-triglinki-market",
    "title": "Garage Market — Swap Zone",
    "tag": "Афиша и пост для соцсетей",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-market-1.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters",
      "social"
    ],
    "order": 590,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-market-1.webp",
        "title": "Garage Market — афиша",
        "width": 1380,
        "height": 1725
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-market-2.webp",
        "title": "Garage Market — DJ Line Up",
        "width": 818,
        "height": 1023
      }
    ]
  },
  {
    "id": "lera-triglinki-clay",
    "key": "lera-triglinki-clay",
    "title": "Привет, пластилин!",
    "tag": "Афиши мастер-класса",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-clay-1.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters"
    ],
    "order": 600,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-clay-1.webp",
        "title": "Привет, пластилин! — детский мастер-класс",
        "width": 550,
        "height": 688
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-clay-2.webp",
        "title": "Привет, пластилин! — афиша",
        "width": 355,
        "height": 444
      }
    ]
  },
  {
    "id": "lera-triglinki-collage",
    "key": "lera-triglinki-collage",
    "title": "Коллажные мастер-классы",
    "tag": "Серия афиш мастер-классов",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-collage-1.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters"
    ],
    "order": 610,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-collage-1.webp",
        "title": "Коллаж коллаж!",
        "width": 946,
        "height": 1182
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-collage-2.webp",
        "title": "Коллаж коллаж коллаж!",
        "width": 240,
        "height": 372
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-collage-3.webp",
        "title": "Моё послание миру",
        "width": 519,
        "height": 649
      }
    ]
  },
  {
    "id": "lera-triglinki-coliving",
    "key": "lera-triglinki-coliving",
    "title": "Triglinki Coliving",
    "tag": "Коллажный пост",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-coliving-1.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "social"
    ],
    "order": 620,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-coliving-1.webp",
        "title": "Triglinki Coliving",
        "width": 1441,
        "height": 1800
      }
    ]
  },
  {
    "id": "lera-triglinki-lecture",
    "key": "lera-triglinki-lecture",
    "title": "Лекция «Как создать femme fatale»",
    "tag": "Афиша лекции",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-lecture-1.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters"
    ],
    "order": 630,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-lecture-1.webp",
        "title": "Лекция «Как создать femme fatale»",
        "width": 405,
        "height": 506
      }
    ]
  },
  {
    "id": "lera-triglinki-fairies",
    "key": "lera-triglinki-fairies",
    "title": "Лекция «Сказки о феях и эльфах»",
    "tag": "Афиша лекции",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-fairies-1.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters"
    ],
    "order": 640,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-fairies-1.webp",
        "title": "Сказки о феях и эльфах",
        "width": 278,
        "height": 348
      }
    ]
  },
  {
    "id": "lera-triglinki-program",
    "key": "lera-triglinki-program",
    "title": "Triglinki — программа события",
    "tag": "Афиша с программой",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-program-1.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters"
    ],
    "order": 650,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-program-1.webp",
        "title": "Программа события",
        "width": 396,
        "height": 495
      }
    ]
  },
  {
    "id": "ooo-prokuratura",
    "key": "ooo-prokuratura",
    "title": "Прокуратура РФ",
    "tag": "Книга, буклет и печатные материалы",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-prokuratura-hero-tg-9.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "print",
      "campaigns"
    ],
    "order": 660,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-prokuratura-tg-8.webp",
        "kind": "image",
        "title": "Прокуратура РФ"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-prokuratura-tg-9.webp",
        "kind": "image",
        "title": "Прокуратура РФ"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-prokuratura-tg-10.webp",
        "kind": "image",
        "title": "Прокуратура РФ"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-prokuratura-tg-11.webp",
        "kind": "image",
        "title": "Прокуратура РФ"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-prokuratura-tg-12.webp",
        "kind": "image",
        "title": "Прокуратура РФ"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-design-7.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-design-7.webp",
        "title": "Прокуратура РФ — видеокейс"
      }
    ]
  },
  {
    "id": "lera-triglinki-print-display",
    "key": "lera-triglinki-print-display",
    "title": "Triglinki — серия печатных афиш",
    "tag": "Печатные афиши в интерьере",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-print-display-1.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters",
      "print"
    ],
    "order": 670,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-print-display-1.webp",
        "title": "Серия печатных афиш",
        "width": 1800,
        "height": 1799
      }
    ]
  },
  {
    "id": "ooo-sumo",
    "key": "ooo-sumo",
    "title": "Федерация сумо России",
    "tag": "Баннеры и оформление соцсетей",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-sumo-hero-tg-19.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "campaigns",
      "social"
    ],
    "order": 680,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-sumo-tg-15.webp",
        "kind": "image",
        "title": "Федерация сумо России"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-sumo-tg-16.webp",
        "kind": "image",
        "title": "Федерация сумо России"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-sumo-tg-17.webp",
        "kind": "image",
        "title": "Федерация сумо России"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-sumo-tg-18.webp",
        "kind": "image",
        "title": "Федерация сумо России"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-sumo-tg-19.webp",
        "kind": "image",
        "title": "Федерация сумо России"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-design-14.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-design-14.webp",
        "title": "Федерация сумо — видеокейс"
      }
    ]
  },
  {
    "id": "lera-triglinki-newyear",
    "key": "lera-triglinki-newyear",
    "title": "New Year Party",
    "tag": "Афиша новогодней вечеринки",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-newyear.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "posters"
    ],
    "order": 690,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/triglinki-newyear.webp",
        "title": "New Year Party",
        "width": 594,
        "height": 736
      }
    ]
  },
  {
    "id": "ooo-pixy",
    "key": "ooo-pixy",
    "title": "Искусство запуска · Настя Pixy",
    "tag": "Дизайн настольной игры",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-pixy-tg-24.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "branding",
      "print",
      "infographics"
    ],
    "order": 700,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-pixy-tg-23.webp",
        "kind": "image",
        "title": "Искусство запуска · Настя Pixy"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-pixy-tg-24.webp",
        "kind": "image",
        "title": "Искусство запуска · Настя Pixy"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-pixy-tg-25.webp",
        "kind": "image",
        "title": "Искусство запуска · Настя Pixy"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-pixy-tg-26.webp",
        "kind": "image",
        "title": "Искусство запуска · Настя Pixy"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-pixy-tg-27.webp",
        "kind": "image",
        "title": "Искусство запуска · Настя Pixy"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-pixy-tg-28.webp",
        "kind": "image",
        "title": "Искусство запуска · Настя Pixy"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-pixy-tg-29.webp",
        "kind": "image",
        "title": "Искусство запуска · Настя Pixy"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-pixy-tg-30.webp",
        "kind": "image",
        "title": "Искусство запуска · Настя Pixy"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-design-22.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-design-22.webp",
        "title": "Искусство запуска — настольная игра"
      }
    ]
  },
  {
    "id": "ooo-szip",
    "key": "ooo-szip",
    "title": "СЗИП",
    "tag": "Айдентика, сайт и печатные материалы",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-szip-hero-tg-36.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "identity",
      "branding",
      "ui",
      "print",
      "social"
    ],
    "order": 710,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-szip-tg-32.webp",
        "kind": "image",
        "title": "СЗИП"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-szip-tg-34.webp",
        "kind": "image",
        "title": "СЗИП"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-szip-tg-35.webp",
        "kind": "image",
        "title": "СЗИП"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-szip-tg-36.webp",
        "kind": "image",
        "title": "СЗИП"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-szip-tg-37.webp",
        "kind": "image",
        "title": "СЗИП"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-szip-tg-38.webp",
        "kind": "image",
        "title": "СЗИП"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-szip-tg-39.webp",
        "kind": "image",
        "title": "СЗИП"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-szip-tg-40.webp",
        "kind": "image",
        "title": "СЗИП"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-szip-tg-41.webp",
        "kind": "image",
        "title": "СЗИП"
      }
    ]
  },
  {
    "id": "ooo-silk-road",
    "key": "ooo-silk-road",
    "title": "Silk Road",
    "tag": "Айдентика и оформление соцсетей",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-silk-road-tg-50.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "identity",
      "branding",
      "ui",
      "social",
      "print"
    ],
    "order": 720,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-silk-road-tg-50.webp",
        "kind": "image",
        "title": "Silk Road"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-silk-road-tg-53.webp",
        "kind": "image",
        "title": "Silk Road"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-silk-road-tg-54.webp",
        "kind": "image",
        "title": "Silk Road"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-silk-road-tg-55.webp",
        "kind": "image",
        "title": "Silk Road"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-silk-road-tg-56.webp",
        "kind": "image",
        "title": "Silk Road"
      }
    ]
  },
  {
    "id": "lera-inno",
    "key": "lera-inno",
    "title": "INNO — Partner Deck",
    "tag": "Партнёрская презентация",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/inno-slide-1.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "presentations",
      "branding"
    ],
    "order": 730,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/inno-slide-1.webp",
        "title": "Partner Deck",
        "width": 925,
        "height": 520
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/inno-slide-2.webp",
        "title": "Artist Support Program",
        "width": 925,
        "height": 520
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/inno-slide-3.webp",
        "title": "Why Partner With Us",
        "width": 925,
        "height": 520
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/inno-slide-4.webp",
        "title": "Who It’s For",
        "width": 925,
        "height": 520
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/inno-slide-5.webp",
        "title": "Product Range",
        "width": 925,
        "height": 520
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/inno-slide-6.webp",
        "title": "Contact & Next Steps",
        "width": 925,
        "height": 520
      }
    ]
  },
  {
    "id": "ooo-yugshveyprom",
    "key": "ooo-yugshveyprom",
    "title": "Югшвейпром",
    "tag": "Корпоративный сайт швейной фабрики",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-yugshveyprom-tg-64.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "ui"
    ],
    "order": 740,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-yugshveyprom-tg-58.webp",
        "kind": "image",
        "title": "Югшвейпром"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-yugshveyprom-tg-61.webp",
        "kind": "image",
        "title": "Югшвейпром"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-yugshveyprom-tg-62.webp",
        "kind": "image",
        "title": "Югшвейпром"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-yugshveyprom-tg-63.webp",
        "kind": "image",
        "title": "Югшвейпром"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-yugshveyprom-tg-64.webp",
        "kind": "image",
        "title": "Югшвейпром"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-yugshveyprom-tg-65.webp",
        "kind": "image",
        "title": "Югшвейпром"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-design-57.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-design-57.webp",
        "title": "Югшвейпром — анимация сайта"
      }
    ]
  },
  {
    "id": "lera-art-design-festival",
    "key": "lera-art-design-festival",
    "title": "Art&Design Festival",
    "tag": "Айдентика, иллюстрации и мерч",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/art-festival-eyes.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "branding",
      "print",
      "social"
    ],
    "order": 750,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/art-festival-eyes.webp",
        "title": "Art&Design Festival — пластилиновые иллюстрации",
        "width": 1080,
        "height": 1080
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/art-festival-notebook.webp",
        "title": "Art&Design Festival — блокнот",
        "width": 726,
        "height": 738
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/art-festival-pen.webp",
        "title": "Art&Design Festival — ручка",
        "width": 652,
        "height": 558
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/art-festival-badge.webp",
        "title": "Art&Design Festival — бейдж",
        "width": 912,
        "height": 913
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/art-festival-talk.webp",
        "title": "Designer Artist Talk — афиша",
        "width": 431,
        "height": 431
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/art-festival-print.webp",
        "title": "Art&Design Festival — печатные материалы",
        "width": 1800,
        "height": 1191
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/art-festival-social-poster.webp",
        "title": "Art&Design Festival — афиша для соцсетей",
        "width": 431,
        "height": 436
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/art-festival-web-banner.webp",
        "title": "Art&Design Festival — баннер для сайта",
        "width": 1254,
        "height": 330
      }
    ]
  },
  {
    "id": "ooo-vek-energo",
    "key": "ooo-vek-energo",
    "title": "ВЭК Энерго",
    "tag": "Айдентика, сайт и навигация завода",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-vek-energo-tg-76.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "identity",
      "branding",
      "ui",
      "print",
      "posters"
    ],
    "order": 760,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-vek-energo-tg-74.webp",
        "kind": "image",
        "title": "ВЭК Энерго"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vek-energo-tg-75.webp",
        "kind": "image",
        "title": "ВЭК Энерго"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vek-energo-tg-76.webp",
        "kind": "image",
        "title": "ВЭК Энерго"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vek-energo-tg-77.webp",
        "kind": "image",
        "title": "ВЭК Энерго"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vek-energo-tg-78.webp",
        "kind": "image",
        "title": "ВЭК Энерго"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vek-energo-tg-79.webp",
        "kind": "image",
        "title": "ВЭК Энерго"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vek-energo-tg-80.webp",
        "kind": "image",
        "title": "ВЭК Энерго"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vek-energo-tg-81.webp",
        "kind": "image",
        "title": "ВЭК Энерго"
      }
    ]
  },
  {
    "id": "lera-superposition",
    "key": "lera-superposition",
    "title": "Superposition",
    "tag": "Фотография и коллажные постеры",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/superposition-portraits.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "campaigns",
      "social",
      "print"
    ],
    "order": 770,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/superposition-portraits.webp",
        "title": "Superposition — серия портретов",
        "width": 1374,
        "height": 1029
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/superposition-bridges.webp",
        "title": "Superposition — «Жжём мосты»",
        "width": 836,
        "height": 1047
      }
    ]
  },
  {
    "id": "ooo-wanted",
    "key": "ooo-wanted",
    "title": "Артём Гарибов · Wanted",
    "tag": "Айдентика художника и оформление сайта",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-wanted-tg-83.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "identity",
      "branding",
      "ui",
      "social",
      "campaigns"
    ],
    "order": 780,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-wanted-tg-83.webp",
        "kind": "image",
        "title": "Артём Гарибов · Wanted"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-wanted-tg-85.webp",
        "kind": "image",
        "title": "Артём Гарибов · Wanted"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-wanted-tg-86.webp",
        "kind": "image",
        "title": "Артём Гарибов · Wanted"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-wanted-tg-87.webp",
        "kind": "image",
        "title": "Артём Гарибов · Wanted"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-wanted-tg-88.webp",
        "kind": "image",
        "title": "Артём Гарибов · Wanted"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-wanted-tg-89.webp",
        "kind": "image",
        "title": "Артём Гарибов · Wanted"
      }
    ]
  },
  {
    "id": "lera-t-action",
    "key": "lera-t-action",
    "title": "T-action",
    "tag": "Коллажные постеры",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/t-action-nature.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "social",
      "print"
    ],
    "order": 790,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/t-action-nature.webp",
        "title": "T-action — фотография и пластилиновый коллаж",
        "width": 1567,
        "height": 1023
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/t-action-not-alone.webp",
        "title": "T-action — We Are Not Alone",
        "width": 1205,
        "height": 1800
      }
    ]
  },
  {
    "id": "ooo-saf",
    "key": "ooo-saf",
    "title": "Сектор активных фанатов",
    "tag": "Логотип и стикеры футбольного сектора",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-saf-tg-101.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "identity",
      "branding",
      "stickers"
    ],
    "order": 800,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-saf-tg-97.webp",
        "kind": "image",
        "title": "Сектор активных фанатов"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-saf-tg-98.webp",
        "kind": "image",
        "title": "Сектор активных фанатов"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-saf-tg-99.webp",
        "kind": "image",
        "title": "Сектор активных фанатов"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-saf-tg-100.webp",
        "kind": "image",
        "title": "Сектор активных фанатов"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-saf-tg-101.webp",
        "kind": "image",
        "title": "Сектор активных фанатов"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-design-102.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-design-102.webp",
        "title": "Сектор активных фанатов — логотип"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-design-103.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-design-103.webp",
        "title": "Сектор активных фанатов — живой мокап"
      }
    ]
  },
  {
    "id": "lera-streetwear-collage",
    "key": "lera-streetwear-collage",
    "title": "Коллаборация со streetwear-брендом",
    "tag": "Фотография и коллаж",
    "kind": "image",
    "src": "/portfolio/media/lera-nerybka/pdf-cases/streetwear-collage-main.webp",
    "poster": null,
    "link": null,
    "designerId": "lera-nerybka",
    "categories": [
      "campaigns",
      "social"
    ],
    "order": 810,
    "gallery": [
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/streetwear-collage-main.webp",
        "title": "Коллаж для бренда уличной одежды",
        "width": 1443,
        "height": 1800
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/streetwear-collage-portrait.webp",
        "title": "Коллажный портрет",
        "width": 831,
        "height": 1039
      },
      {
        "src": "/portfolio/media/lera-nerybka/pdf-cases/streetwear-collage-photo.webp",
        "title": "Коллажная фотография",
        "width": 707,
        "height": 786
      }
    ]
  },
  {
    "id": "ooo-zdorovye-deti",
    "key": "ooo-zdorovye-deti",
    "title": "Здоровые Дети",
    "tag": "Коммуникационный дизайн фонда",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-zdorovye-deti-hero-tg-109.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "branding",
      "print",
      "campaigns",
      "motion"
    ],
    "order": 820,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-zdorovye-deti-tg-109.webp",
        "kind": "image",
        "title": "Здоровые Дети"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-zdorovye-deti-tg-110.webp",
        "kind": "image",
        "title": "Здоровые Дети"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-zdorovye-deti-tg-111.webp",
        "kind": "image",
        "title": "Здоровые Дети"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-design-104.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-design-104.webp",
        "title": "Здоровые Дети — видеокейс"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-design-112.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-design-112.webp",
        "title": "Здоровые Дети — 27 лет"
      }
    ]
  },
  {
    "id": "ooo-vegan-bro",
    "key": "ooo-vegan-bro",
    "title": "Vegan Bro",
    "tag": "Визуалы рекламной кампании",
    "kind": "image",
    "src": "/portfolio/media/ooo-design/ooo-vegan-bro-tg-117.webp",
    "poster": null,
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "campaigns"
    ],
    "order": 830,
    "gallery": [
      {
        "src": "/portfolio/media/ooo-design/ooo-vegan-bro-tg-117.webp",
        "kind": "image",
        "title": "Vegan Bro"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vegan-bro-tg-118.webp",
        "kind": "image",
        "title": "Vegan Bro"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vegan-bro-tg-119.webp",
        "kind": "image",
        "title": "Vegan Bro"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vegan-bro-tg-120.webp",
        "kind": "image",
        "title": "Vegan Bro"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vegan-bro-tg-121.webp",
        "kind": "image",
        "title": "Vegan Bro"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vegan-bro-tg-122.webp",
        "kind": "image",
        "title": "Vegan Bro"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vegan-bro-tg-123.webp",
        "kind": "image",
        "title": "Vegan Bro"
      },
      {
        "src": "/portfolio/media/ooo-design/ooo-vegan-bro-tg-124.webp",
        "kind": "image",
        "title": "Vegan Bro"
      },
      {
        "src": "/video/media/ooo-design/web/ooo-vegan-bro-film.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-vegan-bro-film.webp",
        "title": "Vegan Bro — cinematic video"
      }
    ]
  },
  {
    "id": "ivar-rocket-ink",
    "key": "ivar-rocket-ink",
    "title": "Rocket Ink",
    "tag": "Логотип тату-студии",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-rocket-ink-tg-78.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "branding"
    ],
    "order": 840,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-rocket-ink-tg-78.webp",
        "kind": "image",
        "title": "Rocket Ink"
      },
      {
        "src": "/portfolio/media/ivar/ivar-rocket-ink-tg-79.webp",
        "kind": "image",
        "title": "Rocket Ink"
      },
      {
        "src": "/portfolio/media/ivar/ivar-rocket-ink-tg-80.webp",
        "kind": "image",
        "title": "Rocket Ink"
      },
      {
        "src": "/portfolio/media/ivar/ivar-rocket-ink-panel-0.webp",
        "kind": "image",
        "title": "ivar-rocket-ink"
      },
      {
        "src": "/portfolio/media/ivar/ivar-rocket-ink-panel-1.webp",
        "kind": "image",
        "title": "ivar-rocket-ink"
      },
      {
        "src": "/portfolio/media/ivar/ivar-rocket-ink-panel-2.webp",
        "kind": "image",
        "title": "ivar-rocket-ink"
      }
    ]
  },
  {
    "id": "ivar-bizon-snab",
    "key": "ivar-bizon-snab",
    "title": "Bizon Snab",
    "tag": "Логотип и фирменный стиль",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-bizon-snab-tg-43.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "branding"
    ],
    "order": 850,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-bizon-snab-tg-43.webp",
        "kind": "image",
        "title": "Bizon Snab"
      },
      {
        "src": "/portfolio/media/ivar/ivar-bizon-snab-tg-44.webp",
        "kind": "image",
        "title": "Bizon Snab"
      },
      {
        "src": "/portfolio/media/ivar/ivar-bizon-snab-tg-45.webp",
        "kind": "image",
        "title": "Bizon Snab"
      },
      {
        "src": "/portfolio/media/ivar/ivar-bizon-snab-panel-0.webp",
        "kind": "image",
        "title": "ivar-bizon-snab"
      },
      {
        "src": "/portfolio/media/ivar/ivar-bizon-snab-panel-1.webp",
        "kind": "image",
        "title": "ivar-bizon-snab"
      },
      {
        "src": "/portfolio/media/ivar/ivar-bizon-snab-panel-2.webp",
        "kind": "image",
        "title": "ivar-bizon-snab"
      },
      {
        "src": "/portfolio/media/ivar/ivar-bizon-snab-panel-3.webp",
        "kind": "image",
        "title": "ivar-bizon-snab"
      }
    ]
  },
  {
    "id": "ivar-ai-forest",
    "key": "ivar-ai-forest",
    "title": "AI Forest Academy",
    "tag": "Логотип академии ИИ",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-ai-forest-tg-72.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity"
    ],
    "order": 860,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-ai-forest-tg-72.webp",
        "kind": "image",
        "title": "AI Forest Academy"
      },
      {
        "src": "/portfolio/media/ivar/ivar-ai-forest-tg-73.webp",
        "kind": "image",
        "title": "AI Forest Academy"
      },
      {
        "src": "/portfolio/media/ivar/ivar-ai-forest-panel-0.webp",
        "kind": "image",
        "title": "ivar-ai-forest"
      },
      {
        "src": "/portfolio/media/ivar/ivar-ai-forest-panel-1.webp",
        "kind": "image",
        "title": "ivar-ai-forest"
      },
      {
        "src": "/portfolio/media/ivar/ivar-ai-forest-panel-2.webp",
        "kind": "image",
        "title": "ivar-ai-forest"
      }
    ]
  },
  {
    "id": "ivar-gorgona",
    "key": "ivar-gorgona",
    "title": "Gorgona",
    "tag": "Логотип ночного клуба",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-gorgona-tg-38.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "branding"
    ],
    "order": 870,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-gorgona-tg-38.webp",
        "kind": "image",
        "title": "Gorgona"
      },
      {
        "src": "/portfolio/media/ivar/ivar-gorgona-tg-39.webp",
        "kind": "image",
        "title": "Gorgona"
      },
      {
        "src": "/portfolio/media/ivar/ivar-gorgona-tg-40.webp",
        "kind": "image",
        "title": "Gorgona"
      },
      {
        "src": "/portfolio/media/ivar/ivar-gorgona-panel-0.webp",
        "kind": "image",
        "title": "ivar-gorgona"
      },
      {
        "src": "/portfolio/media/ivar/ivar-gorgona-panel-1.webp",
        "kind": "image",
        "title": "ivar-gorgona"
      },
      {
        "src": "/portfolio/media/ivar/ivar-gorgona-panel-2.webp",
        "kind": "image",
        "title": "ivar-gorgona"
      }
    ]
  },
  {
    "id": "ivar-sparkling-wine",
    "key": "ivar-sparkling-wine",
    "title": "Sparkling Wine",
    "tag": "Логотип винного магазина",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-sparkling-wine-tg-47.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "branding"
    ],
    "order": 880,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-sparkling-wine-tg-47.webp",
        "kind": "image",
        "title": "Sparkling Wine"
      },
      {
        "src": "/portfolio/media/ivar/ivar-sparkling-wine-tg-48.webp",
        "kind": "image",
        "title": "Sparkling Wine"
      },
      {
        "src": "/portfolio/media/ivar/ivar-sparkling-wine-tg-49.webp",
        "kind": "image",
        "title": "Sparkling Wine"
      },
      {
        "src": "/portfolio/media/ivar/ivar-sparkling-wine-panel-0.webp",
        "kind": "image",
        "title": "ivar-sparkling-wine"
      },
      {
        "src": "/portfolio/media/ivar/ivar-sparkling-wine-panel-1.webp",
        "kind": "image",
        "title": "ivar-sparkling-wine"
      },
      {
        "src": "/portfolio/media/ivar/ivar-sparkling-wine-panel-2.webp",
        "kind": "image",
        "title": "ivar-sparkling-wine"
      }
    ]
  },
  {
    "id": "ivar-atlas",
    "key": "ivar-atlas",
    "title": "Atlas Group",
    "tag": "Логотип компании доставки",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-atlas-hero-final.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "branding"
    ],
    "order": 890,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-atlas-panel-0.webp",
        "kind": "image",
        "title": "ivar-atlas"
      },
      {
        "src": "/portfolio/media/ivar/ivar-atlas-panel-1.webp",
        "kind": "image",
        "title": "ivar-atlas"
      },
      {
        "src": "/portfolio/media/ivar/ivar-atlas-panel-2.webp",
        "kind": "image",
        "title": "ivar-atlas"
      },
      {
        "src": "/portfolio/media/ivar/ivar-atlas-panel-3.webp",
        "kind": "image",
        "title": "ivar-atlas"
      }
    ]
  },
  {
    "id": "ivar-kk",
    "key": "ivar-kk",
    "title": "K&K",
    "tag": "Логотип и фирменный стиль",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-kk-tg-28.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "branding"
    ],
    "order": 900,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-kk-tg-28.webp",
        "kind": "image",
        "title": "K&K"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kk-tg-29.webp",
        "kind": "image",
        "title": "K&K"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kk-tg-30.webp",
        "kind": "image",
        "title": "K&K"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kk-panel-0.webp",
        "kind": "image",
        "title": "ivar-kk"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kk-panel-1.webp",
        "kind": "image",
        "title": "ivar-kk"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kk-panel-2.webp",
        "kind": "image",
        "title": "ivar-kk"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kk-panel-3.webp",
        "kind": "image",
        "title": "ivar-kk"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kk-panel-4.webp",
        "kind": "image",
        "title": "ivar-kk"
      }
    ]
  },
  {
    "id": "ivar-paragliding",
    "key": "ivar-paragliding",
    "title": "Школа парапланеризма",
    "tag": "Логотип и применение знака",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-paragliding-tg-52.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity"
    ],
    "order": 910,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-paragliding-tg-52.webp",
        "kind": "image",
        "title": "Школа парапланеризма"
      },
      {
        "src": "/portfolio/media/ivar/ivar-paragliding-tg-53.webp",
        "kind": "image",
        "title": "Школа парапланеризма"
      },
      {
        "src": "/portfolio/media/ivar/ivar-paragliding-tg-54.webp",
        "kind": "image",
        "title": "Школа парапланеризма"
      },
      {
        "src": "/portfolio/media/ivar/ivar-paragliding-panel-0.webp",
        "kind": "image",
        "title": "ivar-paragliding"
      },
      {
        "src": "/portfolio/media/ivar/ivar-paragliding-panel-1.webp",
        "kind": "image",
        "title": "ivar-paragliding"
      },
      {
        "src": "/portfolio/media/ivar/ivar-paragliding-panel-2.webp",
        "kind": "image",
        "title": "ivar-paragliding"
      }
    ]
  },
  {
    "id": "ivar-black-beard",
    "key": "ivar-black-beard",
    "title": "Black Beard",
    "tag": "Логотип барбершопа",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-black-beard-tg-31.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "branding"
    ],
    "order": 920,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-black-beard-tg-31.webp",
        "kind": "image",
        "title": "Black Beard"
      },
      {
        "src": "/portfolio/media/ivar/ivar-black-beard-tg-32.webp",
        "kind": "image",
        "title": "Black Beard"
      },
      {
        "src": "/portfolio/media/ivar/ivar-black-beard-tg-33.webp",
        "kind": "image",
        "title": "Black Beard"
      },
      {
        "src": "/portfolio/media/ivar/ivar-black-beard-panel-0.webp",
        "kind": "image",
        "title": "ivar-black-beard"
      },
      {
        "src": "/portfolio/media/ivar/ivar-black-beard-panel-1.webp",
        "kind": "image",
        "title": "ivar-black-beard"
      }
    ]
  },
  {
    "id": "ivar-inoxtechno",
    "key": "ivar-inoxtechno",
    "title": "Inoxtechno",
    "tag": "Редизайн логотипа",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-inoxtechno-hero-final.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity"
    ],
    "order": 930,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-inoxtechno-tg-157.webp",
        "kind": "image",
        "title": "Inoxtechno"
      }
    ]
  },
  {
    "id": "ivar-horse-patch",
    "key": "ivar-horse-patch",
    "title": "Хара Морин — шевроны",
    "tag": "Варианты шеврона с лошадью",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-horse-patch-tg-159.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "print"
    ],
    "order": 940,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-horse-patch-tg-159.webp",
        "kind": "image",
        "title": "Морин — шевроны"
      },
      {
        "src": "/portfolio/media/ivar/ivar-horse-patch-tg-160.webp",
        "kind": "image",
        "title": "Морин — шевроны"
      },
      {
        "src": "/portfolio/media/ivar/ivar-horse-patch-tg-161.webp",
        "kind": "image",
        "title": "Морин — шевроны"
      }
    ]
  },
  {
    "id": "ivar-aura",
    "key": "ivar-aura",
    "title": "Aura Spa Salon",
    "tag": "Логотип и фирменный стиль",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-aura-tg-167.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "branding",
      "motion"
    ],
    "order": 950,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-aura-tg-167.webp",
        "kind": "image",
        "title": "Aura Spa Salon"
      },
      {
        "src": "/portfolio/media/ivar/ivar-aura-tg-168.webp",
        "kind": "image",
        "title": "Aura Spa Salon"
      },
      {
        "src": "/portfolio/media/ivar/ivar-aura-tg-169.webp",
        "kind": "image",
        "title": "Aura Spa Salon"
      },
      {
        "src": "/video/media/ivar/web/ivar-166.mp4",
        "kind": "video",
        "poster": "/video/media/ivar/posters/ivar-166.webp",
        "title": "Aura Spa Salon — видео"
      }
    ]
  },
  {
    "id": "ivar-legion",
    "key": "ivar-legion",
    "title": "Legion",
    "tag": "Концепт логотипа и видео для игры",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-legion-tg-174.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "motion"
    ],
    "order": 960,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-legion-tg-174.webp",
        "kind": "image",
        "title": "Legion"
      },
      {
        "src": "/video/media/ivar/web/ivar-241.mp4",
        "kind": "video",
        "poster": "/video/media/ivar/posters/ivar-241.webp",
        "title": "Legion — концепт для игры"
      }
    ],
    "concept": true
  },
  {
    "id": "ivar-economy",
    "key": "ivar-economy",
    "title": "Внеплановая экономика",
    "tag": "Логотип Telegram-канала",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-economy-tg-180.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity"
    ],
    "order": 970,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-economy-tg-178.webp",
        "kind": "image",
        "title": "Внеплановая экономика"
      },
      {
        "src": "/portfolio/media/ivar/ivar-economy-tg-179.webp",
        "kind": "image",
        "title": "Внеплановая экономика"
      },
      {
        "src": "/portfolio/media/ivar/ivar-economy-tg-180.webp",
        "kind": "image",
        "title": "Внеплановая экономика"
      }
    ]
  },
  {
    "id": "ivar-uhlala",
    "key": "ivar-uhlala",
    "title": "Uhlala",
    "tag": "Логотип и вывеска",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-uhlala-tg-184.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity"
    ],
    "order": 980,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-uhlala-tg-184.webp",
        "kind": "image",
        "title": "Uhlala"
      }
    ]
  },
  {
    "id": "ivar-arche",
    "key": "ivar-arche",
    "title": "ARCHE",
    "tag": "Айдентика бренда одежды",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-arche-tg-196.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "branding",
      "campaigns",
      "motion"
    ],
    "order": 990,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-arche-tg-189.webp",
        "kind": "image",
        "title": "ARCHE"
      },
      {
        "src": "/portfolio/media/ivar/ivar-arche-tg-196.webp",
        "kind": "image",
        "title": "ARCHE"
      },
      {
        "src": "/portfolio/media/ivar/ivar-arche-tg-197.webp",
        "kind": "image",
        "title": "ARCHE"
      },
      {
        "src": "/portfolio/media/ivar/ivar-arche-tg-198.webp",
        "kind": "image",
        "title": "ARCHE"
      },
      {
        "src": "/portfolio/media/ivar/ivar-arche-tg-199.webp",
        "kind": "image",
        "title": "ARCHE"
      },
      {
        "src": "/portfolio/media/ivar/ivar-arche-tg-200.webp",
        "kind": "image",
        "title": "ARCHE"
      },
      {
        "src": "/portfolio/media/ivar/ivar-arche-tg-201.webp",
        "kind": "image",
        "title": "ARCHE"
      },
      {
        "src": "/video/media/ivar/web/ivar-191.mp4",
        "kind": "video",
        "poster": "/video/media/ivar/posters/ivar-191.webp",
        "title": "ARCHE — анимация логотипа"
      },
      {
        "src": "/video/media/ivar/web/ivar-195.mp4",
        "kind": "video",
        "poster": "/video/media/ivar/posters/ivar-195.webp",
        "title": "ARCHE — рекламный концепт"
      }
    ]
  },
  {
    "id": "ivar-new-year",
    "key": "ivar-new-year",
    "title": "Новогодние открытки",
    "tag": "Серия иллюстраций с лошадью",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-new-year-tg-192.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "campaigns",
      "posters"
    ],
    "order": 1000,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-new-year-tg-192.webp",
        "kind": "image",
        "title": "Новогодние открытки"
      },
      {
        "src": "/portfolio/media/ivar/ivar-new-year-tg-193.webp",
        "kind": "image",
        "title": "Новогодние открытки"
      },
      {
        "src": "/portfolio/media/ivar/ivar-new-year-tg-194.webp",
        "kind": "image",
        "title": "Новогодние открытки"
      }
    ]
  },
  {
    "id": "ivar-book-illustration",
    "key": "ivar-book-illustration",
    "title": "От чистого истока",
    "tag": "Карандашная иллюстрация для книги",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-book-illustration-tg-210.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "campaigns",
      "print"
    ],
    "order": 1010,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-book-illustration-tg-210.webp",
        "kind": "image",
        "title": "От чистого истока"
      },
      {
        "src": "/portfolio/media/ivar/ivar-book-illustration-tg-216.webp",
        "kind": "image",
        "title": "От чистого истока"
      }
    ]
  },
  {
    "id": "ivar-kazachya-usadba",
    "key": "ivar-kazachya-usadba",
    "title": "Казачья усадьба",
    "tag": "Брендбук базы отдыха",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-225.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "identity",
      "branding",
      "print"
    ],
    "order": 1020,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-219.webp",
        "kind": "image",
        "title": "Казачья усадьба"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-220.webp",
        "kind": "image",
        "title": "Казачья усадьба"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-221.webp",
        "kind": "image",
        "title": "Казачья усадьба"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-222.webp",
        "kind": "image",
        "title": "Казачья усадьба"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-224.webp",
        "kind": "image",
        "title": "Казачья усадьба"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-225.webp",
        "kind": "image",
        "title": "Казачья усадьба"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-226.webp",
        "kind": "image",
        "title": "Казачья усадьба"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-227.webp",
        "kind": "image",
        "title": "Казачья усадьба"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-228.webp",
        "kind": "image",
        "title": "Казачья усадьба"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-229.webp",
        "kind": "image",
        "title": "Казачья усадьба"
      },
      {
        "src": "/portfolio/media/ivar/ivar-kazachya-usadba-tg-230.webp",
        "kind": "image",
        "title": "Казачья усадьба"
      }
    ]
  },
  {
    "id": "ivar-minchenko",
    "key": "ivar-minchenko",
    "title": "Минченко Консалтинг",
    "tag": "Дизайн презентаций",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-minchenko-slide-0-0.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "presentations",
      "infographics"
    ],
    "order": 1030,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-0-0.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-0-1.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-0-2.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-0-3.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-0-4.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-1-0.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-1-1.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-1-2.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-1-3.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-1-4.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-2-0.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-2-1.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-2-2.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-2-3.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-2-4.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-3-0.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-3-1.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-3-2.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-3-3.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-3-4.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-4-0.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-4-1.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-4-2.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-4-3.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      },
      {
        "src": "/portfolio/media/ivar/ivar-minchenko-slide-4-4.webp",
        "kind": "image",
        "title": "ivar-minchenko"
      }
    ]
  },
  {
    "id": "ivar-product-cards",
    "key": "ivar-product-cards",
    "title": "Карточки товаров",
    "tag": "Концепты карточек для маркетплейсов",
    "kind": "image",
    "src": "/portfolio/media/ivar/ivar-product-cards-image-024-161.webp",
    "poster": null,
    "link": null,
    "designerId": "ivar",
    "categories": [
      "campaigns",
      "infographics"
    ],
    "order": 1040,
    "gallery": [
      {
        "src": "/portfolio/media/ivar/ivar-product-cards-image-024-161.webp",
        "kind": "image",
        "title": "Карточка товара"
      },
      {
        "src": "/portfolio/media/ivar/ivar-product-cards-image-024-162.webp",
        "kind": "image",
        "title": "Карточка товара"
      },
      {
        "src": "/portfolio/media/ivar/ivar-product-cards-image-024-163.webp",
        "kind": "image",
        "title": "Карточка товара"
      },
      {
        "src": "/portfolio/media/ivar/ivar-product-cards-image-024-164.webp",
        "kind": "image",
        "title": "Карточка товара"
      },
      {
        "src": "/portfolio/media/ivar/ivar-product-cards-image-024-165.webp",
        "kind": "image",
        "title": "Карточка товара"
      },
      {
        "src": "/portfolio/media/ivar/ivar-product-cards-image-024-166.webp",
        "kind": "image",
        "title": "Карточка товара"
      },
      {
        "src": "/portfolio/media/ivar/ivar-product-cards-image-024-167.webp",
        "kind": "image",
        "title": "Карточка товара"
      },
      {
        "src": "/portfolio/media/ivar/ivar-product-cards-image-024-168.webp",
        "kind": "image",
        "title": "Карточка товара"
      },
      {
        "src": "/portfolio/media/ivar/ivar-product-cards-image-024-169.webp",
        "kind": "image",
        "title": "Карточка товара"
      },
      {
        "src": "/portfolio/media/ivar/ivar-product-cards-image-024-170.webp",
        "kind": "image",
        "title": "Карточка товара"
      }
    ],
    "concept": true
  },
  {
    "id": "ooo-reflective-clothing",
    "key": "ooo-reflective-clothing",
    "title": "Рефлективная одежда",
    "tag": "Рекламный ролик для одежды",
    "kind": "video",
    "src": "/video/media/ooo-design/web/ooo-design-107.mp4",
    "poster": "/video/media/ooo-design/posters/ooo-design-107.webp",
    "link": null,
    "designerId": "ooo-design",
    "categories": [
      "motion"
    ],
    "order": 1050,
    "gallery": [
      {
        "src": "/video/media/ooo-design/web/ooo-design-107.mp4",
        "kind": "video",
        "poster": "/video/media/ooo-design/posters/ooo-design-107.webp",
        "title": "Рефлективная одежда — fashion video"
      }
    ],
    "concept": false
  },
  {
    "id": "ivar-sky-motion",
    "key": "ivar-sky-motion",
    "title": "Небо",
    "tag": "Моушн-концепт",
    "kind": "video",
    "src": "/video/media/ivar/web/ivar-209.mp4",
    "poster": "/video/media/ivar/posters/ivar-209.webp",
    "link": null,
    "designerId": "ivar",
    "categories": [
      "motion"
    ],
    "order": 1060,
    "gallery": [
      {
        "src": "/video/media/ivar/web/ivar-209.mp4",
        "kind": "video",
        "poster": "/video/media/ivar/posters/ivar-209.webp",
        "title": "Небо — моушн-концепт"
      }
    ],
    "concept": true
  }
];
