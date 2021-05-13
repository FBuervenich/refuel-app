const UserSerializer = {
  serialize({ id, name }) {
    return {
      id,
      name,
    };
  },
};

export default UserSerializer;
