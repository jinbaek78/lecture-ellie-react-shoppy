import { createContext, ReactNode, useContext } from 'react';
import { IDataBase } from '../db/DataBase';

const dbContext = createContext<IDataBase | null>(null);

type DbProviderProps = {
  db: IDataBase;
  children: ReactNode;
};

const DbProvider = ({ db, children }: DbProviderProps) => {
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
