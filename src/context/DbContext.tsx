import { createContext, ReactNode, useContext } from 'react';
import DataBase, { IDataBase } from '../db/DataBase';

const db = new DataBase();
const dbContext = createContext<IDataBase | null>(null);

type DbProviderProps = {
  children: ReactNode;
};

const DbProvider = ({ children }: DbProviderProps) => {
  return <dbContext.Provider value={db}>{children}</dbContext.Provider>;
};

export default DbProvider;

export const useDB = (): IDataBase => {
  const database = useContext(dbContext);
  if (database) {
    return database;
  }

  throw Error('Something went wrong');
};
