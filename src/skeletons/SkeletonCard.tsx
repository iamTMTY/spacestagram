import React from 'react'
import SkeletonElements from './SkeletonElements'
import styles from './SkeletonElements.module.css';


interface Props {
  
}

const SkeletonCard:React.FC<Props> = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <SkeletonElements type="image"/>
      <SkeletonElements type="title"/>
      <SkeletonElements type="date"/>
    </div>
  )
}

export default SkeletonCard
