import { useContext } from "react";
import { useForm } from "react-hook-form";

import SocketContext from "Contexts/socket";

function Create() {
  const { sendServer } = useContext(SocketContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data: object) =>
    sendServer({
      action: "create",
      payload: data,
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Username"
        {...register("username", { required: true })}
      />
      {errors.username && "Username is required"}
      <button type="submit" onClick={() => null}>
        Start Game
      </button>
    </form>
  );
}

export default Create;
