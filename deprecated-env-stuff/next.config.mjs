// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // Automatically determine the correct .env file based on NODE_ENV
// const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : 
//                process.env.NODE_ENV === 'test' ? '.env.test' : 
//                '.env.development';

// dotenv.config({ path: path.resolve(__dirname, envFile) });

// const nextConfig = {
//   reactStrictMode: true,
//   env: {
//     BACKEND_URL: process.env.BACKEND_URL,
//     REDIRECT_SIGN_IN: process.env.REDIRECT_SIGN_IN,
//     REDIRECT_SIGN_OUT: process.env.REDIRECT_SIGN_OUT,
//     COGNITO_DOMAIN: process.env.COGNITO_DOMAIN,
//   },
// };

// export default nextConfig;
