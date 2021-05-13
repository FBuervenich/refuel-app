import fs from 'fs';
import { Dictionary } from 'lodash';
import path from 'path';
import { Sequelize } from 'sequelize';
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
    const loaded: Dictionary<TodoAny> = {};

    fs.readdirSync(baseFolder)
      .filter(file => {
        return (
          file.indexOf('.') !== 0 &&
          file !== indexFile &&
          file.slice(-3) === '.js'
        );
      })
      .forEach(file => {
        const model = require(path.join(baseFolder, file))(sequelize);
        // const model = import(path.join(baseFolder, file))(sequelize);
        loaded[model.name] = model;
      });

    Object.keys(loaded).forEach(modelName => {
      if (loaded[modelName].associate) {
        loaded[modelName].associate(loaded);
      }
    });

    loaded.database = sequelize;

    return loaded;
  },
};

export default ModelsLoader;
