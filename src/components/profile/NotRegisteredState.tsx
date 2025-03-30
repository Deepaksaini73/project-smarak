import Link from 'next/link';
import { ArrowRight, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function NotRegisteredState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="shadow-xl rounded-lg p-8 text-center max-w-md mx-auto border border-gray-100"
    >
      <div className="">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 font-outfit">You are 1 step away..</h2>
        <p className="text-gray-600 mb-8  font-quicksand">
          Complete the registration process to be able to register for events.
        </p>

        <Link href="/register" className="button-primary flex items-center justify-center w-full">
          Register Now
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
