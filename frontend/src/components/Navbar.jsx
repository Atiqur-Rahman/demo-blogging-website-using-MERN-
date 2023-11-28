import { Link } from 'react-router-dom';
import logo from '../assets/feather.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link>
                <img src={logo} alt="" className="flex-none w-10 h-8 mr-[5vw]" />
            </Link>

            <div className="absolute bg-white w-full left-0 top-full mt-0.5 border-b border-gray py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto">
                <input type="text" placeholder="Search" className="w-full md:w-auto bg-gray p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-gray  md:pl-12" />

                <i className="fi fi-rr-search absolute right-[10%] top-1/2 -translate-y-1/2 md:pointer-events-none md:left-5 text-xl text-dark-gray"></i>
            </div>
        </nav>
    );
};

export default Navbar;
