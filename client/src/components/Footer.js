import React from "react";


import { FaChevronRight } from "react-icons/fa";

const Footer = () => {
    return ( 
        <footer className="pb-4 pt-5 bg-light text-secondary">
            <div className="text-center text-md-left">
            <div className="row text-center text-md-left">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="mb-4 font-weight-bold footer-title">BadBanana🍌</h5>
            <p>
                1234 BadBanana Street<br/>
                Banana, NW10 7TK <br/>
                United Kingdom <br/><br/>
                <strong>Phone:</strong> 020 8430 6784<br/>
                <strong>Email:</strong> BadBananaInquiries@gmail.com<br/>
            </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="mb-4 font-weight-bold footer-title">Useful Links</h5>
            <p> 
                <FaChevronRight className="chevron"/>
                <a href="#" className="text-secondary hover:underline"> About</a></p>
            <p> 
            <FaChevronRight className="chevron"/>
           <a href="#" className="text-secondary hover:underline"> Privacy Policy</a></p>
            <p> 
            <FaChevronRight className="chevron"/>
            <a href="#" className="text-secondary hover:underline"> Licensing</a></p>
            <p> 
            <FaChevronRight className="chevron"/>
                <a href="#" className="text-secondary hover:underline"> Contact</a></p>
            </div>
            <div className= "col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h5 className="mb-4 font-weight-bold footer-title">Join And Subscribe</h5>
                <p>Join 30,000+ others and never miss out on new movies</p>
            <form>
                <div className="row">
                <input type="text" className="input" placeholder="email@example.com"/>
                <button className="button">Subscribe</button>
                </div>
                <span>© 2023 <a href="https://www.rottentomatoes.com/" className="hover:underline text-secondary ">BadBanana™</a>. All Rights Reserved.
            </span>
            </form>
            </div>
            </div>
            </div>
        </footer>

);
};

export default Footer;









