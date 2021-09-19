import React, {useState} from 'react';
import styles from '../styles/Card.module.css'
import HeartFill from './HeartFill';
import HeartStroke from './HeartStroke';
import { AnimatePresence} from 'framer-motion'
import PostModal from './PostModal';

interface Props {
  img: any
  liked: boolean
}

const Card:React.FC<Props> = ({img, liked}) => {
  
  const [like, setLike] = useState(liked)
  const [showModal, setShowModal] = useState(false)


  const onLikeClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const likes = JSON.parse(localStorage.getItem('likes') || '[]')
    if(!like) {
      localStorage.setItem('likes', JSON.stringify([...likes, `${img.date}${img.title}`]))
    } else {
      const newLikes = likes.filter((item:string) => item !== `${img.date}${img.title}`)
      localStorage.setItem('likes', JSON.stringify(newLikes))
    }
    setLike(!like)
  }
  return (
    <>
      {showModal && <PostModal cardInfo={{img, like, setLike, onLikeClick, setShowModal}}/>}
      <div className={styles.card}>
        <figure className={styles.spaceImg}>
          <img src={img.url} alt={img.title} onClick={()=> setShowModal(true)} />
          <figcaption>
            <h2 title={img.title} onClick={()=> setShowModal(true)} className={styles.title} > {img.title} </h2>
            <span className={styles.date}>{new Date(img.date).toDateString()}</span>
            {/* <p className={styles.description}> {img.explanation} </p><br /> */}
          </figcaption>
        </figure>
        <div className={styles.likeContainer}>
          <p>{like ? "you liked this" : ""}</p>
          <button onClick={onLikeClick} data-cy="like-unlike-btn"> 
            <AnimatePresence exitBeforeEnter initial={false}>
              { like ? <HeartFill/> : <HeartStroke />}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </>
  )
}

export default Card
