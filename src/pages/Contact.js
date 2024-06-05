
import "./Contact.css";
import "./NavBar.css";
import NavBar from "./NavBar";

const Contact = () => {  
  
  return (
    <div className="contactpage">
      <NavBar />
      <div className="our-vision-is-container">
        <span className="our-vision-is-container1">          
          <p className="blank-line">
            Our vision is where in India transportation is eco-friendly,
            seamless, and connected. We believe in a future where EV charging
            stations are as widespread and accessible as conventional fuel
            stations, ensuring that EV owners never have to worry about their
            next charge.
          </p>
        </span>
      </div>
      <div className="our-vision">Our Vision</div>
      <div className="user-centric-our-services-container">
        <span className="our-vision-is-container1">
          <ul className="user-centric-our-services-are">
            <li className="community-focused-beyond-just">
              <span className="user-centric">User-Centric:</span>
              <span className="our-services-are">
                {" "}
                Our services are designed with the user in mind. We provide 24/7
                support and a seamless user experience to ensure charging your
                EV is as simple as possible.
              </span>
            </li>
            <li className="community-focused-beyond-just">
              <span className="user-centric">Community-Focused:</span>
              <span className="beyond-just-providing">
                {" "}
                Beyond just providing services, we build communities. We connect
                EV enthusiasts and everyday users, encouraging knowledge-sharing
                and support.
              </span>
            </li>
            <li>
              <span className="user-centric">Sustainability:</span>
              <span className="beyond-just-providing">
                {" "}
                We're dedicated to promoting environmental stewardship. By using
                our services, you're contributing to a cleaner, healthier
                planet.
              </span>
            </li>
          </ul>
        </span>
      </div>
      <div className="why-choose-us">Why Choose Us</div>      
      <div className="contact-us">Contact Us</div>
      <div className="at-chargeeazy-we-container">
        <span className="our-vision-is-container1">
          <p className="blank-line">&nbsp;</p>
          <p className="blank-line">
            At ChargeEazy, we specialize in providing comprehensive EV charging
            solutions. From easy-to-use home charging systems to expansive
            public charging networks, we cover every aspect of EV charging. Our
            state-of-the-art platform allows users to locate, use, and pay for
            charging with just a few taps, simplifying the entire process.
          </p>
        </span>
      </div>
      <div className="chargeeazygmailcom">Chargeeazy@gmail.com</div>
      <div className="div">7030777761</div>
      <div className="what-we-do">What We Do</div>
      <div className="chargeeazy-is-at-container">
        <span className="our-vision-is-container1">
          <p className="blank-line">&nbsp;</p>
          <p className="blank-line">
            ChargeEazy is at the forefront of the electric vehicle (EV)
            revolution, committed to making EV charging accessible, convenient,
            and efficient for everyone. Founded in year 2023, we've grown from a
            visionary startup into a respected leader in the EV charging
            industry. Our passion drives us to innovate, creating solutions that
            empower EV owners and contribute to a greener, more sustainable
            future.
          </p>
        </span>
      </div>
      <div className="who-we-are">Who We Are</div>
      <img
        className="dalle-2023-10-22-130247-v"
        alt=""
        src="/dalle-20231022-130247--vector-graphic-of-a-tree-with-leaves-made-up-of-ev-chargers-from-various-designs-and-sizes-1@2x.png"
      />
      <img
        className="dalle-2023-10-22-131312-i"
        alt=""
        src="/dalle-20231022-131312--illustration-of-a-map-of-india-highlighted-with-interconnected-lines-representing-roads-and-highways-in-color-1754ae-1@2x.png"
      />
      <div className="contact-child" />
      <img className="address-book-icon" alt="" src="/address-book@2x.png" />
      <img className="whatsapp-icon" alt="" src="/whatsapp@2x.png" />
    </div>
  );
};

export default Contact;
