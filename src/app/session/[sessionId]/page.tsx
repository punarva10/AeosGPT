import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const ChatSession = async () => {
  return (
    <div className="pt-20">
      Hi
    </div>
  );
};

export default ChatSession;
