import { getConnectionOptions, createConnection } from 'typeorm';

export const dbConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development');
  return createConnection({ ...connectionOptions, name: 'default' });
};