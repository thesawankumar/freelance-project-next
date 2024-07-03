import React from 'react';
import styles from '../columntoggle.module.css';

interface ColumnToggleProps {
  columnVisibility: Record<string, boolean>;
  handleColumnVisibilityChange: (key: string) => void;
}

const ColumnToggle: React.FC<ColumnToggleProps> = ({ columnVisibility, handleColumnVisibilityChange }) => {
  return (
    <div className={styles.container}>
      {Object.entries(columnVisibility).map(([key, isVisible]) => (
        <div key={key} className={styles.checkboxContainer}>
          <label>
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => handleColumnVisibilityChange(key)}
            />
            {key.replace(/([A-Z])/g, ' $1').trim()} {/* Add spaces before capital letters for better readability */}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ColumnToggle;
