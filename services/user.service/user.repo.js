module.exports = (model) => {
  const findOne = async (model, filter = {}) => {
    return model.findOne(filter);
  };

  const findAll = async (model, filter = {}) => {
    return model.find(filter);
  };

  const insertOne = async (model, payload = null) => {
    if (!payload)
      return {
        success: false,
        message: 'User could not be created.',
        reason: 'No payload passed.',
      };
    return model.create(payload);
  };

  const bulkInsert = async (model, payload = []) => {
    if (!payload.length) {
      return {
        success: false,
        message: 'Users could not be created',
        reason: 'No payload passed',
      };
    }
    return model.insertMany(payload);
  };

  const updateOne = async (model, filter = {}, payload = null) => {
    if (!payload) return;
    return model.update(filter, payload);
  };

  const bulkUpdate = async (model, filter = {}, payload = null) => {
    if (!payload) return;
    return model.updateMany(filter, payload);
  };

  const softDelete = async (model, filter = {}) => {
    return model.updateMany(filter, { deleted: true });
  };

  return {
    findOne,
    findAll,
    insertOne,
    bulkInsert,
    updateOne,
    bulkUpdate,
    softDelete,
  };
};
