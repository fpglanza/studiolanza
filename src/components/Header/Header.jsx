import React, {useRef, useEffect } from "react";

const Header = () => {

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        if (headerRef.current) {
          headerRef.current.classList.add("sticky__header");
        } else {
          console.log("headerRef.current is null");
        }
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(()=> {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const handleClick = e => {
    e.preventDefault()

    const targetAttr = e.target.getAttribute('href')
    const location = document.querySelector(targetAttr).offSetTop

    window.scrollTo({
      top: location,
      left: 0,
    });
  };

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show__menu');
    } else {
      console.log("menuRef.current is null");
    }
  };

  return <header ref={headerRef} className="w-full h-[80px] leading-[80px] flex items-center">
    <div className="container">
      <div className="flex items-center justify-between">
        {/* ========= logo ============ */}
        <div className="flex items-center gap-[10px]">
          <a href="#login">
            <span className="w-[35px] h-[35px] | bg-primaryColor text-white text-[18px] font-[500] 
            rounded-full flex items-center justify-center">
              SL
            </span>
          </a>
          <div className="leading-[20px]">
            
            <h1 className="text-xl text-smallTextColor font-[700]">accesso</h1>
            <p className="text-smallTextColor text-align-left text-[16px] font-[500]">area riservata</p>
          </div>
        </div>

        {/* ========= logo end ============== */}
        {/* ========= menu start ============ */}
        <div className="menu" ref={menuRef} onClick={toggleMenu}>
          <ul className="flex items-center gap-10">
            <li><a className="text-smallTextColor font-[600]" href="#about">Chi Siamo</a></li>
            <li><a className="text-smallTextColor font-[600]" href="#portfolio">Progetti</a></li>
            <li><a className="text-smallTextColor font-[600]" href="#contact">Contatti</a></li>
          </ul>
        </div>
        {/* ========= menu end ============ */}
        <div className="flex items-center gap-4">
          <a href="#contact">
            <button className="flex items-center gap-2 text-smallTextColor font-[600] 
            border border-solid border-smallTextColor py-2 px-4 rounded-[8px] max-h-[40px] hover:bg-smallTextColor
            hover:text-white hover:font-[500] ease-in duration-700">
            <i class="ri-send-plane-fill"></i> Contattaci
            </button>
          </a>
          <span onClick={toggleMenu} className="text-2xl text-smallTextColor md:hidden cursor-pointer">
          <i class="ri-menu-fill"></i>
          </span>
        </div>
        {/* ========= menu right ============ */}
        {/* ========= menu end ============ */}
      </div>
    </div>
  </header>
};

export default Header;