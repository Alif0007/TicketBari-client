import React from 'react';

const operators = [
    { name: 'Evergreen', logo: 'https://evergreentransport.com.bd/wp-content/uploads/2024/08/Raw-file-without-broder.png' },
    { name: 'Emad', logo: 'https://images.seeklogo.com/logo-png/36/1/al-emad-rent-a-car-dubai-marina-logo-png_seeklogo-369465.png' },
    { name: 'Pabna Express', logo: 'https://images.sftcdn.net/images/t_app-cover-s-16-9,f_auto/p/823d1887-7a44-481c-bfd2-58b5847f4212/2931981607/pabna-express-platinum-2019-screenshot' },
    { name: 'Arafat Paribahan', logo: 'http://arafatfoundation.com/wp-content/uploads/2025/04/WhatsApp_Image_2025-04-21_at_03.43.06_68d7d292-removebg-preview.png' },
    { name: 'Akota', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMA-PDAzUooKup21SpXO4oQpzmIYjA75u_dA&s' },
    { name: 'Shyamoli', logo: 'https://shyamolitickets.com/images/logo.png' },
    { name: 'Royal Express', logo: 'https://i.pinimg.com/736x/70/f4/1d/70f41d5d8b7937442c2b512f03ddc286.jpg' },
    { name: 'Orin Travels', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Hbwz3DahMXQ0JDsQpMQS_oQ2tQjZueabmQ&s' },
    { name: 'Tungipara', logo: 'https://img.freepik.com/premium-vector/travel-bus-vacation-holiday-vehicle-tour-tourism-logo-design-template-illustration_600323-3664.jpg?semt=ais_hybrid&w=740&q=80' },
    { name: 'Alhamra', logo: 'https://images.seeklogo.com/logo-png/55/1/al-hamra-real-estate-company-logo-png_seeklogo-559683.png' },
    { name: 'Bilash', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLFPThAdDonhh8cO5Cy_xRL1v1xV9uh-0ikQ&s' },
    { name: 'Soudia', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl5HHdOacjfhPOYlSW-6phlckw0FIeyuTDzg&s' },
    // Duplicate the list for seamless infinite scroll
    { name: 'Evergreen', logo: 'https://evergreentransport.com.bd/wp-content/uploads/2024/08/Raw-file-without-broder.png' },
    { name: 'Emad', logo: 'https://images.seeklogo.com/logo-png/36/1/al-emad-rent-a-car-dubai-marina-logo-png_seeklogo-369465.png' },
    { name: 'Pabna Express', logo: 'https://images.sftcdn.net/images/t_app-cover-s-16-9,f_auto/p/823d1887-7a44-481c-bfd2-58b5847f4212/2931981607/pabna-express-platinum-2019-screenshot' },
    { name: 'Arafat Paribahan', logo: 'http://arafatfoundation.com/wp-content/uploads/2025/04/WhatsApp_Image_2025-04-21_at_03.43.06_68d7d292-removebg-preview.png' },
    { name: 'Akota', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMA-PDAzUooKup21SpXO4oQpzmIYjA75u_dA&s' },
    { name: 'Shyamoli', logo: 'https://shyamolitickets.com/images/logo.png' },
    { name: 'Royal Express', logo: 'https://i.pinimg.com/736x/70/f4/1d/70f41d5d8b7937442c2b512f03ddc286.jpg' },
    { name: 'Orin Travels', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Hbwz3DahMXQ0JDsQpMQS_oQ2tQjZueabmQ&s' },
    { name: 'Tungipara', logo: 'https://img.freepik.com/premium-vector/travel-bus-vacation-holiday-vehicle-tour-tourism-logo-design-template-illustration_600323-3664.jpg?semt=ais_hybrid&w=740&q=80' },
    { name: 'Alhamra', logo: 'https://images.seeklogo.com/logo-png/55/1/al-hamra-real-estate-company-logo-png_seeklogo-559683.png' },
    { name: 'Bilash', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLFPThAdDonhh8cO5Cy_xRL1v1xV9uh-0ikQ&s' },
    { name: 'Soudia', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl5HHdOacjfhPOYlSW-6phlckw0FIeyuTDzg&s' },
];

const Marquee = () => {
    return (
        <div className="w-full overflow-hidden bg-base-200 py-8 border-t border-b border-base-300">
            <div
                className="flex animate-marquee whitespace-nowrap"
                style={{ animation: 'marquee 60s linear infinite' }}
            >
                {operators.map((op, index) => (
                    <div
                        key={index}
                        className="flex-none w-48 mx-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center justify-center group"
                    >
                        <img
                            src={op.logo}
                            alt={op.name}
                            className="h-20 w-auto object-contain mb-3 group-hover:scale-110 transition-transform duration-300"
                        />
                        <p className="text-sm font-medium text-gray-700 text-center">
                            {op.name}
                        </p>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default Marquee;