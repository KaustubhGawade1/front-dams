import ProductCard from "./shared/ProductCard";


const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
                About Us
            </h1>
           <div className="flex flex-col lg:flex-row justify-center items-center mb-15">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <p className="text-lg mb-4">
                        Welcome to our Asset Management store! We are dedicated to providing the
                        best services to our customers. Our mission is to offer
                        a seamless experience while ensuring the highest quality of
                        our offerings.
                    </p>
                </div>

                {/* <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img
                        src="https://embarkx.com/sample/placeholder.png"
                        alt="About Us"
                        className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"></img>
                </div> */}
           </div>


           {/* <div className="py-7 space-y-8">
            <h1 className="text-slate-800 text-4xl font-bold text-center">
                Our Assets
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {products.map((product, index) => (
                <ProductCard 
                    key={index}
                    image={product.image}
                    filename={product.filename}
                    contentType={product.contentType}
                    specialsize={product.specialsize}
                    size={product.size}
                    about
                />
               ))
               } 
                

            </div>
           </div> */}
        </div>
    );
}

export default About;