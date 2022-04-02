const Conversation = require("../models/conversation");

// get inbox page
async function getInbox(req, res, next) {
  try {
    const conversations = await Conversation.find({
      $or: [
        //
        { "creator.id": req.user.userid }, // got this user from checkLogin middleware
        // whether the user created the chat or he/she is engaged(participated) in a chat
        { "participant.id": req.user.userid },
      ],
    });
    res.locals.data = conversations;
    res.render("inbox"); // now we can use the conversations in inbox ejs template
  } catch (err) {
    next(err);
  }
}

// add conversation when user hit 'inbox/conversation' route to add conversation
async function addConversation(req, res, next) {
  try {
    const newConversation = new Conversation({
      creator: {
        id: req.user.userid,
        name: req.user.username,
        avatar: req.user.avatar || null,
      },
      participant: {
        name: req.body.participant,
        id: req.body.id,
        avatar: req.body.avatar || null,
      },
    });

    const result = await newConversation.save();
    res.status(200).json({
      message: "Conversation was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

module.exports = { getInbox, addConversation };
