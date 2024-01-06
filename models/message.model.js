import mongoose from "m0ngoose";

const MessageSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", MessageSchema);
