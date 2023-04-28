import React from "react";
// import heroImg from '../../assets/images/hero.svg'
import CountUp from "react-countup";

const Hero = () => {
  return (
    <section className="pt-0 " id="about">
      <div className="container pt-14">
        <div className="md:flex items-center justify-between sm:flex-col md:flex-row">
          {/* ============== hero left content =============== */}
          <div className="w-full md:basis-1/2">
            <h1 data-aos='fade-right' 
                data-aos-duration='1500'
                className="text-headingColor font-[400] text-[1.8rem] sm:text-[40px] leading-[35px] sm:leading-[46px] mt-5 ">
              studio<b>lanza</b> <br />
            </h1>
            <h5 data-aos='fade-up'
                data-aos-duration='1500'
                className="text-headingColor font-[500] text-[16px]">
              immagine e comunicazione
            </h5>

            <div data-aos='fade-right'
                data-aos-duration='1800'
                data-aos-delay='200'
                className="flex items-center gap-6 mt-7">
              <a href="#contact">
                <button className="bg-primaryColor text-white font-[500] flex items-center gap-2 hover:bg-smallTextColor ease-in duration-300 py-2 px-4 rounded-[8px]">
                  <i className="ri-mail-line"></i>Collabora
                </button>
              </a>
              <a href="#esplora" className="text-smallTextColor font-[600] text-[16px] border-b border-solid border-smallTextColor">
                Esplora
              </a>
            </div>
            <p data-aos='fade-up'
                data-aos-duration='1500'
                className=" flex gap-2 text-headingColor mt-12 font-[500] text-[15px] leading-7 sm:pl-14 sm:pr-10">
              <span>
                <i class="ri-apps-line"></i>
              </span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum consequuntur totam voluptatibus corrupti voluptate sapiente vero iste dolorum sequi odio labore, quia veniam, eum cupiditate esse iure mollitia quod aliquid.
            </p>
          </div>
          {/* ============== hero left end =============== */}
          <div className="basis-1/3 mt-10 sm:mt-0">
            <figure className="flex items-center justify-center">
              RIEMPIMENTO QUI<br/>
              O IMG GRAFICA<br/>
              O ELEMENTO VISIVO
            </figure>
          </div>
          {/* ============== hero right content =============== */}
          <div className="md:basis-1/5 flex justify-between text-center mt-10 flex-wrap gap-3 md:mt-0 md:flex-col md:justify-end md:text-end">
            <div className="mb-10">
              <h2 className="text-headingColor font-[700] text-[32px]">
                <CountUp start={0} end={42} duration={2} suffix="+" />
              </h2>
              <h4>Anni di Esperienza</h4>
            </div>
            <div className="mb-10">
              <h2 className="text-headingColor font-[700] text-[32px]">
                <CountUp start={0} end={99} duration={2} suffix="%" />
              </h2>
              <h4>Percentuale di Successo</h4>
            </div>
            <div className="mb-10">
              <h2 className="text-headingColor font-[700] text-[32px]">
                <CountUp start={0} end={420} duration={2} suffix="+"/>
              </h2>
              <h4>Progetti competati</h4>
            </div>
            <div className="mb-10">
              <h2 className="text-headingColor font-[700] text-[32px]">
                <CountUp start={0} end={69} duration={2} suffix="+"/>
              </h2>
              <h4>Clienti Soddisfatti</h4>
            </div>
          </div>
          {/* ============== hero right end =============== */}
        </div>
      </div>

    </section>
  )
};

export default Hero;