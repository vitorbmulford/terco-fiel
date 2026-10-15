import styles from "./auth-modal.module.css";
export const passwordMeetsRequirements = (password: string) => password.length >= 8;
export function PasswordRequirements({ password }: { password: string }) { const met = passwordMeetsRequirements(password); return <div aria-live="polite" className={styles.requirements}><span className={`${styles.requirement} ${met ? styles.requirementMet : ""}`}>Pelo menos 8 caracteres</span></div>; }
