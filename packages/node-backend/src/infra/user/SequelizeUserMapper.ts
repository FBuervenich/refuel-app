import User from '../../domain/user/User';

const SequelizeUserMapper = {
  toEntity(dbSurvivor) {
    const { id, name } = dbSurvivor.get({ plain: true });

    return new User({ id, name });
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  },
};

export default SequelizeUserMapper;
