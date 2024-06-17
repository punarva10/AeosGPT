"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/inputs/Input";

const CreateTeamPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      teamName: "",
      sessionName: ""
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    axios
      .post("/api/create-team", data)
      .then((res) => {
        const {team, chatSession} = res.data
        localStorage.setItem("selectedTeam", JSON.stringify(team));
        localStorage.setItem("selectedChatSession", JSON.stringify(chatSession));
        router.push(`/session`);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md pt-80">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="teamName"
            label="Team Name"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="sessionName"
            label="Session Name"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              Create Team
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamPage;
