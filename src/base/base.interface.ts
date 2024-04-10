import { FindOneOptions, FindOptionsWhere } from 'typeorm';

export interface IBaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface IBaseService<T> {
  create: (dto: Omit<T, 'id' | 'created_at' | 'updated_at'>) => Promise<T>;
  //   findAll: () => Promise<Array<T>>;
  findOneByPk: (id: string) => Promise<T | null>;
  findOneByParam: (findParam: FindOptionsWhere<T>) => Promise<T | null>;
  //   delete: () => Promise<number>;
}
