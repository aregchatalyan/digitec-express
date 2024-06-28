import dotenv from 'dotenv';

dotenv.config();

interface Environment {
  PORT: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  DATABASE_URL: string;
}

class Config {
  private static instance: Config;

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }

    return Config.instance;
  }

  get(key: keyof Environment): string {
    if (!process.env[key]) console.warn(`Missing environment variable: ${ key }`);

    return <string> process.env[key];
  }
}

export const config = Config.getInstance();
