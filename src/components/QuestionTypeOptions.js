// QuestionTypeOption.js
import React from 'react';
import PropTypes from 'prop-types';
import styles4 from './frame4.module.css';

export default function QuestionTypeOption({ iconClass, label }) {
  return (
    <div className={styles4.question_option}>
      <div className={iconClass} />
      <span>{label}</span>
    </div>
  );
}

QuestionTypeOption.propTypes = {
  iconClass: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
