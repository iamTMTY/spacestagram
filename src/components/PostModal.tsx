import React from 'react'
import styles from '../styles/PostModal.module.css'
import HeartFill from './HeartFill';
import HeartStroke from './HeartStroke';
import {AnimatePresence} from 'framer-motion'

interface Props {
  cardInfo: {
    img: any
    like: boolean,
    setLike: React.Dispatch<React.SetStateAction<boolean>>
    onLikeClick: React.MouseEventHandler<HTMLButtonElement>
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  }
}

const PostModal:React.FC<Props> = ({cardInfo}) => {

  return (
    <div role="dialog" className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.closeModal} onClick={() => cardInfo.setShowModal(false)}> X </div>
        <figure className={styles.Img}>
          <img src={cardInfo.img.url} alt={cardInfo.img.title} />
          <figcaption>
            <h2 title={cardInfo.img.title} className={styles.title}> {cardInfo.img.title} </h2>
            <span className={styles.date}>{new Date(cardInfo.img.date).toDateString()}</span>
          </figcaption>
        </figure>
      <div className={styles.likeContainer}>
        <p>{cardInfo.like ? "you liked this" : ""}</p>
        <button onClick={cardInfo.onLikeClick} data-cy="like-unlike-btn"> 
          <AnimatePresence exitBeforeEnter initial={false}>
            { cardInfo.like ? <HeartFill/> : <HeartStroke />}
          </AnimatePresence>
        </button>
      </div>
      <p className={styles.description}> {cardInfo.img.explanation} </p><br />
      </div>
    </div>
  )
}

export default PostModal
