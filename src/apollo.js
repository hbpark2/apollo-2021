import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const cache = new InMemoryCache();
const link = new createHttpLink({
  uri: "https://jakemovieql.herokuapp.com/",
});

const client = new ApolloClient({
  link: link,
  cache: cache,
  resolvers: {
    Movie: {
      isLiked: () => false, // 디폴트로 false 값 지니도록.
    },
    Mutation: {
      toggleLikeMovie: (_, { id }, { cache }) => {
        console.log(cache.modify);
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: (isLiked) => !isLiked, // 현재 isLiked 값을 받아서 true-false 토글
          },
        });
      },
    },
  },
});

// const client = new ApolloClient({
//   cache: cache,
//   link: link,
//   resolvers: {
//     Movie: {
//       isLiked: () => false,
//     },
//     Mutation: {
//       likeMovie: (_, { id }, { cache }) => {
//         console.log(cache.writeData);
//         // cache.writeData({
//         //   id: `Movie:${id}`,
//         //   data: { isLiked: true },
//         // });
//       },
//     },
//   },
// });

export default client;
