import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Card from './components/Card';
import Header from './components/Header';
import SkeletonCard from './skeletons/SkeletonCard';
import spinner from './assets/Infinity-1s-200px.svg';


function App(): JSX.Element {
  

  const savedLikes = JSON.parse(localStorage.getItem('likes') || '[]')
  
  const loader = useRef<HTMLDivElement>(null)
  const [imgs, setImgs] = useState<any>(null)
  const skeletons = [0,1,2,3,4,5,6,7,8,9,10,11].map((number:number) => (
    <SkeletonCard key={number} />
  ))

  const option = { 
    root: null,
    rootMargin: "500px",
    threshold: 0
  };

  const createObserver = () => {
    const observer = new IntersectionObserver(handleObserver, option);
    
    if (loader.current) {
        observer.observe(loader.current)
    }
  }

  const handleObserver = (entities:IntersectionObserverEntry[], observer:IntersectionObserver) => {
    
    const entity = entities[0];
    
    if (entity.isIntersecting) {    
             
        getImages()
        observer.unobserve(entity.target);
    }

  }

  async function getImages(): Promise<void> {
    let endDate = new Date().toISOString().split("T")[0]
    if(imgs) {
      const lastImgDate = new Date(imgs[imgs.length - 1].date)
      lastImgDate.setDate(lastImgDate.getDate() - 1)
      endDate = lastImgDate.toISOString().split("T")[0]
    }
    
    const mockStartDate = new Date(endDate)
    mockStartDate.setDate(mockStartDate.getDate() - 11)
    const startDate = mockStartDate.toISOString().split("T")[0]
    

    try {
      
      const res:any = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&end_date=${endDate}&start_date=${startDate}&thumbs`)
      // console.log(res);
      
      const data: any = await res.json()
      data.reverse()
      // console.log(data);
      if(imgs) {
        setImgs([...imgs, ...data])
      } else {
        setImgs(data)
      }
      
    } catch (error) {
      console.log(error);
    }
  }
    useEffect(():void => createObserver())


  useEffect(():void => {
    getImages()
  }, [])


  return (
    <div className="App">
      <Header />
      <main className="spaceGallery">
        {imgs ?
        <>{
          imgs.map((img:any, key:number) => {
            if (img.media_type === "image") {
              const liked = savedLikes.indexOf(img.date + img.title) > 0 ? true : false
              return <Card img={img} liked={liked} key={key}/>
            }
          })
          }</> : 
          <>
            {skeletons}
          </>
        }
      </main>
      <div className="loader" ref={loader}> <img src={spinner} alt="Loading..." /> </div>
    </div>
  );
}

export default App;
