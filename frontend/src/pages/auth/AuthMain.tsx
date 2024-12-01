import MSection from "./MSection";

export default function AuthMain({
  setIsLogin,
}: {
  setIsLogin: (value: boolean) => void;
}) {
  return (
    <MSection key={"main"} className="space-y-4">
      <button
        onClick={() => setIsLogin(true)}
        className="w-2/3 rounded-lg border border-black bg-black p-4 text-white transition-all hover:scale-105 sm:w-1/3 sm:p-3"
        type="button"
      >
        <span>Login</span>
      </button>
      <button
        onClick={() => setIsLogin(false)}
        className="w-2/3 rounded-lg border border-black bg-white p-4 transition-all hover:scale-105 sm:w-1/3 sm:p-3"
        type="button"
      >
        <span>Sign Up</span>
      </button>
    </MSection>
  );
}
