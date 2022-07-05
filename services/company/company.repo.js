module.exports = (model) => {
    const findOne = async (filter = {}) => {
        return await model.findOne(filter);
    };

    const findAll = async (filter = {}) => {
        return await model.find(filter);
    };

    const insertOne = async (payload = null) => {
        if (!payload) {
            return {
                success: false,
                message: 'Company could not be created.',
                reason:  'No payload passed.',
            };
        }

        return await model.create(payload);
    };

    const bulkInsert = async (payload = []) => {
        if (!payload.length) {
            return {
                success: false,
                message: 'Companies could not be created',
                reason:  'No payload passed',
            };
        }

        return await model.insertMany(payload);
    };

    const updateOne = async (filter = {}, payload = null) => {
        if (!payload) {return;}

        return await model.update(filter, payload);
    };

    const bulkUpdate = async (filter = {}, payload = null) => {
        if (!payload) {return;}

        return await model.updateMany(filter, payload);
    };

    const softDelete = async (filter = {}) => {
        return await model.updateMany(filter, {deleted: true});
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
