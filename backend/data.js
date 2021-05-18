import bcrypt from "bcryptjs";

const data = {
  posts: [
    {
      likes: [],
      repost: ["Jose62"],
      image: null,
      post: "Esto es una prueba",
      profile: "M-Ivan",
      comments: [
        {
          likes: 0,

          profile: "M-Ivan",
          comment: "Comentario 1",
        },
        {
          likes: 0,

          profile: "M-Ivan",
          comment: "comentario 2",
        },
      ],
    },
    {
      likes: ["M-Ivan"],
      repost: ["M-Ivan", "Jose62"],
      image: null,
      post: "Esto es un post de otra cuenta",
      profile: "Ivan-M",
      comments: [
        {
          likes: 0,

          profile: "M-Ivan",
          comment: "esto es un comentario ",
        },
      ],
    },
    {
      likes: [],
      repost: [],
      image: null,
      post: "Hola a todos!",
      profile: "Jose62",
      comments: [],
    },
    {
      likes: ["M-Ivan"],
      repost: [],
      image: null,
      post: "Bitcoin en 50k!!! ",
      profile: "M-Ivan",
      comments: [],
    },
    {
      likes: ["Dana 123"],
      repost: ["Dana 123"],
      image: "/uploads/1621116521920.jpg",
      post: "Bitcoin cae un 12%! Elon Musk anuncia que Tesla suspendera temporalmente los pagos con la criptomoneda. Las acciones de TSLA también caen con el anuncio.\nA pesar de la caida, no creo que el escenario cambie a gran escala, seguimos en bull market",
      profile: "M-Ivan",
      comments: [
        {
          likes: 0,

          profile: "Dana 123",
          comment:
            "Terrible, estoy -30% por culpa de este que no se decide, a holdear",
        },
      ],
    },
    {
      likes: [],
      repost: [],
      image: null,
      post: "yo no abriria un largo a pesar de estar en buen precio de compras, a veces es mejor saber cuando no entrar\n\n# Long",
      profile: "Dana 123",
      comments: [],
    },
  ],
  users: [
    {
      _id: "M-Ivan",
      isAdmin: true,
      followers: ["Jose62", "Dana 123"],
      following: ["Ivan-M", "Jose62"],
      disabled: false,
      username: "M-Ivan",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234", 8),
      profile: {
        name: "Ivan",
        lastname: "Miragaya",
        description: "Programador MERN. 21 años.",
        username: "M-Ivan",
        profile: "/uploads/1621194906058.jpg",
        background: "/uploads/1621195470542.jpg",
      },
    },
    {
      _id: "Ivan-M",
      isAdmin: false,
      followers: [null, null, null, null, null, null, "M-Ivan"],
      following: [],
      disabled: false,
      username: "Ivan-M",
      email: "user@example.com",
      password: bcrypt.hashSync("1234", 8),
      profile: {
        name: "Ivan",
        lastname: "Francisco",
        description: "programador",
        username: "Ivan-M",
      },
    },
    {
      _id: "Dana 123",
      isAdmin: false,
      followers: [],
      following: ["M-Ivan"],
      disabled: false,
      username: "Dana 123",
      email: "dana@example.com",
      password: bcrypt.hashSync("1234", 8),
      profile: {
        username: "Dana 123",
        name: "dana",
        lastname: "cejas",
      },
    },
    {
      _id: "Abel 123",
      isAdmin: false,
      followers: [],
      following: [],
      disabled: false,
      username: "Abel 123",
      email: "abel@example.com",
      password: bcrypt.hashSync("1234", 8),
      profile: {
        name: "Abel",
        lastname: "cejas",
        username: "Abel 123",
      },
    },
    {
      _id: "Jose62",
      isAdmin: false,
      followers: ["M-Ivan"],
      following: ["M-Ivan"],
      disabled: false,
      username: "Jose62",
      email: "jose@example.com",
      password: bcrypt.hashSync("1234", 8),
      profile: {
        name: "Francisco Jose",
        lastname: "Miragaya",
        description: "programador mern",
        username: "Jose62",
      },
    },
  ],
};

export default data;
