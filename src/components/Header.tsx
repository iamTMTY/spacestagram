import React from 'react'
import styles from '../styles/Header.module.css'

interface Props {
  
}

const Header:React.FC<Props> = () => {
  return (
    <header className={styles.siteHeader}>
      <h1 role="banner">Spacestagram</h1>
    </header>
  )
}

export default Header
