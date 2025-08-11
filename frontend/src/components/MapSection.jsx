import React from "react";

const MapSection = () => (
  <section className="max-padd-container my-10">
    <h2 className="text-2xl font-bold mb-4">Find Us Here</h2>
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <iframe
        title="Store Location"
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15845.163555971001!2d79.84443888698134!3d6.855695402627517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b080140456d%3A0x2336ef2aa034913!2sDehiwala%2C%20Dehiwala-Mount%20Lavinia%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1750309130166!5m2!1sen!2sus'
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  </section>
);

export default MapSection;
