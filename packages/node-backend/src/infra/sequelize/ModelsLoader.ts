import fs from 'fs';
import { Dictionary } from 'lodash';
import path from 'path';
import { Model, Sequelize } from 'sequelize';
import { TodoAny } from '../../../../common/types/ToDoTypes';

const ModelsLoader = {
  load({
    sequelize,
    baseFolder,
    indexFile = 'index.js',
  }: {
    sequelize: Sequelize;
    baseFolder: string;
    indexFile?: string;
  }) {
    const loaded: Dictionary<Model> = {};

    fs.readdirSync(baseFolder)
      .filter(file => {
        return (
          file.indexOf('.') !== 0 &&
          file !== indexFile &&
          file.slice(-3) === '.js'
        );
      })
      .forEach(file => {
        const model = require(path.join(baseFolder, file)).default(sequelize);
        loaded[model.name] = model;
      });

    return loaded;
  },
};

export default ModelsLoader;
