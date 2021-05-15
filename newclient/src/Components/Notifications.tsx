import { useContext } from "react";

import SocketContext from "Contexts/socket";

function Notifications() {
  const { errors, setErrors } = useContext(SocketContext);

  if (!errors.length) return null;

  return (
    <div className="notifications">
      <button type="button" onClick={() => setErrors([])}>
        Clear notifications
      </button>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
