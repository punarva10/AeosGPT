import Input from "@/app/components/inputs/Input";
import { ChatSession } from "@/types/chat-session";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface CreateSessionFormProps {
  setShowCreateForm: (x: boolean) => void;
  setSelectedChatSession: (x:ChatSession) => void;
  teamId?: number;
}


const CreateSessionForm = ({ setShowCreateForm, setSelectedChatSession, teamId }: CreateSessionFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const updatedData = {
      title: data.title,
      teamId: teamId
    }

    axios
      .post("/api/create-session", updatedData)
      .then((res) => {
        axios.post("/api/check-credit", {teamId}).catch(()=> {
          toast.error("Something went wrong!");
        })
        const session = res.data.session;
        localStorage.setItem("selectedChatSession", JSON.stringify(session));
        setSelectedChatSession(session)
        router.push(`/session`);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
        setShowCreateForm(false)
      });
  };

  return (
    <div className="w-full h-full">
      <div className="bg-blue-200 px-4 py-8 shadow sm:rounded-lg sm:px-10 h-full flex justify-center items-center">
        <form className="w-full max-w-[30rem]" onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="title"
            label="Title"
          />

          <div className="flex justify-end pt-4">
            <Button disabled={isLoading} type="submit" className="w-4rem border-green-400 bg-green-200 text-green-800 py-2 px-3 rounded-md">
              {isLoading ? "Submitting..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSessionForm;
