import { Product, CartItem, Order, ChatMessage } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ1xJpVSb0dlTS4e2WEL7FS9EfBgoWvtGPs9TiLxTErd81wwZylFr9w1SafjeBXOPaRylmzcOwg2ETymJWNTILqFrZM4JerZ2heRArMMP9CSiCPSVPBVYJ12aFUr_TD64sfTu34Yu25sBHxiaV4Bsxtule48jSn04H91Bd7lE_wtCRTwdkcjrVYriww9me4fbl0RxJ4JoLvKhJPqZOq-pVKsePmEmn2TZOerkBriF92NSzk0k4hh80";

export const USER_AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuAD_ij269_6z7djK3pNWnukPb6p88PRvBy2FvBsIg15bPXI1szF-4_JrVVyGFfJwI_nK8xZyG3ZGrKywneTlJprNWzPjEPqGysTDJ7koREBa-RPPO9ZWLGbgP-wr3cIzxMebyHPTdEfWoQeIdAEN6lqe9Hj-ae5KA-SU-Hq5WNH4EbTud1ajdh13xx-0yQsZb2bwgUF7wklyXrISTXzaMqquH4fyh_BA3R1G2ihQ7Irgtaa0dSTVGKr";

export const RIDER_AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBFSjTebUGz8CSSbNgvrmC3EyClqT-x_9rb7ed2kns83R3FXS7LgGasqiMv8nmBr-oOlddzrL3UxvOB28VoG8aOPIRHVsXQEHIW3gineakt-BP1hJT6NfkWSoJncuDkuUN35kEupUm1pnmK5xAiSTpjZxBLW6l9jrB6MPaMTUnX_KHUGdp6Kwo6Ez3928a5uYPgErPR9P939g6RP3_wMxgC4xbyQmrHpDmD7TLrU-DLuWBrpfKCJdU0";

export const PROFILE_HERO_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuAOsvlZUsvOizU-vuVV19BYf3d8XeWmtIBzJ8DcVb52EuFClFG2FoBNpfN1VaRT6VRgxEbEF3ngZt8eNm11-NJPBs_7cLxDK2vtX2D5NhGcr-ldt09xcDW_qO-If63lXxQ9CKkrjqxO12sKfT8oMJdVV1rL6vpNJ8Akq0J7mVUaLTS59JQHVhPYjPsQ4yTpYlUhtSR_cODzT8VtySFcmBo785jXoGkEFuQ_YpCnuCJtXDyATsUF-WG_";

