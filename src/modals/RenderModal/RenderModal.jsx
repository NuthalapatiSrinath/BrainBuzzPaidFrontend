import React from "react"; // Removed { useState } as it wasn't used
import { useSelector } from "react-redux"; // Removed { useDispatch }
import { AnimatePresence, motion } from "framer-motion";
import styles from "./RenderModal.module.css";

// Redux (closeModal is not needed here, MainModal handles it)
// import { closeModal } from "../../redux/slices/modalSlice";

// Components
import MainModal from "../MainModal/MainModal";
import LoginModal from "../LoginModal/LoginModal"; // <-- 1. IMPORT IT
import RegisterModal from "../RegisterModal/RegisterModal";

function RenderModal() {
  const activeModal = useSelector((state) => state.modal.type);
  // const dispatch = useDispatch(); // Not needed here
  // const [formValue, setFormValue] = useState(""); // Not needed here
  // const modalData = useSelector((state) => state.modal.modalData); // Not needed yet

  const allModals = {
    login: <LoginModal />,
    register: <RegisterModal />, // <-- 2. ADD IT TO THE MAP
    // ... add other modals here as you create them
    // "register": <RegisterModal />,
  };

  return (
    <MainModal>
      <AnimatePresence mode="wait">
        {activeModal && (
          <motion.div
            key={activeModal}
            className={styles.RenderModal}
            // Your animations are for a side-panel.
            // For a central modal, you might want 'opacity' or 'scale'.
            // I'll keep your 'x' animation for now.
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
          >
            {allModals[activeModal]}
          </motion.div>
        )}
      </AnimatePresence>
    </MainModal>
  );
}

export default RenderModal;
