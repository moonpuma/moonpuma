import styles from "./SettingsPage.module.css";
import type { Part } from "../model/parts";

type Props = {
  part: Part;
};

export function SettingsPage({ part }: Props) {
  return (
    <div className={styles.page}>
      <h1>Settings</h1>
      <p>Tab: {part}</p>
    </div>
  );
}
