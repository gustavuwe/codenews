import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession, } from "next-auth/react";

import styles from "./styles.module.scss";

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      type="button"
      className={styles.SignInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737388" className={styles.closeicon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.SignInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#00dbff" />
      Sign in with Github
    </button>
  );
}
