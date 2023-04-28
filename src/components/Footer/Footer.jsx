import React from "react";
const year = new Date().getFullYear();
const Footer = () => {
  return <footer className="bg-[#12141e] pt-12">
    {/* ============= footer top ============= */}
    <div className="container">
      <div className="sm:flex items-center justify-between md:gap-8">
        <div className="w-full sm:w-1/2">
          <h2 className="text-[15px] leading-10 text-white font-[600] mb-5 md:text-[2rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
          <a href="#contact">
            <button className="bg-primaryColor text-white font-[500] flex items-center gap-2 hover:bg-smallTextColor ease-in duration-300 py-2 px-4 rounded-[8px]">
              <i className="ri-mail-line"></i>Collabora
            </button>
          </a>
        </div>

        <div className="w-full sm:w-1/2">
          <p className="text-gray-300 leading-7 mt-4 sm:mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo neque quia quae, commodi id dicta dolores adipisci voluptatum suscipit saepe libero ratione magnam repellendus corporis animi recusandae odio, voluptatem officiis?
          </p>
        </div>
      </div>

      <div>
        <ul className="flex items-center justify-center gap-10 mt-10">
          <li>
            <a className="text-gray-400 font-[600]" href="#about">
            Chi Siamo
            </a>
          </li>
          <li>
            <a className="text-gray-400 font-[600]" href="#portfolio">
            Progetti
            </a>
          </li>
          <li>
            <a className="text-gray-400 font-[600]" href="#contact">
            Contattaci
            </a>
          </li>
        </ul>
      </div>
    </div>
    {/* ============= footer top end ============= */}
    {/* ============= footer bottom ============= */}
    <div className="bg-[#1b1w29] py-3 mt-14">
      <div className="container">
        <div className="flex items-center justify-center sm:justify-between ">
          <div className="hidden sm:block">
            <div className="flex items-center gap-[10px]">
              <span className="w-[35px] h-[35px] rounded-full bg-[#2b2d33] text-white font-[500] text-[18px] flex items-center justify-center">SL</span>
            
              <div className="leading-[20px]">
                <h2 className="text-gray-200 font-[500] text-[18px]">studiolanza</h2>
                <p className="text-gray-400 text-[14px] font-[500]">area riservata</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-[12px]">copyright {year} developed by studiolanza © - all rights reserved</p>
          </div>
        </div>
      </div>
    </div>
    {/* ============= footer bottom end ============= */}
  </footer>
};

export default Footer;