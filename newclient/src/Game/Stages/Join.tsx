import { useContext } from "react";
import { useForm} from 'react-hook-form'
import { useParams } from "react-router-dom";

import SocketContext from 'Contexts/socket'

type ParamsType = {
  gameid: string
}

function Join() {
  const { sendServer } = useContext(SocketContext);
  const { gameid } = useParams<ParamsType>();
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      roomID: gameid,
      username: ""
    }
  })
  const onSubmit = (data: object) => {
    console.log(data, 'naber')
    sendServer({
    action: "join",
    payload: data
  })
}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input readOnly {...register("roomID", { required: false })} />
      <input placeholder="Username" {...register("username", { required: true })} />
      {errors.username && "Username is required"}
      <button type="submit" onClick={() => null}>Join Room</button>
    </form>
  );
}

export default Join;