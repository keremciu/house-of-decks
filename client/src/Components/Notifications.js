import { m as motion, AnimatePresence } from "framer-motion";
import {
  StyledNotificationList,
  StyledNotification,
  StyledButton,
} from "./Notifications.styled";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="white"
    strokeLinecap="round"
    {...props}
  />
);

const Notifications = ({ errors, onClose }) => (
  <StyledNotificationList>
    <AnimatePresence initial={false}>
      {errors.map((error, index) => (
        <motion.li
          key={index}
          positionTransition
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          <Notification text={error} close={onClose} />
        </motion.li>
      ))}
    </AnimatePresence>
  </StyledNotificationList>
);

export default Notifications;

const Notification = ({ text, close }) => (
  <StyledNotification>
    {text}
    <StyledButton onClick={close}>
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path d="M 3 16.5 L 17 2.5" />
        <Path d="M 3 2.5 L 17 16.346" />
      </svg>
    </StyledButton>
  </StyledNotification>
);
