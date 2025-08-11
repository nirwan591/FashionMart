import React from "react";
import { Link } from "react-router-dom"; 
import SocialIcons from "./SocialIcons";

const Footer = () => {
    return (
        <footer id="contact" className="bg-tertiary max-padd-container
        text-white py-12 rounded-xl"> 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo and description */}
                <div className="flex flex-col item-center md:item-start">
                    <Link to={'/'} className="bold-24 mb-4">
                        <h3>Fashion<span className="text-secondary">Mart</span></h3>
                    </Link>
                    <p className="text-center md:text-left">
                    FashionMart is your one-stop destination for the latest fashion trends, 
                    high-quality electronics, and everyday essentials. Shop with confidence 
                    and enjoy the best deals on a wide range of products.
                    </p>
                </div>
                
                {/* Quick Links */}
                <div className="flex flex-col item-center md:item-start">
                    <h4 className="bold-20 mb-4">Quick Links</h4>
                    <ul className="space-y-2 regular-15 text-gray-30">
                        <li><a href="/" className="hover:text-secondary">Home</a></li>
                        <li><a href="/" className="hover:text-secondary">Categories</a></li>
                        <li><a href="/" className="hover:text-secondary">Shop</a></li>
                        <li><a href="/" className="hover:text-secondary">Contact Us</a></li>
                    </ul>
                </div>

                {/* Contact information */}
                <div className="flex flex-col item-center md:item-start">
                    <h4 className="text-lg mb-4">Contact Us</h4>
                    <p>Email=<a href="" className="hover:text-secondary">Fashionmart@.com</a></p>
                    <p>Phone=<a href="" className="hover:text-secondary">+0775485184</a></p>
                    <p>Address : 32/5,Girikola,Agalawatta,SriLanka</p>

                    {/* Contact Us Button */}
                    <div className="mt-4">
                        <button
                            className="bg-secondary text-white px-4 py-2 rounded hover:bg-opacity-90"
                            onClick={() => document.getElementById("contact-popup").classList.remove("hidden")}
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center mt-8">
                <SocialIcons />
                <hr className="h-[1px] w-full max-w-screen-md my-4
                border-white" />
                <p >&copy; {new Date().getFullYear()} FashionMart | All right
                    reserved...   
                </p>
            </div>

            {/* Contact Form Popup */}
            <div
                id="contact-popup"
                className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
                <div className="bg-white text-black p-6 rounded-lg max-w-md w-full relative">
                    <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                    <form 
  className="space-y-3"
  onSubmit={async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const res = await fetch("http://localhost:4000/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      alert("Message sent!");
      document.getElementById("contact-popup").classList.add("hidden");
      e.target.reset();
    } else {
      alert("Failed to send message.");
    }
  }}
>
  <input name="name" type="text" placeholder="Your Name" className="w-full p-2 border rounded" required />
  <input name="email" type="email" placeholder="Your Email" className="w-full p-2 border rounded" required />
  <textarea name="message" placeholder="Your Message" rows="4" className="w-full p-2 border rounded" required></textarea>
  <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:bg-opacity-80">
    Send Message
  </button>
</form>

                    <button
                        className="absolute top-2 right-3 text-black text-xl"
                        onClick={() => document.getElementById("contact-popup").classList.add("hidden")}
                    >
                        &times;
                    </button>
                </div>
            </div>
        </footer>  
    );
}

export default Footer;
