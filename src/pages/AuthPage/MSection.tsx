import { motion } from "motion/react";

export default function MSection({
  children,
  key,
  className,
}: {
  children: React.ReactNode;
  key: string | number;
  className?: string;
}) {
  return (
    <motion.section
      key={key}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 1.5 } }}
      className={`relative flex h-full w-full flex-col items-center justify-center rounded-lg bg-white p-4 font-semibold text-black shadow-lg transition-all sm:h-2/3 sm:w-2/3 ${className}`}
    >
      {children}
    </motion.section>
  );
}
