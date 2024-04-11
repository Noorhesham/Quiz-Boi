import { AnimatePresence, motion } from "framer-motion";

const CategoreyCadHover = ({tag}:{tag:string}) => {
  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-0 left-0 right-0 bottom-0 bg-red-400/80 rounded-lg flex items-center justify-center"
      >
        <h1 className="capitalize text-xl text-white font-semibold">{tag}</h1>
      </motion.div>
  );
};

export default CategoreyCadHover;
