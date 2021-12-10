export default () => ({
  PLATFORM        : process.env.PLATFORM,
  PORT            : process.env.API_PORT,
  API_PREFIX      : process.env.API_PREFIX,
  API_SECRET_KEY  : process.env.API_SECRET_KEY,
  AUTH_TOKEN : {
    issuer   : process.env.AUTH_TOKEN_ISSUER,
    audience : process.env.AUTH_TOKEN_AUDIENCE,
    privateKey : process.env.AUTH_TOKEN_PRIVATE_KEY,
    publicKey : process.env.AUTH_TOKEN_PUBLIC_KEY,
    secretKey : process.env.AUTH_TOKEN_SECRET_KEY,
    accessTokenExpireIn : process.env.AUTH_TOKEN_AT_EXPIREIN,
    refreshTokenExpireIn : process.env.AUTH_TOKEN_RT_EXPIREIN  

  },
  DATABASE: {
      uri     : process.env.DB_MONGO_URI,
      dbName  : process.env.DB_MONGO_DBNAME,
      user    : process.env.DB_MONGO_USERNAME,
      pass    : process.env.DB_MONGO_PASSWORD,
      tlsInsecure  : true
  },
  REDIS :{
      host : process.env.REDIS_HOST,
      port : process.env.REDIS_PORT,
      db   : process.env.REDIS_DB,
      connectTimeout: 10000
  }
});
