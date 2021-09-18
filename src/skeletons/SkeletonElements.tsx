import React from 'react'
import styles from './SkeletonElements.module.css';

interface Props {
  type: string
}

const SkeletonElements:React.FC<Props> = ({type}) => {

  const classes = `${styles.skeleton} ${styles[type]}`
  return (
    <div className={classes}>
      
    </div>
  )
}

export default SkeletonElements