export const CATEGORIES = [
  { id: 'cakes', name: 'Birthday Cakes', count: 8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGFOuTL0ZeDoVjHqRXAPEmT_hUHOEKEWjdGSH1-iK5viuUOebc-1x6_PFEifllnVzZzFXmDPQ_g-kZ8jq5N0Aa0zPbj_itvRnJEb-H_yYn9d_nsZm0HH0OsH4uJ3Bm3F7QHXOZh8UPuH2MJvvNMCppDL207FeYTZzpj0NidMy6d9RVy5da7LZcJ9B_CZaHcWXbK-bR9XHTtsn_f_yU7wtHWuRaW2a_sjIGqPuOzCtPkZkrbDFepUb0" },
  { id: 'fresh_cream', name: 'Fresh Cream', count: 6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDx4YQGz9iPsfYlXxLdMCYvfPjeLnQW_OT9ReTyjDvKKv27wCqTTpBINo-uv0j-g9x64qGLom_M9yWu752nuRTRH1gqZdrsZK5xxUesi7Wf3Az3NwXtC-kTBugW4iIbLCo73dkdCBOzhqe_4_Dgu8ur7h3u-dq-Ev6XXHpcchL_t6pW6LNJ5RYWkIdKgRJ_BLjp3hJFBUbB8AgG6EJdnd-mPkit9kfiGV-JB7tnfgL5XeT_L_3hUXYh" },
  { id: 'pastries', name: 'Pastries', count: 6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApzaTbJMYnKVmgajg-lB2B4xllj6rXL5Os_xC-rm2v-3mXibe0iA74qWZ1DZOTpYw6F8a88eDtaWVL4PE--mkyrCUDgS_HNqJjgj9D1F3hK02DbeUMZJFdr5WqCcshYGvUVJBxLO7VQQ1JJe0mcfKvYnOpdiQTqUeauc2rYTeQMkemrjb5PsAw8krMMRwMW5yh2QZC6SRsuwQm0VSwfX_d36d8jl8tz02CFZ2W_d0mzsbzJYE4jEAW" },
  { id: 'chocolates', name: 'Chocolates', count: 6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3vO3KlWdTGODCi66OXwfNrM31Pcduo7qJSVzZyQDjn5Q3YnNGGA-BExrnlvTOXC3sQ0sVBbVlbdCYJDyhzi9vKSHb1szGlJTEPAHBon5a4wcMx3G31peV_zhCdCyinQLhpeXpgN3qjY_bPJrLPjgFj_xKaK7Qrsu9J7u8lZzzZ6MQPlFucKlsjBLLJ01_QL5z5d71u-_n64HsZY-wKTO0U2guhDs_TwGjM4Gkf0VMXNPYsWFMw-pL" },
  { id: 'burgers', name: 'Burgers', count: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuD6hs8STRdHXmyQmVmLOUoxBVhKf42gx08_C8MeDClblYSxR3cf3PRewEM_AF9xzc0cRMZwTm4qAPPjcB1VVq9eERWbyFeIAWxIq7qz6KI6FZyKnrMTXFXT3QTk5OxwU3EHq_2WwACO9ylM_7tndwJTNMlFOmDX01ThzAaj0SEv2HwSTmOySEMYBBnBhBfRZL06sZuaD59sRR8HU5MUEICf5GoYTGJ1dZJdPml6r-x2RVascSn-L6" },
  { id: 'pizza', name: 'Pizza', count: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoOe7q-DuQwKVe5sOEsdqjDveBznKE9_1mN6A_-IOjRXR3N-xhG2ekFojH8Z5Qi8yNN-EJnXU8QwOOp4_U_XKS0Xyd33NU-zp7rtsh5Dkwsz636pfNexBqBX2nq4pNw2uXpXwxCogYhaLtZxbIFC1Ap4QFpxbN_pysj_qU2JD7cQbSneSac6ScABS6VeSGgQItQMJhNMRbqhApIti8mh1rB9SAL1ej2VK7vciWJUG98ww_d_h7Lxza" },
  { id: 'sandwiches', name: 'Sandwiches', count: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNX1IXi6uoWc_kkXPc8lsz5P7r6qQ30DsTh9wMOHFJE0pBlaTux81jLn8wpeUROo_7sE0mLby3C8RUDdM0amfLIgGzurZEh2LJ2B6e4SeIPDMKZG5Xid481nvuxykgCzm4cM6dPTDr9qBQSKn2D5xJZ3whC1iqqPmJQi_dJuHboqrJiTcB_sdV9ANDfTrBCqe0Ky__KHqDdF7AXwgdbEuM3Q8KKLpyqigp1tEHbEHZNxyVUvUMZmvN" },
  { id: 'puffs', name: 'Puffs', count: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTpNzFo4YbgUXiMLeYne1FnynJUWNWenYZnt8s6LDc3ZgSdTLl0FsFlEHRgcLRFYH8gs9M9J1Ae96QUn_Y60QE3_F_dW7TchfYIWRvAjZwqOmDcoOZ1Vql3jmYqMmKMCK50NWL1xEoaGRwg7WWRFRmoQh__MYz0tBzrACiOYpcq3uvnYG4RqG0YaHFSie7UVSN1ED1nuxqNOocnsjfRt3Fi5ClWH8-0yO7F4zb4XUkkCPtcjvfBAQ9" },
  { id: 'fries', name: 'Fries', count: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFt64iqw98QLyWq-YRquUZ4xXLgMCYwaArwt-OsxFm2YXdJsJs3AYqm8YgfpfnMko4G6BkdjgHuCdUB9ZqtURdrQRhaVw8V7UwuuOzLEmvwYWK7U4bEXEhY9Yn6Crw24ZNmPf8Q1n2UXFzd-uDDRTxT5n40AlP92_KZlDz8Qb7-1OFFY597zWzzUClkwbG6se2JohHMF4f0MurYv-guX9TDPJ2pcYlqVr07e9pr-wow9nbnzMoYSJS" },
  { id: 'desserts', name: 'Desserts', count: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkhr_hGCUItfXzLH2skdi-FLwFs8ouDtP2gcRcH52fl-chOEEXv_4gQGzTyv3Otmv_5q7oLq8D-X9AKCRarfeAtK3NJhTAHDj0VgYfDFn6GIyQtFYgZlRGEt59-YgYwCoTksk_j5VE_Dk6h9msgF0TyqfQZzxBm4LI1e0VRDdmbSlj775uKe8rhOtFhJnJE2y3PBzTQxuVgaBO7sc-Zk3L3wKWAb0CpEbH4xrq-BpWoGWp3Ekx4bcw" },
  { id: 'icecream', name: 'Ice Cream', count: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9ugfOn0BLrSnQUw5fCxZJY43TZptImxkzQJzPgB4Q_BjP5kIr6WPQwWmjT8nKV72Iro0XZrZy7qbDmw3jJxGZgYQ-a5DAS8WPWGep-4Cw45iXEnBXqAgDpPkaPpOdfFpLYMBbD8WmiVuvVJ0XrMjCmrHCtDNphdKX0i08pxazDGjJRiV3O5oHHTgzelR1k5pC24gY0tDEFEK-XycxarfzN-Cf4vwZapn9ImS003ULPRKgLEronpKb" },
  { id: 'beverages', name: 'Beverages', count: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsBjdGVrjJaHWqOgWZukpBh0KaWCvGJWawe3LQwnK6d4n6YY9h-9jBDYElIGhCrjmJloBl-sWnKwpoehrAIxdghYmKxY8vSiIOfM7c9mj2XVldTvfM6y1aQF6boC2sBIUmeRXhO3jq1tgWLy3CIxinIaP4nAXluaaLgwd4Wqha0FjejdcHhZ_RU4usHzJfRlj81o9WscXl-NWeQkChS3SRlaFUzflQLSpP5jzdC2_1HB77T6DIhbKq" }
];

export const PRODUCTS: Product[] = [
  // Signature Cakes
  {
    id: 'prod-truffle',
    name: 'Chocolate Truffle Cake',
    category: 'cakes',
    price: 499,
    originalPrice: 599,
    rating: 4.9,
    reviewsCount: 340,
    description: 'Pure Belgian dark chocolate ganache draped over ultra-soft chocolate chiffon sponge.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaBu-RicFSHxWKrJkbfq8hRhq0-kWlVuoBuPozlqm1lRp2GUWCwjSq9OQ7l-1lguIbjgI32_BULw6RfGSr_b7jHqZRYDeSRMjOpR-gv_Yvv_6-A3g_Ebis8ctjThpYaM1-1WJ4g_3hRPr_9CC2jK06Fngy5C-wrXpVozG7NBNL5UldAe_EvYQv_HoqvW35wkXC7-ILYHuWn9o-btw9DgJCEtbs5W15f8vMIuS6oGOjYwfRissOk_Ft",
    diet: 'eggless',
    badge: 'Bestseller',
    isCustomizable: true,
    weightOptions: ['500g', '1kg', '2kg']
  },
  {
    id: 'prod-black-forest',
    name: 'Black Forest Delight',
    category: 'cakes',
    price: 449,
    originalPrice: 549,
    rating: 4.8,
    reviewsCount: 210,
    description: 'Maraschino cherry compote layered between cocoa sponge & vanilla Chantilly cream.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbbnuKKSYKgpGx1FE-m07naXCo_d80s_7UYsenpSX5FWdzpNxnbpUsqCf6H4AYpz7AcnP6zUrR4xLg2MJ2uNYmF3moE7zVk3XpPbxlxpF7tbYQAW28yn-CzVZlgtu_wB_wTzF0zedkima9vjxBQSeenGYAHYJ73gUqh02DvVj9th8yTeG6RM9isBtjHtuIydXQfoW737U6GJY1jpPa3eYlkpcZ4yAt57vYwXvHEWFgBzPq1x1dAGZ0",
    diet: 'veg',
    badge: 'Classic',
    isCustomizable: true,
    weightOptions: ['500g', '1kg', '2kg']
  },
  {
    id: 'prod-red-velvet',
    name: 'Red Velvet Cream Cheese',
    category: 'cakes',
    price: 599,
    originalPrice: 699,
    rating: 4.9,
    reviewsCount: 185,
    description: 'Crimson buttermilk sponge crumb with tangy Madagascar vanilla cream cheese frosting.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkCLcfutYQyOE6YVEXJEV-HIzwrub32auIFJtdMggDcyHQ4aGhnD_7M1dlL4ZMOBW_l_NWU7c8mFM6ukvZ5iwCt1zdIYA6bUIo2o7uYqeNghWcvVYK2YeFtqqfQv1eDQK_rHRyfLD827P9dQ0XToQZEt1EU_uY4Sr5IQeRDtfEX_Yg6FIcckS_0_RtMp_LtO_ZW7UNoy7CFxs9YVHkxNT2DDUPGCNBTjMySjUvxlvyxFHDgiNJjUCE",
    diet: 'veg',
    badge: 'Gourmet',
    isCustomizable: true,
    weightOptions: ['500g', '1kg', '2kg']
  },
  {
    id: 'prod-white-forest',
    name: 'White Forest Snowy Cake',
    category: 'cakes',
    price: 449,
    rating: 4.7,
    reviewsCount: 112,
    description: 'Milky Swiss white chocolate shavings, cocktail cherries, and soft vanilla sponge.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQCvwEnsaxgkw7o0K62fqrCcHAc4fhxQTjAp4GmKVTGbJc8_UkOogdhfH0WfB2oe6cukjP5jju2b1wsmTQRcfo-EtkCg20Ra4psnt16pEZXe6Dhrv-2jN7IcIXq3gZNrXEhEfzJtqARqX4t5Le8x_TqIs9pqHNQxpeNIpBbzl7y2-fRsiNZs6gHesDBE8Y3BjefujTv0hf-DhdypaLUGVgq3bkhZIZwCgus6lEdK7npyL7F6ppr-j_",
    diet: 'veg',
    isCustomizable: true
  },
  {
    id: 'prod-butterscotch',
    name: 'Crunchy Butterscotch',
    category: 'cakes',
    price: 449,
    rating: 4.8,
    reviewsCount: 260,
    description: 'Golden praline caramel crunches folded inside salted caramel cream layers.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAW0AxKEngpKVoVq7uG6AZCtM59dxmP32bgBSkzCVn-ml-pwhUO2JozbLQQyrvGGFflyZUJML551xRAu6R3981cHUI9-FUAB1Ay7H4cfaYnFKC2PazgiagQgIUAcMsKUQ2rNmLCHkmsYr3Owopvc3TmfTegxn-mYPh2C_WQHAAsc_2-q8oTNhZvuZrVKUb0E3LqDU7yAr9GIIFW7A2EC7KP1OJ61UD5REpwPfysqth1qsXtr8WPBbM",
    diet: 'eggless',
    isCustomizable: true
  },
  {
    id: 'prod-pineapple',
    name: 'Pineapple Fresh Cream',
    category: 'cakes',
    price: 399,
    rating: 4.6,
    reviewsCount: 140,
    description: 'Juicy caramelized tropical pineapple tidbits with featherlight vanilla whip.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWdTVBS9IljCHl9o4kvrT_oUS5SsZv-BlpefDbOK2Sf-zl-sUyX1On0FOlAfRyOoY4SKNk7_cUrgW-W43Ti6PQvCmkPEEp9AgDX0yt_mGx0XpF0ASCTT9n9lcVSCH4j5aKpGiPEPES09FNnVHPVJG2wj_RReP8gK3VoHJP-6Cirxqw2KCmoM0lOu7F6n_AeMCEIC354otog1BnkB2qmgJSCvAryMTfrQhe41-lilzaOSv9yvoggOT6",
    diet: 'veg',
    isCustomizable: true
  },
  {
    id: 'prod-vanilla',
    name: 'Vanilla Fresh Cream',
    category: 'cakes',
    price: 399,
    rating: 4.5,
    reviewsCount: 88,
    description: 'Authentic Madagascar vanilla bean infused airy sponge with pure dairy cream.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjIa2RPuX-B--Yqe0knDrICE7H6WyZQ8ySnA2zQ1s3bSQ4WwBMWuixIAKIpNEHEHEE2mY8RRGNGB-cKKuK7HPTzwtpt58uiAspkyBmkQD0fu2adm-fitCQmm51vcvtHCJvqhXrFObLp3XM6U0hwMDVge-JIql8gatpKXe7Gt2HZubUeAPbKC9yzFgBPPvS9lpr9G7kWITL6ZYLdHVvOYEUOVVPxoYPYyaKQeOMq9nDdh4CpMW66MVU",
    diet: 'veg',
    isCustomizable: true
  },
  {
    id: 'prod-fudge',
    name: 'Dense Chocolate Fudge',
    category: 'cakes',
    price: 549,
    rating: 4.9,
    reviewsCount: 190,
    description: 'Dense, decadent warm-melt chocolate fudge cake loaded with molten cocoa cream.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFZJOOqaX_6ZbYdhKJh85qEarE-5gCUZP_FZMsy36MHF1IIxAb4L7cP23R5dUC2AOTlNL7v9Mxbfumsp5OgMCycnJuWoDLFx4lHGbU0HcsAxC2Jdy15kxOasnUlyL3xJdIhbMJO3jWXEZYUi2Y_YOlxvYz4vvs2ybfQBeyxpENJu-fOJ0hpLZJkaIClrCrP5Ywisb8nXGoPDF_Q6nCWWk-W8Wi0XblwKelQ9Xo6e6VidXM2I3w-L12",
    diet: 'eggless',
    isCustomizable: true
  },

  // Pastries
  {
    id: 'prod-dutch-pastry',
    name: 'Dutch Chocolate Pastry',
    category: 'pastries',
    price: 80,
    rating: 4.7,
    reviewsCount: 520,
    description: 'Three layers of dark chocolate mousse and soft sponge slice.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEQoLxDa2tSg9r494B9YEShZPdhu4SJMnkyCy8CprLwYQ1Ks5CntXJSY4mNp8vUhs6fHAJpd-5gUXfS-F_RGJb8rY6MjD5VXrqAU5KHnz-7eHfV8uw0iNfUQ81GcFDwXEEq9GCjahS7jKvL3idRT2xpUfEuNFcEkbEA1jUlpylRZegDrmjSihQvv77XhP3EqKMbV86G4KzTGL_xjglp46tSbD12CcHdF4EOw1utnElD81S2nBEgLoG",
    diet: 'veg'
  },
  {
    id: 'prod-red-pastry',
    name: 'Red Velvet Slice',
    category: 'pastries',
    price: 100,
    rating: 4.8,
    reviewsCount: 310,
    description: 'Rich cream cheese frosted red velvet slice with fine red velvet crumb.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY5ob64kQ5Kzq06qebuCuUoQMJPmvQFnwHT_wouZmTUKkp_RXYsOuDJHAVQUJM382DrQisO6Vbc-FhWrsLDnnX6SHYrrad2VQh-S1MvOUigwLnFTbfN6GrFoGetDhwk1oR06YU6tp4qpy1i0pxm5stGSYXmzGG1K4UGtTBsPdHZ5eIM7yfD90D-pQRWrP6gM1eVB1UtItIv4hL29fr0NRGoJrN8zxvlPfl5hdFhMn2vGfqOpofbyn8",
    diet: 'veg'
  },
  {
    id: 'prod-lava-cup',
    name: 'Choco Molten Lava',
    category: 'pastries',
    price: 120,
    rating: 4.9,
    reviewsCount: 640,
    description: 'Served hot with a burst of molten Belgian dark chocolate core.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC6wO6aBxRIW8JrPNvFjulo_FRR4uZoz4lQhmAYTx5i7aCefYILpav7H0kqFziFb3g4Exuqiige0jUtZyn4l3hs11dA_LUaCcM3VfQstfFRPg7nLkuiJBtINc7ESqrUQYVX8o-dE_QxHI4UO52bpDbcOPPNqVd9P0HeZaS9_Sxe6VTWB6sL-cFe1jZTvHyl1YEaBKCNQjjHca1B-mEzlWRrJzq7vknMx9ScIjcHLr-ceZsidBhtn1v",
    diet: 'eggless'
  },
  {
    id: 'prod-walnut-brownie',
    name: 'Walnut Fudge Brownie',
    category: 'pastries',
    price: 100,
    rating: 4.8,
    reviewsCount: 410,
    description: 'Chewy baked chocolate square embedded with toasted Kashmiri walnuts.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVWPGvTjOhTiq_UHszAD_2PdRcJ7TVEoJmmJ0U3u5aPgRh5l0NUVLQFRj2hoBdWpxFr1q-gC66qA1bTmMs55-VB6oExH6ZuSbvIeRK3APhMrbUC-30nDmAZqGAlXeXDLlDOceEJykrOH5wCfsfDf324_ASK3QtDpaXCjCoCzGrAgMcMP1PjVzqTMrebUJRDnO9AnVEspFIskOAb8hndhNAharXe6ag2q6mug8Bj15Pm27EFTKXr9vE",
    diet: 'veg'
  },

  // Fast Food & Pizza
  {
    id: 'prod-farmhouse-pizza',
    name: 'Farmhouse Supreme Pizza',
    category: 'pizza',
    price: 229,
    rating: 4.8,
    reviewsCount: 340,
    description: 'Crisp capsicum, sweet corn, mushrooms, black olives, and 100% mozzarella.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwH87ImcQ8DAqaAnki8m4hIAz-VggPD9QVF08SSTGtY4FDYgP5GPe4Ta9pHX_bYx71fFfwqGgkhdMrVJ2lkWgXnfTz1BWRHTme-m0BPYQ2Y7Ql78RzrKGGCE4EEeOAYG9xyj9z-JimqeXIaRtlowTfmBvkyr7B0AEZhl1UFIKPCGd3Oge1o9iKgY_e0XJ6wpLpUycr_fua-hzOU4OGI1_8Zlywt_Xn7-2rcf7X9KdMKxnEdoj3oMXH",
    diet: 'veg',
    isCustomizable: true
  },
  {
    id: 'prod-paneer-pizza',
    name: 'Paneer Tikka Pizza (8")',
    category: 'pizza',
    price: 249,
    rating: 4.9,
    reviewsCount: 410,
    description: 'Clay-oven marinated spiced paneer cubes, red paprika, and double mozzarella.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd856xcDDY46LZYeVYQiqDHOqnP7Q2An-OgYUwBBHkIiLcT1F6Et3c-tz12BZH1Q-Uqq0FnjXGUz6-Y9aE1Hhdwwus6vQP888Mxfqedlxrg9egq0fenKGtBS91bKdK3OYR8517THl3K9Ss5995sYUR0YcnHhhw3wIqF8Hn38K_JJoiiIPmNXRk5GaGWsZAS6S96UlO-GRjpbgSpf66g6CevbdqCTrfMooEkeLNn1cNQR_AM-JQh9v6",
    diet: 'veg',
    badge: 'Bestseller',
    isCustomizable: true
  },
  {
    id: 'prod-veg-burger',
    name: 'Crispy Veg Supreme Burger',
    category: 'burgers',
    price: 99,
    rating: 4.7,
    reviewsCount: 580,
    description: 'Golden crunchy vegetable patty, iceberg lettuce, and zesty secret sauce in toasted bun.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA_wgFiKTbT9DYE1kdYKpcZKYgBCKLY_QayfmDgbjO07aa9GIkfesO3s2Iqp_9w_aolguSe4Xmn_1_1MxcU-_pJw8AEwp9q_O5lNqfxKA2VJ0Nb6bPrb5lJ85mQIq5T4fFV4NhAKAiLrC40Af-yv_xGQR9CpoB9vyP6vYTZc2h-_iPfCKlMJKcavmHLdAlPrYcA0yCX4Kw1tiV5RJ4wHnfLjKsG7etnQaZzzqzl0RKXDQ55BFK85xv",
    diet: 'veg'
  },
  {
    id: 'prod-cheese-burger',
    name: 'Double Cheese Loaded Burger',
    category: 'burgers',
    price: 149,
    rating: 4.8,
    reviewsCount: 290,
    description: 'Two cheddar cheese slices melted over herbed potato patty with caramelized onions.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZcdsYesBI2s7SbsVCmqRG0WSjPePMl45Fk1cwlZ9He1cQL57inSzWTubpHZ7YtRznE9UpdNmucqBLbSHsGOLsS7YaIDVp0KFTtminusX5evvCHP5IPTju1s8x-MyLfUGJW5mqHBzxHSj3azc_r--nbYHKM1-1f1S-a4aTQGZZYsJVm9UmB1fNjMLlSU4B6XB0LGrtMON6DgJTuJ7pu5OTLH4mw1s1JT7kQAole0ZzbLHVjpeWg11a",
    diet: 'veg',
    badge: "Chef's Pick"
  },
  {
    id: 'prod-peri-fries',
    name: 'Peri-Peri Masala Fries',
    category: 'fries',
    price: 99,
    rating: 4.8,
    reviewsCount: 780,
    description: 'Crispy skin-on french fries generously tossed in spicy African bird\'s eye chili seasoning.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4yOR_kSZ2mGTWjan4P2IxQdVCKrGwmvXWAjaNxGtMdme-RgjhHQRPtEctC4UIpWPMOvTfYIfAdXuNs9pq0YrYVlE6Ryh4IRiYZ3_AZLToEqYCCnXvBx5lP41GBZihuhR2xCBA5UQpqJ1fd9wavFoZtR7OPbW_E5mJnBshYiVkBR_2EogIkbo3K_WKnadTWpyctANQuR3hSOE9A08-7LXYAAY0hH4WiKKw9n9XDHZtb0soe4s7oroH",
    diet: 'veg',
    badge: 'Spicy'
  },
  {
    id: 'prod-veg-puff',
    name: 'Crispy Veg Puff',
    category: 'puffs',
    price: 25,
    rating: 4.7,
    reviewsCount: 520,
    description: 'Multi-layered flaky butter crust stuffed with spiced potato and pea masala.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXFEl5r8VFS_uinVJajMJREUYQtrvLGEfeamVH54aATYECEnSmciQbVE4eKkUKqlhd5BbQia7WVheqnnrzifRiEXxZq2Diw3eh_U2IFEa7GzFaoPGsvZa45M38o6Fb0AE0RX03x4Ee3TBx3pfyuE-9Jzp6PsZl4kJY8qq7i4O8eABja3K5ioJFH3ZoD1JD-qQFDUvjv_vkAbbGFfWswAc83OKSdOEGSnuPJDpwplVUFyjkfiRNGH2Y",
    diet: 'veg',
    badge: 'Classic Guntur Special'
  },
  {
    id: 'prod-chicken-puff',
    name: 'Spiced Chicken Puff',
    category: 'puffs',
    price: 45,
    rating: 4.9,
    reviewsCount: 890,
    description: 'Slow-cooked Andhra-style minced chicken stuffing encased in golden flaky crust.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPupasnPT6algnJMBWMp2tQxKcCx2EPX1GRqwAoASQ7vGT2GYeqpxw2d7r7-CAV0i3q5ytk3p3jC9XsPo6PaGiHNCEN1RZlRkD39DLBhDs63ymWAi2oRzzgoZM9Fp3GwVZEDcUSWgOfev6CJ26_TkkQferZNhf48VmZ358E4RTy_HtohYoqON7pybd5Rv8KYpHNNuLwuCmjY5xqnjlairDTjLeIy5XsnBzbYphRIFzjSdLt8W5yFI6",
    diet: 'non-veg',
    badge: 'Hot Special'
  },
  {
    id: 'prod-paneer-puff',
    name: 'Masala Paneer Puff',
    category: 'puffs',
    price: 40,
    rating: 4.7,
    reviewsCount: 450,
    description: 'Cottage cheese chunks cooked in rich buttery tomato gravy inside crispy puff pastry.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC51fXNGtAj2afMbHwntfOA96GSNjyX8e_JwUcOE_LgexAPoB16Eapn67MtAgx5R5sSEOpDy9ZjdTNw95pW5zBZDYytE3UmJ0pb7CqNMU-amdE1K7GfxZzAkgiIhO9y8DXotK6hGBhvEFI4isxOIK4Cy5g0SsODgRCX9PpU0XRp_eTbfu1Tqump13Eh_Zv3ow85IcAldntr2uN2lZBHl6wT8oZWponil1Yu9uJ59SZW4WtfCeKKj_GT",
    diet: 'veg'
  },

  // Artisanal Chocolates
  {
    id: 'prod-choco-box',
    name: 'Assorted Chocolate Box (12 pcs)',
    category: 'chocolates',
    price: 249,
    rating: 4.9,
    reviewsCount: 195,
    description: 'Handmade bonbons: hazelnut praline, roasted almond, mocha and berry caramel.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5lJvfzQp-t071mrPm5eF61-cdKfswDyEsJKhd26spPdef1J0BAkGyZQbr6VMjpKH7wGHjjNYvn-t7mV0XqpslTHsqcEY6uM0HLIeDtdS2cwTBRKKjDshqNa8l4HPFlgjDGrLOn-Kjd1NeEJlHd4C4LPA9lPj0skm2_U5sVAKaaYwOE5f06c5jttdqWn9fcDvDByV7xPeebHPKmqofs90pXvx-LJ_Z4aycHxT1OEvSFpUdS1F2wwH0",
    diet: 'veg'
  },
  {
    id: 'prod-dark-bar',
    name: '70% Single Origin Dark Bar',
    category: 'chocolates',
    price: 129,
    rating: 4.8,
    reviewsCount: 110,
    description: 'Intense Madagascan cocoa with subtle hints of red berries and roasted hazelnuts.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-3etqyasaWTIqamqsrlKvLwxw-JESqRFBzgbLMi4l5si6hS-j0lxn7Pww72Wh0XgfUt9fFYk6Fsmu4ska-5pg41AdigsPEe42_0jRp6iDnNTlI17YepMUVFlrny07Mke7k050jMqfklgrc-iaKCmGKa07wBhmjztRQIPsU26aR9UAGVexp_GthVXc4tuDogYj6RnSitybjyM99Zr3FUq7DtFsnPciULapDNbXrOfEVWqI5nj0lvaH",
    diet: 'veg'
  },
  {
    id: 'prod-deluxe-hamper',
    name: 'Deluxe Chocolate Hamper',
    category: 'chocolates',
    price: 499,
    rating: 5.0,
    reviewsCount: 82,
    description: 'Includes truffles, almond rochers, 2 chocolate bars & customized greeting card.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgwAxNTDLLW1DjR5WzlizpZ-jgTHghKOc8GN11B1yCT9xf_miwt4sKpvFcA4HA7ns1wcStlj4iCsPJh6dH0d7SUwHq7AcocwJVjBaFPwKjehsIAfrh6-e8gdkZ8qcsKWaAROEj_5rZFvCjOCe90UxSx3AqDMVOlV0WO2DXnPrRqrPN10aycnyKzJVZhnOjy7kKnkQIYu20-07gYcJiKCbCQANKFE9dgrsW_aDg3Lp3GT5P-_uDn48p",
    diet: 'veg'
  },

  // Shakes & Beverages
  {
    id: 'prod-cold-coffee',
    name: 'Cold Coffee (Thick Shake)',
    category: 'beverages',
    price: 99,
    rating: 4.8,
    reviewsCount: 620,
    description: 'Blended with Arabica espresso shot, vanilla ice cream, and chocolate drizzle in chilled glass bottle.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDsvfoCd1tHjSAvafDEaVzhYL_PeNQDalzALQ2QLhA_aO2e1Wdn0OjPmXaOOGOrBODF5tl4MV-xNFYgyGVGNF-5O7l6ud0GO0jWdOMEZUVYGnWv6Z9bwaJhlIEvBfUjd7pITeU11uKaY3tXPGnjEaXFts9WcZgCUoNhXTlWr_Gj9fLBCmnp15w4pa8vEHW_V2w4QQe-74S8DJDlk5KY6DYfaa2OFWHm7x1u6xKdkXdkSmjVQ-gdeR4",
    diet: 'veg'
  },
  {
    id: 'prod-strawberry-shake',
    name: 'Real Strawberry Milkshake',
    category: 'beverages',
    price: 129,
    rating: 4.7,
    reviewsCount: 230,
    description: 'Crushed Mahabaleshwar strawberries blended into whole dairy milk and cream.',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw_S9vzgQxWrYI-w6mwrDe6_HvOGZ0WL1Ar5rDe-UNQv0N8Viphsl8Ov8KvjAMH-mN-GLkkmC_cJDOJHNleyH3Ffkpgs7LeeqKuHnCyygOA75sUZc9ORs62BRllUgYOYKA84q76u_w6xqUdIEmXUEEGTRzVyHo8042VbIGS_XELIlReqSggKqMAo1vONySkNfn6iuXlcZcQnSWaJKJ4z_T9GEH3mmaK_pS_mMXkMfJ14P1T9P6fO10",
    diet: 'veg'
  }
];

export const INITIAL_CART: CartItem[] = [
  {
    id: 'cart-1',
    productId: 'prod-truffle',
    name: 'Signature Chocolate Truffle',
    price: 999,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkyo5oR90U2PSOGGxSFU1RghFXHU0UQ6mVOvZrmybkkTYeoY6bwJ0EBJ_KtbzNN7T3Ww-uxU-a8kybFpGH59BLs1q8ySRQp2bZlFvgP04vXfOYdea1hZ_dVq07h0D7gvBMT7m4Mz0kVLdNeUxZd4fo_PcjrgFzbjAlo47iduU4EaJd5_c-tB5NnaAjLmsPensdAc2Ltm77HVLdlQek4uEss9ICyfc0cC81Rqp4U434kUsGvjHxpBsI",
    weight: '1 kg',
    diet: 'eggless',
    customPlaque: "Happy Birthday Rahul",
    addons: ['+1 Sparkler']
  },
  {
    id: 'cart-2',
    productId: 'prod-paneer-pizza',
    name: 'Paneer Tikka Pizza',
    price: 289,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd856xcDDY46LZYeVYQiqDHOqnP7Q2An-OgYUwBBHkIiLcT1F6Et3c-tz12BZH1Q-Uqq0FnjXGUz6-Y9aE1Hhdwwus6vQP888Mxfqedlxrg9egq0fenKGtBS91bKdK3OYR8517THl3K9Ss5995sYUR0YcnHhhw3wIqF8Hn38K_JJoiiIPmNXRk5GaGWsZAS6S96UlO-GRjpbgSpf66g6CevbdqCTrfMooEkeLNn1cNQR_AM-JQh9v6",
    diet: 'veg',
    subOptions: ['Medium 10"', 'Extra Cheese', 'Thin Crust']
  },
  {
    id: 'cart-3',
    productId: 'prod-cold-coffee',
    name: 'Cold Coffee',
    price: 99,
    quantity: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDsvfoCd1tHjSAvafDEaVzhYL_PeNQDalzALQ2QLhA_aO2e1Wdn0OjPmXaOOGOrBODF5tl4MV-xNFYgyGVGNF-5O7l6ud0GO0jWdOMEZUVYGnWv6Z9bwaJhlIEvBfUjd7pITeU11uKaY3tXPGnjEaXFts9WcZgCUoNhXTlWr_Gj9fLBCmnp15w4pa8vEHW_V2w4QQe-74S8DJDlk5KY6DYfaa2OFWHm7x1u6xKdkXdkSmjVQ-gdeR4",
    diet: 'veg',
    subOptions: ['Thick Shake style', 'Less Sugar']
  }
];

export const PAST_ORDERS: Order[] = [
  {
    id: 'CB-79104',
    date: '14 Oct, 7:15 PM • Brodipet 4th Lane',
    status: 'delivered',
    total: 798,
    paymentMethod: 'Paid via GPay',
    address: 'Flat 402 Sri Sai Nivas, Brodipet',
    items: [
      { name: 'Red Velvet Cream Cheese Cake', quantity: 1, price: 599, weight: '500g', diet: 'veg', note: 'Happy Birthday Mom ❤️' },
      { name: 'Crispy Peri-Peri Fries (Jumbo)', quantity: 2, price: 199, diet: 'veg' }
    ]
  },
  {
    id: 'CB-72481',
    date: '28 Sep, 8:40 PM • Arundelpet Office',
    status: 'delivered',
    total: 448,
    paymentMethod: 'Cash on Delivery',
    address: '6/1 Arundelpet, Main Road, Guntur',
    items: [
      { name: 'Farmhouse Supreme Pan Pizza (10")', quantity: 1, price: 229, diet: 'veg' },
      { name: 'Crispy Veg Gourmet Burger', quantity: 1, price: 99, diet: 'veg' },
      { name: 'Choco Molten Lava Cup', quantity: 1, price: 120, diet: 'eggless' }
    ]
  },
  {
    id: 'CB-66219',
    date: '12 Sep, 4:20 PM • Brodipet',
    status: 'delivered',
    total: 329,
    paymentMethod: 'Paid Online',
    address: 'Brodipet Main Road',
    items: [
      { name: 'Assorted Handmade Chocolate Box (12 pcs)', quantity: 1, price: 249, diet: 'veg' },
      { name: 'Pineapple Fresh Cream Pastry', quantity: 1, price: 80, diet: 'veg' }
    ]
  }
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: 'Welcome to Cake Box Brodipet Support. I can see your active order #CB-84920 is currently out for delivery with Ramesh. How can I assist you right now?',
    time: '8:32 PM'
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Can I ask the delivery partner to keep the cake extra chilled and ring the bell upon arrival?',
    time: '8:33 PM'
  },
  {
    id: 'msg-3',
    sender: 'bot',
    text: 'Absolutely! I have updated your special handling notes for Ramesh Varma. The cake is secured in a rigid insulated thermocol cradle with active ice gel pads. Ramesh will ring your doorbell at Flat 402, Sri Sai Nivas.',
    time: '8:33 PM',
    cardType: 'note_relayed'
  },
  {
    id: 'msg-4',
    sender: 'user',
    text: 'Also, can I order an eggless Red Velvet cake for tomorrow evening?',
    time: '8:34 PM'
  },
  {
    id: 'msg-5',
    sender: 'bot',
    text: 'Yes! We bake fresh eggless batches twice daily at our Brodipet bakery. Here is our customer-favorite signature cake for scheduled delivery tomorrow:',
    time: '8:34 PM',
    cardType: 'product_card'
  },
  {
    id: 'msg-6',
    sender: 'bot',
    text: 'Need to speak to our master chef or Brodipet store manager directly regarding custom floral tiers or immediate changes?',
    time: '8:35 PM',
    cardType: 'escalation'
  }
];

export const COUPONS = [
  { code: 'WELCOME10', discount: 148, description: '10% off up to ₹150 on your welcome treat', applied: true },
  { code: 'CAKEMAGIC', discount: 100, description: 'Flat ₹100 OFF above ₹499', applied: false },
  { code: 'SWEET50', discount: 50, description: '₹50 instant cash discount on bakery boxes', applied: false },
  { code: 'CAKECOMBO', discount: 180, description: 'Save ₹180 on celebration combos with pizzas', applied: false }
];
