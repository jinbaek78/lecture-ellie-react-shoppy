import { createContext, ReactNode, useContext } from 'react';
import { IDataBase } from '../db/DataBase';

type dbContextType = {
  db: IDataBase;
};

const dbContext = createContext<dbContextType | null>(null);

type DbProviderProps = {
  db: IDataBase;
  children: ReactNode;
};

const DbProvider = ({ db, children }: DbProviderProps) => {
  return <dbContext.Provider value={{ db }}>{children}</dbContext.Provider>;
};

export default DbProvider;

export const useDB = (): dbContextType => {
  const database = useContext(dbContext);
  if (database) {
    return database;
  }

  console.log('database: ', database);

  throw Error('Something went wrong');
};
