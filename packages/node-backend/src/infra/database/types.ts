import { QueryInterface } from 'sequelize';

export interface Migration {
  up: (queryInterface: QueryInterface) => Promise<any>;
  down: (queryInterface: QueryInterface) => Promise<any>;
}

export interface Seed {
  up: (queryInterface: QueryInterface) => Promise<any>;
  down: (queryInterface: QueryInterface) => Promise<any>;
}
