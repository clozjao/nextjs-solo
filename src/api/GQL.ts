
const endpoint =
'https://spcms.astrophant.online/graphql?query_hash=85bc0fd6b133aa5b58f749000000cce8';

const rulesQuery = (language: string = 'en') => {
  const category = `BettingRules-${language}`;
    return  `
    {
      posts(where: { categoryName: "${category}" }) {
        nodes {
          id
          title
          content
          slug
        }
      }
    }
  `
};


export { endpoint, rulesQuery };
