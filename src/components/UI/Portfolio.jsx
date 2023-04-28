import React, {useState, useEffect} from 'react'
import data from '../../assets/data/portfolioData'
import Modal from './Modal';

const Portfolio = () => {

  const [nextItems, setNextItems] = useState(6);
  const [portfolios, setPortfolios] = useState(data);
  const [selectTab, setSelectTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const loadMoreHandler = () => {
    setNextItems(prev=> prev + 3)
  }

  const showModalHandler = id => {
    setShowModal(true)
    setActiveId(id)
  }

  useEffect(()=>{
    if(selectTab==='all'){
      setPortfolios(data)
    }
    
    if(selectTab==='campagne'){
      const filteredData = data.filter(item=> item.category==='Campagne')
      setPortfolios(filteredData)
    }

    if(selectTab==='logos'){
      const filteredData = data.filter(item=> item.category==='Loghi')
      setPortfolios(filteredData)
    }
  }, [selectTab])

  return (<section id="portfolio">
    <div className="container">
      <div className="flex items-center justify-between flex-wrap">
        <div className="mb-7 sm:mb-0">
          <h3 className='text-headingColor text-[2rem] font-[700]'>
            Progetti Recenti
          </h3>
        </div>
        <div className="flex gap-3">
          <button onClick={()=>setSelectTab('all')} className='text-smallTextColor border border-solid border-smallTextColor py-2 px-4 rounded-[8px] hover:bg-smallTextColor
          hover:text-white hover:font-[500] ease-in duration-700'>Vedi tutti</button>
          <button onClick={()=>setSelectTab('campagne')} className='text-smallTextColor border border-solid border-smallTextColor py-2 px-4 rounded-[8px] hover:bg-smallTextColor
          hover:text-white hover:font-[500] ease-in duration-700'>Campagne</button>
          <button onClick={()=>setSelectTab('logos')} className='text-smallTextColor border border-solid border-smallTextColor py-2 px-4 rounded-[8px] hover:bg-smallTextColor
          hover:text-white hover:font-[500] ease-in duration-700'>Loghi</button>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap mt-12">
        {portfolios.slice(0, nextItems)?.map((portfolio, index) => (
            <div key={index} data-aos='fade-zoom-in' data-aos-delay='50' data-aos-duration='1000' className="group max-w-full sm:w-[48.5%] md:w-[31.8%] lg:w-[32.2%] relative z-[1]">
              <figure>
                <img className="rounded-[8px]" src={portfolio.imgUrl} alt="" />
              </figure>

              <div className="w-full h-full bg-smallTextColor bg-opacity-40 absolute top-0 left-0 z-[5] hidden group-hover:block">
                <div className="w-full h-full flex items-center justify-center">
                  <button onClick={()=> showModalHandler(portfolio.id)} className='text-white bg-primaryDark hover:bg-primaryColor py-2 px-4 rounded-[8px]'>Dettagli</button>
                </div>  
              </div>
            </div>
          ))
        }
      </div>

      <div className="text-center mt-6">
        {nextItems < portfolios.length && data.length > 6 && (
          <button
           onClick={loadMoreHandler}
           className="text-white bg-headingColor hover:bg-primaryColor py-2 px-4 rounded-[8px] font-[500] ease-in duration-200">
            Carica Altri
          </button>
        )}
      </div>
    </div>
    {
      showModal && <Modal setShowModal={setShowModal} activeId={activeId}/>
    }
  </section>
  );
}

export default Portfolio
