module.exports = {
    createSnap: async (parent, {data: {text, user_id}}, {Snap, User, pubsub}) => {
        //return await new Snap({text,user_id}).save();

        try {
            const snap = await new Snap({user: user_id, text: text}).save();
            
            // User bilgisini populate et
            const populatedSnap = await Snap.findById(snap._id).populate('user');
            
            pubsub.publish('SNAP_ADDED', {snapAdded: populatedSnap});
            return populatedSnap;
        } catch (error) {
            throw new Error(error);
        }
    }
}
