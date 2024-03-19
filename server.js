import { ApolloServer, gql } from "apollo-server";

let tweets = [
    {
        id:"1",
        text:"hello1",
    },
    {
        id:"2",
        text:"hello2",
    },
    {
        id:"3",
        text:"hello3",
    },
    {
        id:"4",
        text:"hello4",
    },
    {
        id:"5",
        text:"hello5",
    },
    {
        id:"6",
        text:"hello6",
    }

]

// type Query  = GET METHOD 
// type Mutation = POST METHOD 
// !옵션을 타입 뒤에 주면 null을 허용하지 않음
const typeDefs = gql`
    type User {
        id:ID!
        username :String!
    }
    type Tweet {
        id : ID!
        text: String
        author : User
    }
    type Query { 
        allTweets : [Tweet]
        tweet(id:ID!) : Tweet
        ping:String!
    }
    type Mutation {
        postTweet(text:String, userId:ID): Tweet
        deleteTweet(id:ID!):Boolean
    }

`;

const resolvers = {
    Query: {
        tweet(root, {id}) {
            
            return tweets.find(tweet => tweet.id ===id)
        },
        ping() {
            return "pong";
        },
        allTweets() {
            return tweets;
        }
    },
    Mutation: {
        postTweet(root,{text,userId}) {
            const newTweet = {
                id:tweets.length +1,
                text,
            };
            tweets.push(newTweet);

            return newTweet;
        },
        deleteTweet(root,{id})  {
            const tweet = tweets.find((tweet) => tweet.id ===id);
            if(!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id)
            return true;
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Runing on ${url}`);
});

